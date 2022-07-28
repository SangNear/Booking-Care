import { use } from "bcrypt/promises"
import bcrypt from "bcryptjs/dist/bcrypt"
import res from "express/lib/response"
import db from "../models/index"
import emailService from "./emailService"
const salt = bcrypt.genSaltSync(10)
let handleUserLogin = (email, password) => {
    return new Promise(async (res, rej) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id','email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = 'Thanh cong'
                        console.log(user);
                        delete user.password
                        userData.user = user
                    }
                    else {
                        userData.errCode = 3
                        userData.errMessage = 'sai mat khau'
                    }
                }
                else {
                    userData.errCode = 2
                    userData.errMessage = 'User is not exist'
                }
            }
            else {
                userData.errCode = 1
                userData.errMessage = 'Your email is not  exist in our sytem'
                res(userData)
            }
            res(userData)
        } catch (error) {
            rej(error)
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async (res, rej) => {
        try {
            let hashPassWord = await bcrypt.hashSync(password, salt);
            res(hashPassWord)
        } catch (error) {
            rej(error)
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (res, rej) => {
        try {
            let email = await db.User.findOne({
                where: { email: userEmail }
            })

            if (email) {
                res(true)
            }
            else {
                res(false)
            }
        } catch (error) {
            rej(error)
        }
    })
}

let getAllUser = (userId) => {
    return new Promise(async (res, rej) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    raw: true
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    raw: true
                })
            }
            res(users)
        } catch (error) {
            rej(error)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (res, rej) => {
        try {
            let emailIsExists = await checkUserEmail(data.email)
            if (emailIsExists === true) {
                res({
                    errCode: 1,
                    errMessage: 'Your email is already exists'
                })
            }
            else {
                let hashPassWordFromBcrypt = await hashUserPassword(data.password)
                await db.User.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashPassWordFromBcrypt,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
                res({
                    errCode: 0,
                    errMessage: 'thanh cong'
                })
            }            
        } catch (error) {
            rej(error)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async(res, rej) =>{
        try {
            let user = await db.User.findOne({
                where: {id : userId}
            })
            if(!user) {
                res({
                    errCode: 2,
                    errMessage: 'User is not exists'
                })
            }
            await db.User.destroy({
                where: { id : userId}
            })
            res({
                errCode: 0,
                errMessage: 'User deleted!'
            })
        } catch (error) {
            rej(error)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async(res,rej) => {
       
        try {
            if(!data.id) {
                res({
                    errCode: 1,
                    errMessage: 'missing requires parametter'
                })
            }
            let user  = await db.User.findOne({
                where: {id: data.id},
                raw: false
            })
            if(user) {
                    user.firstName= data.firstName
                    user.lastName= data.lastName
                    user.address= data.address

                    await user.save()
                // await db.User.save({
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address
                // })
                res({
                    errCode: 0,
                    errMessage: 'Update successed'
                })
            }
            else{
                res({
                    errCode: 1,
                    errMessage: 'User not found'
                })
            }
            
        } catch (error) {
            rej(error)
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async(resolve, rej ) => {
        try {
            if(!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parametter'
                })
            }
            else {
                let res = {}
                let allcode = await db.Allcode.findAll({
                    where: {type : typeInput}
                });
                res.errCode = 0
                res.data = allcode
                resolve(res)
            }
            
        } catch (error) {
            rej(error)
        }
    })
}

let getEmail = (data) => {
    return new Promise( async(resolve,rej) => {
        try {
            if(!data.email) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing email'
                })
            }
            else {
                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: 'Nguyễn lâm sang',
                    time: '8:00 - 9:00 Thứ bảy 7/5/2022',
                    doctor: "Near2004"
                })
                
                
                resolve({
                    
                    errCode: 0,
                    errMessage: 'Thành công'
                })
            }
        } catch (error) {
            rej(error)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
    getEmail: getEmail
}