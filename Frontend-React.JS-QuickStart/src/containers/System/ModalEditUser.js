
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import UserManage from './UserManage';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount = () => {
        let user = this.props.currentUser
        console.log("did mount user: ",user);
        if (user && !_.isEmpty(user)) {
            this.setState({
                email: user.email,
                password:'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toogle = () => {
        this.props.toogleUserEdit()
    }
    handleOnchangeInput = (event, id) => {
        // this.state[id] = event.target.value 
        // this.setState ({
        //     ...this.state
        // }, ()=> {
        //     console.log('bad code', this.state);
        // })

        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }, () => {
            console.log('check good code:', this.state);
        })
        console.log(event.target.value, id);
    }
    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parametter :', arrInput[i])
                break
            }
        }
        return isValid
    }
    hanleAddNewUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            console.log('check  props child ', this.props);
            this.props.createNewUser(this.state)

        }
    }

    render() {

        return (

            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toogle() }}
                className={'modal-user-container'}
                size='lg'
                centered

            >
                <ModalHeader toggle={() => { this.toogle() }}>Edit User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text' onChange={(event) => { this.handleOnchangeInput(event, 'email') }} />
                        </div>
                        <div className='input-container'>
                            <label>PassWord</label>
                            <input type='password' onChange={(event) => { this.handleOnchangeInput(event, 'password') }} />
                        </div>
                        <div className='input-container'>
                            <label>FirstName</label>
                            <input type='text' onChange={(event) => { this.handleOnchangeInput(event, 'firstName') }} />
                        </div>
                        <div className='input-container'>
                            <label>LastName</label>
                            <input type='text' onChange={(event) => { this.handleOnchangeInput(event, 'lastName') }} />
                        </div>
                        <div className='input-container'>
                            <label>Address</label>
                            <input type='text' onChange={(event) => { this.handleOnchangeInput(event, 'address') }} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.hanleAddNewUser() }}>Save change</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);

