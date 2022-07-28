import React, { Component } from 'react';

import { connect } from 'react-redux';
import './HomeHeader.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGE } from '../../utils'
import { changeLanguageApp } from '../../store/actions'
class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let language = this.props.language

        return (
            <div className='home-header-container'>

                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className="fas fa-bars header-icon-menu"></i>
                        <div className='header-logo'>

                        </div>
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home-header.speciality" /></b></div>
                            <span className='title-span'><FormattedMessage id="home-header.speciality" /></span>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home-header.healthFacilities" /></b></div>
                            <span className='title-span'><FormattedMessage id="home-header.chooseClinic" /></span>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home-header.docTor" /></b></div>
                            <span className='title-span'><FormattedMessage id="home-header.chooseDoctor" /></span>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home-header.medicalPackage" /></b></div>
                            <span className='title-span'><FormattedMessage id="home-header.generalHealthCheck" /></span>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'><i class="fas fa-question header-icon-sup"></i>Hỗ trợ</div>
                        <div className={language === LANGUAGE.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGE.VI)}>VN</span></div>
                        <div className={language === LANGUAGE.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGE.EN)}>EN</span></div>
                    </div>
                </div>

                {this.props.isShowBanner == true &&

                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='header-title-1'>NỀN TẢNG Y TẾ</div>
                            <div className='header-title-2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                            <div className='header-search'>
                                <i class="fas fa-search"></i>
                                <input type='text' placeholder='Tìm gói khám' />
                            </div>
                        </div>
                        <div className='content-down'>

                            <ul className='header-list-option'>
                                <li className='header-list-item'>
                                    <i class="far fa-hospital list-icon"></i>
                                    <span className='header-list-name'>Khám chuyên khoa</span>
                                </li>
                                <li className='header-list-item'>
                                    <i class="fas fa-mobile-alt list-icon"></i>
                                    <span className='header-list-name'>Khám từ xa</span>
                                </li>
                                <li className='header-list-item'>
                                    <i class="fas fa-procedures list-icon"></i>
                                    <span className='header-list-name'>Khám tổng quát</span>
                                </li>
                                <li className='header-list-item'>
                                    <i class="fas fa-dna list-icon"></i>
                                    <span className='header-list-name'>Xét nghiệm y học</span>
                                </li>
                                <li className='header-list-item'>
                                    <i class="far fa-hospital list-icon"></i>
                                    <span className='header-list-name'>Sức khỏe tinh thần</span>
                                </li>
                                <li className='header-list-item'>
                                    <i class="fas fa-mobile-alt list-icon"></i>
                                    <span className='header-list-name'>Khám nha khoa</span>
                                </li>
                                <li className='header-list-item'>
                                    <i class="fas fa-procedures list-icon"></i>
                                    <span className='header-list-name'>Gói phẫu thuật</span>
                                </li>
                                <li className='header-list-item'>
                                    <i class="fas fa-dna list-icon"></i>
                                    <span className='header-list-name'>Sản phẩm y tế</span>
                                </li>
                            </ul>

                        </div>

                    </div>
                }

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
