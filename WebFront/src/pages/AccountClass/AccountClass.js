// react
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// redux
import AddIcon from '@mui/icons-material/Add';
import { aclassSuccess, getAclasses } from '../../store/reducers/aclass';

// project import
import ComponentSkeleton from '../../components/ComponentSkeleton';
import SearchBar from '../../components/SearchBar';
import Utils from '../../utils';

// in-package
import AccountClassAdd from './AccountClassAdd.js';
import AccountClassEdit from './AccountClassEdit.js';

const AccountClass = () => {
    const dispatch = useDispatch();

    const aclasses = useSelector(getAclasses);
    // const aclassStatus = useSelector(getAclassStatus);
    // const aclassError = useSelector(getAclassError);

    const [pageData, setPageData] = useState({
        emptyId: -1,
        currentData: {
            id: -1,
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
            for (var i = 0; i < aclasses.length; i++) {
                if (aclasses[i].id === modifiedData.id) {
                    newDataSet[i] = modifiedData;
                } else {
                    newDataSet[i] = aclasses[i];
                }
            }
            dispatch(aclassSuccess({ aclasses: newDataSet }));
        } else {
            requestFetch();
        }
    };

    const requestFetch = () => {
        const REQ_URI =
            process.env.NODE_ENV !== 'production' ? '//' + window.location.hostname + ':28080/pds/v1/accountClass' : '/pds/v1/accountClass';

        fetch(REQ_URI, {
            method: 'GET',
            headers: Utils.auth.makeAuthHeader()
        })
            .then(function (res) {
                if (!res.ok) {
                    if (res.status === 401) {
                        window.location = '/logout';
                    }
                    throw Error('서버응답 : ' + res.statusText + '(' + res.status + ')');
                }
                return res.json();
            })
            .then(function (resJson) {
                // console.log('AccountClass::fetch => ' + resJson.result);
                dispatch(aclassSuccess({ aclasses: resJson.data }));
                setPageData({ keywordError: '' });
            })
            .catch(function (error) {
                console.log('AccountClass::fetch => ' + error);
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
        if (filteredData === null || filteredData.length === 0) {
            return (
                <TableRow key="row-nodata" hover>
                    <TableCell colSpan="2" height="200">
                        No Data
                    </TableCell>
                </TableRow>
            );
        } else {
            return filteredData.map((data, index) => {
                return (
                    <TableRow key={'accountClass-' + index + '-' + data.id} onClick={() => handleEdit(data)} hover>
                        <TableCell>{data.id}</TableCell>
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
                        <TableCell>분류명</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{renderTableList(aclasses)}</TableBody>
            </Table>
            {pageData.modalFlagAdd && (
                <AccountClassAdd
                    key={'AccountClassAdd-' + pageData.currentData?.id}
                    modalFlag={pageData.modalFlagAdd}
                    modalToggle={modalToggleAdd}
                    dataFromParent={pageData.currentData}
                    callbackFromParent={dataChangedCallback}
                />
            )}
            {pageData.modalFlagEdit && (
                <AccountClassEdit
                    key={'AccountClassEdit-' + pageData.currentData?.id}
                    modalFlag={pageData.modalFlagEdit}
                    modalToggle={modalToggleEdit}
                    dataFromParent={pageData.currentData}
                    callbackFromParent={dataChangedCallback}
                />
            )}
        </ComponentSkeleton>
    );
};

export default AccountClass;
