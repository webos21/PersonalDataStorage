// react
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// redux
import { aclassSuccess, getAclasses } from '../../store/reducers/aclass';
import { acodeSuccess, getAcodes } from '../../store/reducers/acode';

// project
import NestedMenuItem from '../Dropdown/NestedMenuItem2';

// const AcodeDebugLog = () => {};
const AcodeDebugLog = console.log;

const AcodeSelector = (props) => {
    const dispatch = useDispatch();

    const aclasses = useSelector(getAclasses);
    const acodes = useSelector(getAcodes);

    const [pageData, setPageData] = useState({
        selectedClass: props.initVal ? props.initVal.substring(0, 1) : null,
        selectedCode: props.initVal
    });

    const handleClassSelect = (classObj) => {
        AcodeDebugLog('handleClassSelect', classObj);
        if (pageData.selectedClass === null || pageData.selectedClass !== classObj) {
            setPageData({
                selectedClass: classObj
            });
        }
    };

    const handleCodeSelect = (codeObj) => {
        AcodeDebugLog('handleCodeSelect', codeObj);
        if (pageData.selectedCode === null || pageData.selectedCode !== codeObj) {
            setPageData({
                selectedCode: codeObj
            });
        }
    };

    const renderCode = (classObj, hiddenFlag) => {
        const classCodes = acodes.filter((item) => {
            return item.accountCode.startsWith('' + classObj.id);
        });

        AcodeDebugLog(hiddenFlag, classObj);

        if (!pageData.selectedClass) return;

        return classCodes.map((data, index) => {
            return hiddenFlag ? (
                <MenuItem key={'acode-hidden-' + index + '-' + data.id} value={data.accountCode} sx={{ diplay: 'none' }}>
                    {data.accountCode} - {data.title}
                </MenuItem>
            ) : (
                <MenuItem
                    key={'acode-view-' + index + '-' + data.id}
                    data-value={data.accountCode}
                    onClick={() => handleCodeSelect(data)}
                    sx={{ color: pageData.selectedCode?.id === data.id ? 'primary' : '' }}
                >
                    {data.accountCode} - {data.title}
                </MenuItem>
            );
        });
    };

    const renderClass = () => {
        return aclasses.map((data, index) => {
            return (
                <NestedMenuItem
                    key={'aclass-nest-' + index + '-' + data.id}
                    label={data.id + '-' + data.title}
                    onClick={() => handleClassSelect(data)}
                    parentMenuOpen={pageData.selectedClass?.id === data.id}
                    sx={{ color: pageData.selectedClass?.id === data.id ? 'primary' : '' }}
                >
                    {renderCode(data, false)}
                </NestedMenuItem>
            );
        });
    };

    return (
        <FormControl>
            <InputLabel htmlFor="acodeSelector">계정코드 선택</InputLabel>
            <Select id="acodeSelector" value={pageData.selectedCode?.accountCode} onChange={(e) => AcodeDebugLog(e)}>
                {renderClass()}
            </Select>
        </FormControl>
    );
};

export default AcodeSelector;
