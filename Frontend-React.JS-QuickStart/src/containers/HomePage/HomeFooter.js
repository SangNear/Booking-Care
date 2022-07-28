import React, { Component } from 'react';

import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';



class HomeFooter extends Component {

    render() {
        let setting = this.props.setting

        return (
            <div className="home-footer">
               <p className='copy-text'>&copy; 2022 Nguyễn Lâm Sang </p>
               
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
