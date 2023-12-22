// react
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    Paper,
    InputLabel,
    InputBase,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';

// redux
import AddIcon from '@mui/icons-material/Add';
import { acodeSuccess, getAcodes } from '../../store/reducers/acode.jsx';

// project import
import ComponentSkeleton from '../../components/ComponentSkeleton.jsx';
import AcodeSelector from '../../components/AcodeSelector/AcodeSelector.jsx';
import SearchBar from '../../components/SearchBar.jsx';
import Utils from '../../utils/index.jsx';

// in-package
import AccountCodeAdd from './AccountCodeAdd.jsx';
import AccountCodeEdit from './AccountCodeEdit.jsx';

const AccountCode = () => {
    const dispatch = useDispatch();

    const acodes = useSelector(getAcodes);
    // const aclassStatus = useSelector(getAclassStatus);
    // const aclassError = useSelector(getAclassError);

    const [pageData, setPageData] = useState({
        emptyId: -1,
        currentData: {
            id: -1,
            accountCode: '',
            title: ''
        },
        totalCount: 0,
        keyword: '',
        keywordError: '',
        modalFlagAdd: false,
        modalFlagEdit: false
    });

    const dataChangedCallback = (modifiedData) => {
        console.log('AccountClass::dataChangedCallback');
        if (modifiedData !== undefined && modifiedData !== null) {
            let newDataSet = [];
            for (var i = 0; i < acodes.length; i++) {
                if (acodes[i].id === modifiedData.id) {
                    newDataSet[i] = modifiedData;
                } else {
                    newDataSet[i] = acodes[i];
                }
            }
            dispatch(acodeSuccess({ acodes: newDataSet }));
        } else {
            requestFetch();
        }
    };

    const acodeSelectedCallback = (codeObj) => {
        console.log('AccountClass::acodeSelectedCallback', codeObj);
        let newVal = codeObj.codeNo + ` / ${codeObj.classTitle}(${codeObj.classId}) > ${codeObj.codeTitle}(${codeObj.codeNo})`;
        this.setState({
            acodeSelected: newVal
        });
    };

    const requestFetch = () => {
        const parentState = this;
        const REQ_URI =
            process.env.NODE_ENV !== 'production'
                ? 'http://' + window.location.hostname + ':28080/pds/v1/accountCode'
                : '/pds/v1/accountCode';

        fetch(REQ_URI, {
            method: 'GET',
            headers: Utils.auth.makeAuthHeader()
        })
            .then(function (res) {
                if (!res.ok) {
                    if (res.status === 401) {
                        window.location = '/#/logout';
                    }
                    throw Error('서버응답 : ' + res.statusText + '(' + res.status + ')');
                }
                return res.json();
            })
            .then(function (resJson) {
                console.log('AccountCode::fetch [OK]', resJson);
                dispatch(acodeSuccess({ acodes: resJson.data }));
                setPageData({ keywordError: '' });
            })
            .catch(function (error) {
                console.log('AccountCode::fetch [ERROR]', error);
                setPageData({ keywordError: error.message });
            });
    };

    useEffect(() => {
        if (!pageData.storeDataSync) {
            requestFetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const genEmptyObj = () => {
        let newEmptyId = pageData.emptyId ? pageData.emptyId - 1 : -1;
        let emptyObj = {
            id: newEmptyId,
            title: ''
        };
        setPageData({ emptyId: newEmptyId });
        return emptyObj;
    };

    const modalToggleAdd = () => {
        setPageData({ modalFlagAdd: !pageData.modalFlagAdd });
    };

    const modalToggleEdit = () => {
        setPageData({ modalFlagEdit: !pageData.modalFlagEdit });
    };

    const handleViewAll = () => {
        setPageData({ keyword: '' });
    };

    const handleSearchGo = (e) => {
        e.preventDefault();
        console.log('handleSearchGo', e.target.searchKeyword.value);
        setPageData({ keyword: e.target.searchKeyword.value });
    };

    const handleAdd = () => {
        let newObj = genEmptyObj();
        setPageData({ currentData: newObj, modalFlagAdd: !pageData.modalFlagAdd });
    };

    const handleEdit = (data) => {
        // console.log('handleEdit', data);
        setPageData({ currentData: data, modalFlagEdit: !pageData.modalFlagEdit });
    };

    const renderTableList = (dataArray) => {
        const filteredData =
            pageData.keyword && pageData.keyword.length > 0
                ? dataArray.filter((item) => {
                      const lcKewword = pageData.keyword.toLowerCase();
                      return Object.keys(item).some((key) => (item[key].includes ? item[key].includes(lcKewword) : false));
                  })
                : dataArray;
        if (filteredData.length === 0) {
            return (
                <TableRow key="row-nodata">
                    <TableCell colSpan="4" className="text-center align-middle" height="200">
                        No Data
                    </TableCell>
                </TableRow>
            );
        } else {
            return filteredData.map((data, index) => {
                return (
                    <TableRow key={'memo-' + data.id} onClick={() => handleEdit(data)} hover>
                        <TableCell>{data.id}</TableCell>
                        <TableCell>{data.accountCode}</TableCell>
                        <TableCell>{data.title}</TableCell>
                    </TableRow>
                );
            });
        }
    };

    return (
        <ComponentSkeleton>
            <Stack direction="row">
                <SearchBar
                    width="50%"
                    placeholder={'검색어 입력'}
                    keyword={pageData.keyword}
                    onSearchGo={handleSearchGo}
                    onReset={handleViewAll}
                />
                {/* <Button color="warning" variant="outlined" startIcon={<DeleteIcon />}>
                          삭제
                      </Button> */}
                <Button onClick={handleAdd} color="success" variant="contained" startIcon={<AddIcon />} sx={{ ml: 'auto' }}>
                    추가
                </Button>
            </Stack>
            <Table>
                <TableHead>
                    <TableRow variant="head">
                        <TableCell>ID</TableCell>
                        <TableCell>계정코드</TableCell>
                        <TableCell>분류명</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{renderTableList(acodes)}</TableBody>
            </Table>
            {pageData.modalFlagAdd && (
                <AccountCodeAdd
                    key={'AccountCodeAdd-' + pageData.currentData?.id}
                    modalFlag={pageData.modalFlagAdd}
                    modalToggle={modalToggleAdd}
                    dataFromParent={pageData.currentData}
                    callbackFromParent={dataChangedCallback}
                />
            )}
            {pageData.modalFlagEdit && (
                <AccountCodeEdit
                    key={'AccountCodeEdit-' + pageData.currentData?.id}
                    modalFlag={pageData.modalFlagEdit}
                    modalToggle={modalToggleEdit}
                    dataFromParent={pageData.currentData}
                    callbackFromParent={dataChangedCallback}
                />
            )}

            <Card>
                <CardHeader>
                    <strong>Test</strong>
                    <small> AccountCode</small>
                </CardHeader>
                <CardContent>
                    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                        <InputLabel htmlFor="acode">Selected Account Code</InputLabel>
                        <InputBase
                            type="text"
                            name="acode"
                            placeholder="Selected Account Code"
                            value={pageData.acodeSelected}
                            onChange={acodeSelectedCallback}
                        />
                        <AcodeSelector accountCodeSelected={acodeSelectedCallback} />
                    </Paper>
                </CardContent>
            </Card>
        </ComponentSkeleton>
    );
};

export default AccountCode;
