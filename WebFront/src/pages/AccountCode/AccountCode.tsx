// library
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// redux
import { acodeSuccess, getAcodes } from '@/shared/stores/reducers/acode';

// project import
import PageLayout from '@/shared/ui/layout/PageLayout';
import PageHeader from '@/shared/ui/layout/PageHeader';

import AcodeSelector from '@/shared/ui/code-selector/AcodeSelector';
import SearchBar from '@/shared/ui/search/SearchBar';
import Utils from '@/shared/utils2/index';

// in-package
import AccountCodeAdd from './AccountCodeAdd';
import AccountCodeEdit from './AccountCodeEdit';

const AccountCode = () => {
    const dispatch = useDispatch();
    const acodes = useSelector(getAcodes);

    const [pageData, setPageData] = useState({
        emptyId: -1,
        currentData: { id: -1, accountCode: '', title: '' },
        keyword: '',
        modalFlagAdd: false,
        modalFlagEdit: false,
        acodeSelected: ''
    });

    const dataChangedCallback = (modifiedData) => {
        if (modifiedData) {
            let newDataSet = acodes.map((ac) => (ac.id === modifiedData.id ? modifiedData : ac));
            dispatch(acodeSuccess({ acodes: newDataSet }));
        } else {
            requestFetch();
        }
    };

    const acodeSelectedCallback = (codeObj) => {
        let newVal = `${codeObj.codeNo} / ${codeObj.classTitle}(${codeObj.classId}) > ${codeObj.codeTitle}(${codeObj.codeNo})`;
        setPageData((p) => ({ ...p, acodeSelected: newVal }));
    };

    const requestFetch = () => {
        const REQ_URI =
            process.env.NODE_ENV !== 'production' ? '//' + window.location.hostname + ':28080/pds/v1/accountCode' : '/pds/v1/accountCode';
        fetch(REQ_URI, { method: 'GET', headers: Utils.auth.makeAuthHeader() })
            .then((res) => res.json())
            .then((resJson) => dispatch(acodeSuccess({ acodes: resJson.data })))
            .catch((error) => console.log('AccountCode::fetch [ERROR]', error));
    };

    useEffect(() => {
        requestFetch();
    }, []);

    const modalToggleAdd = () => setPageData((p) => ({ ...p, modalFlagAdd: !p.modalFlagAdd }));
    const modalToggleEdit = () => setPageData((p) => ({ ...p, modalFlagEdit: !p.modalFlagEdit }));
    const handleAdd = () => {
        let newId = pageData.emptyId - 1;
        setPageData((p) => ({
            ...p,
            currentData: { id: newId, accountCode: '', title: '' },
            modalFlagAdd: !p.modalFlagAdd,
            emptyId: newId
        }));
    };
    const handleEdit = (data) => setPageData((p) => ({ ...p, currentData: data, modalFlagEdit: !p.modalFlagEdit }));

    const renderTableList = (dataArray) => {
        const filteredData = pageData.keyword ? dataArray.filter((i) => i.title.includes(pageData.keyword)) : dataArray;
        if (!filteredData.length)
            return (
                <tr>
                    <td colSpan="3" className="p-4 text-center">
                        No Data
                    </td>
                </tr>
            );
        return filteredData.map((data) => (
            <tr key={data.id} onClick={() => handleEdit(data)} className="hover:bg-gray-100 cursor-pointer border-b">
                <td className="p-2">{data.id}</td>
                <td className="p-2">{data.accountCode}</td>
                <td className="p-2">{data.title}</td>
            </tr>
        ));
    };

    return (
        <PageLayout>
            <PageHeader icon={Activity} title="대시보드" desc="시스템 현황 및 주요 지표 모니터링" iconClass="bg-blue-100 text-blue-600" />

            <div className="flex justify-between items-center mb-4 gap-2">
                <SearchBar
                    width="50%"
                    keyword={pageData.keyword}
                    onSearchGo={(e) => {
                        e.preventDefault();
                        setPageData((p) => ({ ...p, keyword: e.target.searchKeyword.value }));
                    }}
                    onReset={() => setPageData((p) => ({ ...p, keyword: '' }))}
                />
                <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">
                    추가
                </button>
            </div>
            <table className="w-full border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-2 text-left">ID</th>
                        <th className="p-2 text-left">계정코드</th>
                        <th className="p-2 text-left">분류명</th>
                    </tr>
                </thead>
                <tbody>{renderTableList(acodes)}</tbody>
            </table>
            {pageData.modalFlagAdd && (
                <AccountCodeAdd
                    modalFlag={pageData.modalFlagAdd}
                    modalToggle={modalToggleAdd}
                    dataFromParent={pageData.currentData}
                    callbackFromParent={dataChangedCallback}
                />
            )}
            {pageData.modalFlagEdit && (
                <AccountCodeEdit
                    modalFlag={pageData.modalFlagEdit}
                    modalToggle={modalToggleEdit}
                    dataFromParent={pageData.currentData}
                    callbackFromParent={dataChangedCallback}
                />
            )}

            <div className="mt-6 bg-white shadow rounded p-4">
                <h3 className="font-bold mb-2">Test AccountCode</h3>
                <div className="flex items-center gap-2">
                    <label>Selected:</label>
                    <input type="text" value={pageData.acodeSelected} className="border p-2" readOnly />
                    <AcodeSelector accountCodeSelected={acodeSelectedCallback} />
                </div>
            </div>
        </PageLayout>
    );
};

export default AccountCode;
