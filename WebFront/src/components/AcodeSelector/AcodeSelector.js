import React from 'react';
import { connect } from 'react-redux'

import {
    CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem,
} from '@coreui/react';

import AllActions from '../../actions'


class AcodeSelector extends React.Component {
    constructor(props) {
        super(props);

        this.handleClassSelect = this.handleClassSelect.bind(this);
        this.handleCodeSelect = this.handleCodeSelect.bind(this);

        this.renderClass = this.renderClass.bind(this);
        this.renderCode = this.renderCode.bind(this);

        this.state = {
            selectedClass: -1,
            selectedCode: -1
        }
    }

    handleClassSelect(classId, e) {
        console.log("handleClassSelect", classId, e);
        this.setState({
            selectedClass: classId
        })
    }

    handleCodeSelect(acode, e) {
        console.log("handleCodeSelect", acode, e);
        this.setState({
            selectedCode: acode
        })
        this.props.callbackFromParent(acode);
        this.props.modalToggle();
    }

    renderCode(classNo) {
        const classCodes = this.props.storeAcodes.filter(item => {
            return item.accountCode.startsWith('' + classNo);
        });
        return classCodes.map((data, index) => {
            return (
                <CDropdownItem
                    key={'acode-' + data.id}
                    onClick={this.handleCodeSelect.bind(this, data.accountCode)}
                    color={this.state.selectedCode === data.accountCode ? 'primary' : 'default'}>{data.accountCode} - {data.title}</CDropdownItem>
            )
        })
    }

    renderClass() {
        return this.props.storeAclasses.map((data, index) => {
            return (
                <CDropdown key={'aclass-' + data.id}>
                    <CDropdownToggle
                        onClick={this.handleClassSelect.bind(this, data.id)}
                        color={this.state.selectedClass === data.id ? 'primary' : 'default'}>{data.id} - {data.title}</CDropdownToggle>
                    <CDropdownMenu className="pt-0" placement="right-start">
                        {this.renderCode(data.id)}
                    </CDropdownMenu>
                </CDropdown>
            )
        })
    }

    render() {
        return (
            <CDropdown>
                <CDropdownToggle color="primary">계정코드 선택</CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="bottom-start">
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
