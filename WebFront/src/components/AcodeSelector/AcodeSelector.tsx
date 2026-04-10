import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acodeSuccess, getAcodes } from '../../store/reducers/acode';
import { getAclasses } from '../../store/reducers/aclass';

const AcodeSelector: React.FC<{ initVal?: string }> = ({ initVal }) => {
    const dispatch = useDispatch();
    const aclasses = useSelector(getAclasses);
    const acodes = useSelector(getAcodes);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(initVal || '');

    const handleSelect = (code: string) => {
        setSelected(code);
        setIsOpen(false);
        const found = acodes.find(c => c.accountCode === code);
        if (found) dispatch(acodeSuccess(found));
    };

    return (
        <div className="relative w-full">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full border p-2 rounded bg-white text-left"
            >
                {selected || '계정코드 선택'}
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full border bg-white shadow-lg mt-1 max-h-60 overflow-y-auto">
                    {aclasses.map(cls => (
                        <div key={cls.id} className="p-2 font-bold bg-gray-100">{cls.title}</div>
                    ))}
                    {acodes.map(code => (
                        <div 
                            key={code.id} 
                            onClick={() => handleSelect(code.accountCode)}
                            className="p-2 hover:bg-blue-50 cursor-pointer"
                        >
                            {code.accountCode} - {code.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AcodeSelector;
