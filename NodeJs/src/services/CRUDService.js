import bcrypt from "bcrypt"
import db from "../models/index"
const salt = bcrypt.genSaltSync(10)


let createNewUser = async (data) => {
    return new Promise(async (res, rej) => {
        try {
            let hashPassWordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashPassWordFromBcrypt,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            })
            res("Created!!")
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

let getAllUser = () =>{
    return new Promise(async(res,rej) =>{
        try {
            let users = db.User.findAll({
                raw: true
            });
            res(users)
        } catch (error) {
            rej(error)
        }
    })
}

let getUserById = (userId) => {
    return new Promise(async (res,rej) => {
        try {
            let user = await db.User.findOne({
                where : {id : userId},
                raw: true
            })
            if(user) {
                res(user)
            }
            else {
                res([])
            }
        } catch (error) {
            rej(error)
        }
    })
}

let updateUser = (data) => {
    return new Promise(async(res,rej) => {
        let user = await db.User.findOne({
            where: {id : data.id}
        })

        if(user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save()
            let allUser = await db.User.findAll()
            res(allUser)
        }
        else {
            rej("khong co user trong database")
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (res,rej) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId}
            })
            if(user) {
                await db.User.destroy({
                    where: { id : userId}
                })
            }
            res()
        } catch (error) {
            rej(error)
        }
        
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUser: updateUser,
    deleteUserById: deleteUserById
}