// react
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { aclassSuccess, getAclasses } from '../../store/reducers/aclass';

// project import
import ComponentSkeleton from '../../components/ComponentSkeleton';
import SearchBar from '../../components/SearchBar';
import Utils from '../../utils/index';

// in-package
import AccountClassAdd from './AccountClassAdd';
import AccountClassEdit from './AccountClassEdit';

const AccountClass = () => {
    const dispatch = useDispatch();
    const aclasses = useSelector(getAclasses);

    const [pageData, setPageData] = useState({
        emptyId: -1,
        currentData: { id: -1, title: '' },
        keyword: '',
        keywordError: '',
        modalFlagAdd: false,
        modalFlagEdit: false
    });

    const dataChangedCallback = (modifiedData) => {
        if (modifiedData !== undefined && modifiedData !== null) {
            let newDataSet = aclasses.map(ac => ac.id === modifiedData.id ? modifiedData : ac);
            dispatch(aclassSuccess({ aclasses: newDataSet }));
        } else {
            requestFetch();
        }
    };

    const requestFetch = () => {
        const REQ_URI = process.env.NODE_ENV !== 'production' ? '//' + window.location.hostname + ':28080/pds/v1/accountClass' : '/pds/v1/accountClass';
        fetch(REQ_URI, { method: 'GET', headers: Utils.auth.makeAuthHeader() })
            .then(res => { if (!res.ok) throw Error(res.statusText); return res.json(); })
            .then(resJson => dispatch(aclassSuccess({ aclasses: resJson.data })))
            .catch(error => console.log('AccountClass::fetch => ' + error));
    };

    useEffect(() => { requestFetch(); }, []);

    const modalToggleAdd = () => setPageData(p => ({...p, modalFlagAdd: !p.modalFlagAdd}));
    const modalToggleEdit = () => setPageData(p => ({...p, modalFlagEdit: !p.modalFlagEdit}));
    const handleViewAll = () => setPageData(p => ({...p, keyword: ''}));
    const handleSearchGo = (e) => { e.preventDefault(); setPageData(p => ({...p, keyword: e.target.searchKeyword.value })); };
    const handleAdd = () => {
        let newId = pageData.emptyId - 1;
        setPageData(p => ({...p, currentData: { id: newId, title: '' }, modalFlagAdd: !p.modalFlagAdd, emptyId: newId }));
    };
    const handleEdit = (data) => setPageData(p => ({...p, currentData: data, modalFlagEdit: !p.modalFlagEdit }));

    const renderTableList = (dataArray) => {
        const filteredData = pageData.keyword ? dataArray.filter(i => i.title.includes(pageData.keyword)) : dataArray;
        if (!filteredData.length) return (
            <tr><td colSpan="2" className="p-4 text-center">No Data</td></tr>
        );
        return filteredData.map((data, index) => (
            <tr key={data.id} onClick={() => handleEdit(data)} className="hover:bg-gray-100 cursor-pointer border-b">
                <td className="p-2">{data.id}</td>
                <td className="p-2">{data.title}</td>
            </tr>
        ));
    };

    return (
        <ComponentSkeleton>
            <div className="flex justify-between items-center mb-4 gap-2">
                <SearchBar width="50%" keyword={pageData.keyword} onSearchGo={handleSearchGo} onReset={handleViewAll} />
                <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">추가</button>
            </div>
            <table className="w-full border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 text-left">ID</th>
                        <th className="p-2 text-left">분류명</th>
                    </tr>
                </thead>
                <tbody>{renderTableList(aclasses)}</tbody>
            </table>
            {pageData.modalFlagAdd && <AccountClassAdd modalFlag={pageData.modalFlagAdd} modalToggle={modalToggleAdd} dataFromParent={pageData.currentData} callbackFromParent={dataChangedCallback} />}
            {pageData.modalFlagEdit && <AccountClassEdit modalFlag={pageData.modalFlagEdit} modalToggle={modalToggleEdit} dataFromParent={pageData.currentData} callbackFromParent={dataChangedCallback} />}
        </ComponentSkeleton>
    );
};

export default AccountClass;
