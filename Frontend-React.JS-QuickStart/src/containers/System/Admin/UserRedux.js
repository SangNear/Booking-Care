import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import * as actions from "../../../store/actions"
import { LANGUAGE, CommonUtils } from "../../../utils"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './UserRedux.scss'
import TableManageUser from './TableManageUser';


class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewimgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
        }
    }


    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPosition()
        this.props.getRole()
        // try {
        //    let res = await getAllCodeService('gender') 
        //    console.log("check response", res);
        //    if(res && res.errCode === 0) {
        //        this.setState({
        //            genderArr: res.data
        //        })
        //    }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux
            this.setState({
                genderArr: arrGender,
                // genderArr: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
            })
        }
        if (prevProps.positonRedux !== this.props.positonRedux) {
            let arrPosition = this.props.positonRedux
            this.setState({
                positionArr: arrPosition,
                // positionArr: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                // roleArr: arrRole && arrRole .length > 0 ? arrRole[0].keyMap : ''
            })
        } 
        if (prevProps.listUserRedux !== this.props.listUserRedux) {

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',

            })
        }
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewimgUrl: objectUrl,
                avatar: base64
            })
        }


    }
    openPreviewImg = () => {
        this.setState({
            isOpen: true
        })
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }, () => {
            console.log("check input change", this.state);
        })
    }

    handleSubmit = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;


        this.props.createNewUser({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
            avatar: this.state.avatar
        })




    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert("This input is require!" + arrCheck[i])
                break
            }

        }
        return isValid
    }
    render() {

        let listGender = this.state.genderArr;
        let language = this.props.language
        let isGerGender = this.props.isLoadingGender
        let listPosition = this.state.positionArr
        let listRole = this.state.roleArr

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar, } = this.state


        return (
            <div className='user-redux-container'>
                <div className='title'>
                    UserRedux
                </div>

                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>

                            <div className='col-12'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-12'>
                                {isGerGender === true ? 'Loading gender' : ''}
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.firstName" /></label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.lastName" /></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone" /></label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select class="form-control"

                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                >
                                    <option selected>Choose...</option>
                                    {listGender && listGender.length > 0 &&
                                        listGender.map(gender => {
                                            return (
                                                <option value={gender.keyMap}>{language === LANGUAGE.EN ? gender.valueEn : gender.valueVi}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select class="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}>
                                    <option selected>Choose...</option>
                                    {
                                        listPosition.map(position => {
                                            return (
                                                <option value={position.keyMap}>{language === LANGUAGE.EN ? position.valueEn : position.valueVi}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.roleId" /></label>
                                <select class="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}>
                                    <option selected>Choose...</option>
                                    {
                                        listRole.map(role => {
                                            return (
                                                <option value={role.keyMap}>{language === LANGUAGE.EN ? role.valueEn : role.valueVi}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file'
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />

                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i class="fas fa-upload"></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewimgUrl})` }}
                                        onClick={() => { this.openPreviewImg() }}
                                    >

                                    </div>
                                </div>

                            </div>
                            <div className='col-12'>
                                <button className='btn btn-primary' style={{ padding: "0 10px" }}
                                    onClick={() => this.handleSubmit()}
                                >Save</button>
                            </div>

                            <div className='col-12 mb-5'>
                                <TableManageUser />
                            </div>

                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewimgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        language: state.app.language,
        isLoadingGender: state.admin.isLoadingGender,
        positonRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUserRedux: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPosition: () => dispatch(actions.fetchPositionStart()),
        getRole: () => dispatch(actions.fetchRole()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUser())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
