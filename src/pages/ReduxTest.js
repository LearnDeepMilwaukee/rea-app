import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as orgIdActions from '../redux/actions/currentOrgActions.js'


class OrgId extends React.Component {

    render() {
        return (
            <div className="">
                <button onClick={(event) => this.props.orgIdActions.setCurrentId(11)}>Update State!</button>
                Current Organization id is: {this.props.currentOrgId}
                <button onClick={(event) => this.props.orgIdActions.setCurrentRun(122)}>Update currentRun!</button>
                Current Run Num is: {this.props.currentRun}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentOrgId: state.userInfo.currentOrgId,
        currentRun: state.userInfo.currentRun
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orgIdActions: bindActionCreators(orgIdActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrgId);