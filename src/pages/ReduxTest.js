import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as orgIdActions from '../redux/actions/currentOrgActions.js'


class OrgId extends React.Component {

    updateState(props) {
        props.orgIdActions.setCurrentId(11);

        console.log("Running" + JSON.stringify(this.props));

    }

    render() {
        console.log(this.props);
        return (
            <div className="">
                <button onClick={(event) => this.updateState(this.props)}>Update State!</button>
                Current Organization id is: {this.props.currentOrgId}
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        currentOrgId: state.currentOrg
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