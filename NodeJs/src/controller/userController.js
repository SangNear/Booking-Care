import userService from "../services/userService"

let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing  inputs user!!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id
    if (!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing require parametter',
            users: []
        })
    }
    let users = await userService.getAllUser(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    console.log(message);
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        res({
            errCode: 1,
            errMessage: 'Not found user in system!!'
        })
    }

    let message = await userService.deleteUser(req.body.id)
    console.log(message);
    return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
    let data = req.body
    let message = await userService.updateUserData(data)
    return res.status(200).json(message)
}

let getAllCode = async (req, res) => {
    try {
        
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data)

    } catch (error) {
        return res.status(200).json({
            error: -1,
            errMessage: 'Error from server'
        })
    }
}
let handleSendEmail = async (req, res) => {
    try {
        let info = await userService.getEmail(req.body)
        console.log(info);
        return res.status(200).json(
            info
        )
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }

}
module.exports = {

    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
    handleSendEmail: handleSendEmail
    
}

