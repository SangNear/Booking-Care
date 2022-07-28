import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService'



class Login extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            username: '',
            password: '',
            isShowPassWord: false,
            errMessage: ''
        }
    }

    handleChangeUserName = (event) => {
        this.setState({
            username: event.target.value,
            
        })
        
    }
    handleChangePassWord = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleShowHidePassWord = () => {
        this.setState({
            isShowPassWord: !this.state.isShowPassWord
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
                
            if(data && data.errCode !==0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if(data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log("login suceeds");
            }
            
        } catch (error) {
            if(error.response) {
                if(error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            
            
        }
        
    }

    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <h1 className='col-12 header-title'>Login</h1>
                    <div className='login-content row'>
                        <div className='col-12 form-group'>
                            <label className='label-text'>Username</label>
                            <input 
                            type='text' 
                            className='form-control login-input' 
                            placeholder='Enter your Username' 
                            
                            onChange={(event) => this.handleChangeUserName(event)} />
                        </div>
                        <div className='col-12 form-group'>
                            <label className='label-text'>Password</label>
                            <div className='option'>
                                <input 
                                    type={this.state.isShowPassWord ? 'text' : 'password'} 
                                    className='form-control login-input' 
                                    placeholder='Enter your Password' 
                                    onChange={(event) => {this.handleChangePassWord(event)}} 
                                />
                                <span onClick={() => {this.handleShowHidePassWord()}}>
                                    <i class={this.state.isShowPassWord ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                    {/* <i class="far fa-eye-slash icon-eye__close disable"></i> */}
                                </span>
                                
                            </div>
                            
                        </div>
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className='col-12 forgot-password'>
                            <span>forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span>Or login with:</span>
                        </div>
                        <div className='col-12 text-center'>
                            <i className="fab fa-facebook icon-socials"></i>
                            <i className="fab fa-google icon-socials"></i>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
