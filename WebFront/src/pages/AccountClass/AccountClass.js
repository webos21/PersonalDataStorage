import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Button, Paper, Card, CardHeader, CardContent, IconButton, Icon, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// redux
import {
    aclassClear,
    aclassRequest,
    aclassSuccess,
    aclassFailure,
    isDataSync,
    getAclassStatus,
    getAclassError,
    getAclasses
} from '../../store/reducers/aclass';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// project import
import ComponentSkeleton from '../../components/ComponentSkeleton';

import Utils from '../../utils';

import AccountClassAdd from './AccountClassAdd.js';
import AccountClassEdit from './AccountClassEdit.js';

const AccountClass = () => {
    const dispatch = useDispatch();

    const aclasses = useSelector(getAclasses);
    const aclassStatus = useSelector(getAclassStatus);
    const aclassError = useSelector(getAclassError);

    const [pageData, setPageData] = useState({
        emptyId: -1,
        dataSet: aclasses,
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
            for (var i = 0; i < pageData.dataSet.length; i++) {
                if (pageData.dataSet[i].id === modifiedData.id) {
                    newDataSet[i] = modifiedData;
                } else {
                    newDataSet[i] = pageData.dataSet[i];
                }
            }
            setPageData({ dataSet: newDataSet });
            dispatch(aclassSuccess({ aclasses: newDataSet }));
        } else {
            this.requestFetch();
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
                        //window.location = '/#/logout';
                    }
                    throw Error('서버응답 : ' + res.statusText + '(' + res.status + ')');
                }
                return res.json();
            })
            .then(function (resJson) {
                console.log('AccountClass::fetch => ' + resJson.result);
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
        let newEmptyId = this.state.emptyId ? this.state.emptyId - 1 : -1;
        let emptyObj = {
            id: newEmptyId,
            title: ''
        };
        setPageData({ emptyId: newEmptyId });
        return emptyObj;
    };

    const modalToggleAdd = () => {
        setPageData({ currentData: this.genEmptyObj(), modalFlagAdd: !this.state.modalFlagAdd });
    };

    const modalToggleEdit = () => {
        setPageData({ modalFlagEdit: !this.state.modalFlagEdit });
    };

    const handleViewAll = () => {
        setPageData({ keyword: '' });
        document.getElementById('frmRefSearch').reset();
    };

    const handleSearchGo = (event) => {
        event.preventDefault();
        setPageData({ keyword: event.target.keyword.value });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        let newObj = genEmptyObj();
        setPageData({ currentData: newObj });
        modalToggleAdd();
    };

    const handleEdit = (data, e) => {
        e.preventDefault();
        console.log('handleEdit', e, data);
        setPageData({ currentData: data });
        modalToggleEdit();
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
                <tr key="row-nodata">
                    <td colSpan="4" className="text-center align-middle" height="200">
                        No Data
                    </td>
                </tr>
            );
        } else {
            return filteredData.map((data, index) => {
                return (
                    <tr key={'accountClass-' + data.id} onClick={() => handleEdit(data)}>
                        <td>{data.id}</td>
                        <td>{data.title}</td>
                    </tr>
                );
            });
        }
    };

    return (
        <ComponentSkeleton>
            <Card>
                <CardHeader>
                    <strong>Search</strong>
                    <small> Memo</small>
                </CardHeader>
                <CardContent>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                        onSubmit={handleSearchGo}
                    >
                        <InputBase name="searchKeyword" sx={{ ml: 1, flex: 1 }} placeholder="검색어 입력" />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        {pageData.keyword !== '' && (
                            <Button type="reset" color="success" onClick={handleViewAll}>
                                전체보기
                            </Button>
                        )}
                    </Paper>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <strong>AccountClass List</strong>
                    <small> (Total : {pageData.totalCount})</small>
                    <span className="float-right">
                        <Button color="danger" size="sm" variant="ghost">
                            <DeleteIcon size="small" />
                            &nbsp;삭제
                        </Button>
                        &nbsp;
                        <Button color="success" size="sm" variant="ghost" onClick={handleAdd}>
                            <AddIcon size="small" />
                            &nbsp;추가
                        </Button>
                    </span>
                </CardHeader>
                <CardContent>
                    <table className="table table-sm table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>분류명</th>
                            </tr>
                        </thead>
                        <tbody>{renderTableList(aclasses)}</tbody>
                    </table>
                </CardContent>
            </Card>

            {pageData.currentData && (
                <AccountClassAdd
                    key={'AccountClassAdd-' + pageData.currentData.id}
                    modalFlag={pageData.modalFlagAdd}
                    modalToggle={modalToggleAdd}
                    dataFromParent={pageData.currentData}
                    callbackFromParent={dataChangedCallback}
                />
            )}
            {pageData.currentData && (
                <AccountClassEdit
                    key={'AccountClassEdit-' + pageData.currentData.id}
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
