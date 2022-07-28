import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService } from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModal: false,
            isOpenModalEditUser: false,
            userData: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();

    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }
    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.users
            })
        }
    }
    toogleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    toogleUserEdit = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            }
            else {
                await this.getAllUserFromReact()
                this.setState({
                    isOpenModal: false
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    handleDeleteUser = async (data) => {

        try {
            let response = await deleteUserService(data.id)

            if (response && response.errCode === 0) {
                await this.getAllUserFromReact()
            }
            else {
                alert(response.errMessage)
            }
        } catch (error) {
            console.log(error);
        }
    }
    handleEditUser = (data) => {
        this.setState({
            isOpenModalEditUser: true,
            userData: data
        })
        
    }

    render() {
        let arrayUser = this.state.arrUser
        return (
            <div className='users-container'>
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toogleUserParent={this.toogleUserModal}
                    text='123'
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toogleUserEdit={this.toogleUserEdit}
                        currentUser = {this.state.userData}
                    // createNewUser = {this.createNewUser}
                    />
                }

                <div className='title text-center'> Manage user</div>
                <div className='mx-1'>
                    <button className='btn btn-primary px-3' onClick={() => this.handleAddNewUser()}>
                        <i class="fas fa-plus"></i>
                        Add new user
                    </button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>

                        {
                            arrayUser && arrayUser.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => { this.handleEditUser(item) }} ><i class="fas fa-edit"></i></button>
                                            <button className='btn-delete' onClick={() => { this.handleDeleteUser(item) }}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }



                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
