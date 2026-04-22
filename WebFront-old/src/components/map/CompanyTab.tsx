import { useState } from 'react';

const CompanyTab = (props) => {
    const { setListControl } = props;
    const companyList = {
        m2cloud: { companyId: 'm2cloud', companyName: 'm2cloud(배송)' },
        optilo_d: { companyId: 'optilo_delivery', companyName: 'Optilo(배송)' },
        optilo_r: { companyId: 'optilo_return', companyName: 'Optilo(수거)' }
    };

    const titleInfo = {
        healthCheck: { companyType: '국건영', companies: [companyList.m2cloud] },
        immune: { companyType: '이뮨셀', companies: [companyList.optilo_d, companyList.optilo_r] }
    };

    const [viewControl, setViewControl] = useState({
        selectedCompanyType: 'healthCheck',
        selectedCompanyId: undefined
    });

    return (
        <div className="w-full">
            <div className="flex border-b border-gray-200">
                {Object.keys(titleInfo).map((k) => (
                    <button
                        key={k}
                        className={`px-4 py-2 text-sm font-medium ${viewControl.selectedCompanyType === k ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setViewControl({ ...viewControl, selectedCompanyType: k })}
                    >
                        {titleInfo[k].companyType}
                    </button>
                ))}
            </div>
            <div className="p-4">
                <div className="flex gap-4">
                    {titleInfo[viewControl.selectedCompanyType].companies.map((c) => (
                        <label key={c.companyId} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="company"
                                value={c.companyId}
                                checked={viewControl.selectedCompanyId === c.companyId}
                                onChange={(e) => {
                                    const cId = e.target.value;
                                    setViewControl({ ...viewControl, selectedCompanyId: cId });
                                    const keyword = cId === 'm2cloud' ? '29' : cId;
                                    setListControl({ tab: keyword });
                                }}
                                className="w-4 h-4 text-blue-600"
                            />
                            {c.companyName}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyTab;
