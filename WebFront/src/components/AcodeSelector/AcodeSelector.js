import React from 'react';
import { connect } from 'react-redux'

import {
    CModal, CModalHeader, CModalBody, CModalFooter, CButton, CRow, CCol,
    CListGroup, CListGroupItem,
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

    renderClass() {
        return this.props.storeAclasses.map((data, index) => {
            return (
                <CListGroupItem
                    key={data.id}
                    onClick={this.handleClassSelect.bind(this, data.id)}
                    active={this.state.selectedClass === data.id}>{data.id} - {data.title}</CListGroupItem>
            )
        })
    }

    renderCode(classNo) {
        const classCodes = this.props.storeAcodes.filter(item => {
            return item.accountCode.startsWith('' + classNo);
        });
        return classCodes.map((data, index) => {
            return (
                <CListGroupItem
                    key={data.id}
                    onClick={this.handleCodeSelect.bind(this, data.accountCode)}
                    active={this.state.selectedCode === data.accountCode}>{data.accountCode} - {data.title}</CListGroupItem>
            )
        })
    }

    render() {
        return (
            <CModal show={this.props.modalFlag} onClose={this.props.modalToggle}
                className={'modal-success ' + this.state.className}>
                <CModalHeader closeButton>계정코드 추가</CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol>
                            <CListGroup>
                                {this.renderClass()}
                            </CListGroup>

                        </CCol>
                        <CCol>
                            <CListGroup>
                                {this.renderCode(this.state.selectedClass)}
                            </CListGroup>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton type="submit" color="success">추가</CButton>{' '}
                    <CButton color="secondary" onClick={this.props.modalToggle}>취소</CButton>
                </CModalFooter>
            </CModal>
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
