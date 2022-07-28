import db from "../models/index"
import CRUDService from "../services/CRUDService"
let getHomepage = async(req, res) => {
    try {
        let data = await db.User.findAll()
        console.log('------------------');
        console.log(data);
        console.log('------------------');
        return res.render('homePage.ejs', {
            data:JSON.stringify(data)
        })
    } catch (error) {
        console.log(error);
    }
    
}

let getAboutPage = (req, res) =>{
    return res.render('test/about.ejs')
}
let getCRUD = (req, res) =>{
    return res.render('create-user.ejs')
}
let postCRUD = async(req, res) =>{
    let message = await CRUDService.createNewUser(req.body)
    console.log(message);
    return res.send('post from CRUD')
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log("---------------");
    console.log(data);
    console.log("---------------");
    return res.render('list-user.ejs',{
        dataTable: data
    })
}
let editCRUD = async (req, res) =>{
    let userId = req.query.id 
    
    if(userId) {
        let userData = await CRUDService.getUserById(userId)
        if(userData) {
            return res.render('editCRUD.ejs', {
                user: userData
            })
        }
        else {
            return res.send("user khong ton tai")
        }
        
    }
    else {
        return res.send('khong co user')
    }
    

    
}

let putCRUD = async (req, res) => {
    let data= req.body
    let allUser = await CRUDService.updateUser(data)
    return res.render('list-user.ejs',{
        dataTable: allUser
    })
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id
    if(userId) {
        await CRUDService.deleteUserById(userId)
        return res.send("Deleted!!")
    }
    else {
        return res.send("User not found!!")
    }
}
module.exports = (
    {
        getHomepage: getHomepage,
        getAboutPage: getAboutPage,
        getCRUD: getCRUD,
        postCRUD: postCRUD,
        displayGetCRUD: displayGetCRUD,
        editCRUD: editCRUD,
        putCRUD: putCRUD,
        deleteCRUD: deleteCRUD
    }
)