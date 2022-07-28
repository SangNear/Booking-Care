import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';


import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
class ManageSchedule extends Component {
    render() {
        // {this.props.isLoggedIn && <Header />}
        const {  isLoggedIn } = this.props;
        return (
            <React.Fragment>
                <div>
                    ManageSchedule
                </div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
