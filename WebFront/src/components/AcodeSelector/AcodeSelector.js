import React from 'react';
import { connect } from 'react-redux'

import {
    CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem,
} from '@coreui/react';

import AllActions from '../../actions'


class AcodeSelector extends React.Component {
    constructor(props) {
        super(props);

        this.toggleClass = this.toggleClass.bind(this);
        this.toggleCode = this.toggleCode.bind(this);

        this.handleClassSelect = this.handleClassSelect.bind(this);
        this.handleCodeSelect = this.handleCodeSelect.bind(this);

        this.renderClass = this.renderClass.bind(this);
        this.renderCode = this.renderCode.bind(this);

        this.state = {
            showClass: false,
            showCode: false,
            selectedClass: null,
            selectedCode: null
        }
    }

    toggleClass(e) {
        console.log("toggleClass", e);
        this.setState({
            showClass: !this.state.showClass
        })
    }

    toggleCode(e) {
        console.log("toggleCode", e);
        this.setState({
            showCode: !this.state.showCode
        })
    }

    handleClassSelect(classObj, e) {
        console.log("handleClassSelect", classObj, e);
        if (this.state.selectedClass === null || this.state.selectedClass.id !== classObj.id) {
            this.setState({
                selectedClass: classObj
            })
        }
    }

    handleCodeSelect(codeObj, e) {
        console.log("handleCodeSelect", codeObj, e);
        if (this.state.selectedCode === null || this.state.selectedCode !== codeObj) {
            this.setState({
                selectedCode: codeObj
            })
            let accObj = {
                classId: this.state.selectedClass.id,
                classTitle: this.state.selectedClass.title,
                codeId: codeObj.id,
                codeNo: codeObj.accountCode,
                codeTitle: codeObj.title,
            }
            this.props.callbackFromParent(accObj);
            this.toggleClass();
        }
    }

    renderCode(classObj) {
        const classCodes = this.props.storeAcodes.filter(item => {
            return item.accountCode.startsWith('' + classObj.id);
        });
        return classCodes.map((data, index) => {
            return (
                <CDropdownItem
                    key={'acode-' + data.id}
                    onClick={this.handleCodeSelect.bind(this, data)}
                    color={this.state.selectedCode && this.state.selectedCode.id === data.id ? 'primary' : ''}
                    tag='button'
                    className="m-0">
                    {data.accountCode} - {data.title}
                </CDropdownItem>
            )
        })
    }

    renderClass() {
        return this.props.storeAclasses.map((data, index) => {
            return (
                <CDropdown
                    key={'aclass-' + data.id}
                    className="p-0 m-0">
                    <CDropdownToggle
                        onClick={this.handleClassSelect.bind(this, data)}
                        color={this.state.selectedClass && this.state.selectedClass.id === data.id ? 'primary' : ''}>
                        {data.id} - {data.title}
                    </CDropdownToggle>
                    <CDropdownMenu
                        className="p-0 m-0"
                        placement="left-start">
                        {this.renderCode(data)}
                    </CDropdownMenu>
                </CDropdown>
            )
        })
    }

    render() {
        return (
            <CDropdown>
                <CDropdownToggle
                    color="primary"
                    onClick={this.toggleClass.bind(this)}>
                    계정코드 선택
                </CDropdownToggle>
                <CDropdownMenu
                    show={this.state.showClass}
                    className="p-0 m-0"
                    placement="bottom-start">
                    {this.renderClass()}
                </CDropdownMenu>
            </CDropdown>
        );
    }
}

const mapStateToProps = (state) => ({
    storeAclasses: state.aclass.aclasses,
    storeAcodes: state.acode.acodes,
});

const mapDispatchToProps = (dispatch) => ({
    acodeFetchOk: (data) => dispatch(AllActions.acode.acodeFetchOk(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AcodeSelector);
