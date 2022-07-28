import React, { Component } from 'react';

import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';



class About extends Component {

    render() {
        let setting = this.props.setting

        return (
            <div className="section-share section-about">
                <div className='section-about-header'>
                    Truyền Thông
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="60%" height="400" src="https://www.youtube.com/embed/u9WsZoceais" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className='content-right'>

                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
