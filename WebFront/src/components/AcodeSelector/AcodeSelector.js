import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { Select, MenuItem } from '@mui/material';

// redux
import { aclassSuccess, getAclasses } from '../../store/reducers/aclass';
import { acodeSuccess, getAcodes } from '../../store/reducers/acode';

const AcodeDebugLog = () => {};
// const AcodeDebugLog = console.log;

const AcodeSelector = (props) => {
    const dispatch = useDispatch();

    const aclasses = useSelector(getAclasses);
    const acodes = useSelector(getAcodes);

    const [pageData, setPageData] = useState({
        showClass: false,
        showCode: false,
        selectedClass: props.initVal ? props.initVal.substring(0, 1) : null,
        selectedCode: props.initVal
    });

    const toggleClass = (e) => {
        AcodeDebugLog('toggleClass', e);
        setPageData({
            showClass: !pageData.showClass
        });
    };

    const toggleCode = (e) => {
        AcodeDebugLog('toggleCode', e);
        setPageData({
            showClass: !pageData.showCode
        });
    };

    const handleClassSelect = (classObj) => {
        AcodeDebugLog('handleClassSelect', classObj, e);
        if (pageData.selectedClass === null || pageData.selectedClass.id !== classObj.id) {
            setPageData({
                selectedClass: classObj
            });
        }
    };

    const handleCodeSelect = (codeObj) => {
        AcodeDebugLog('handleCodeSelect', codeObj, e);
        if (pageData.selectedCode === null || pageData.selectedCode !== codeObj) {
            setPageData({
                selectedCode: codeObj
            });
            let accObj = {
                classId: pageData.selectedClass.id,
                classTitle: pageData.selectedClass.title,
                codeId: codeObj.id,
                codeNo: codeObj.accountCode,
                codeTitle: codeObj.title
            };
            this.props.accountCodeSelected(accObj);
            this.toggleClass();
        }
    };

    const renderCode = (classObj) => {
        const classCodes = acodes.filter((item) => {
            return item.accountCode.startsWith('' + classObj.id);
        });
        return classCodes.map((data, index) => {
            return (
                <CDropdownItem
                    key={'acode-' + index + '-' + data.id}
                    onClick={() => handleCodeSelect(data)}
                    color={pageData.selectedCode && pageData.selectedCode.id === data.id ? 'primary' : ''}
                    tag="button"
                    type="button"
                    className="m-0"
                >
                    {data.accountCode} - {data.title}
                </CDropdownItem>
            );
        });
    };

    const renderClass = () => {
        return acodes.map((data, index) => {
            return (
                <CDropdown key={'aclass-' + data.id} className="p-0 m-0">
                    <CDropdownToggle
                        onClick={this.handleClassSelect.bind(this, data)}
                        color={this.state.selectedClass && this.state.selectedClass.id === data.id ? 'primary' : ''}
                    >
                        {data.id} - {data.title}
                    </CDropdownToggle>
                    <CDropdownMenu className="p-0 m-0" placement="left-start">
                        {this.renderCode(data)}
                    </CDropdownMenu>
                </CDropdown>
            );
        });
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="acodeSelector">계정코드 선택</InputLabel>
            <Select
            value={pageData.showClass}>
                <CDropdownMenu show={pageData.showClass} className="p-0 m-0" placement="bottom-start">
                    {this.renderClass()}
                </CDropdownMenu>
            </Select>
        </FormControl>
    );
};

export default AcodeSelector;
