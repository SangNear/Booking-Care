import express from "express";
import homeController from "../controller/homeController"
import userController from "../controller/userController"
import patientController from "../controller/patientController"
import doctorController from "../controller/doctorController"
import specialtyController from "../controller/specialtyController"
let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/about', homeController.getAboutPage)
    router.get('/create-user' , homeController.getCRUD)            //crud
    router.post('/post-crud' , homeController.postCRUD)
    router.get('/list-user', homeController.displayGetCRUD) //get-crud
    router.get('/edit-crud', homeController.editCRUD)
    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUser)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.get('/api/allcode', userController.getAllCode)
    router.get('/api/top-doctor-home', doctorController.getTopDocTorHome)
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById)
    router.get('/api/get-all-doctor', doctorController.getAllDoctor)
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate)
    router.post('/api/save-info-doctor', doctorController.postInforDoctor)
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById)
    router.get('/api/get-list-patient-for-doctor', doctorController.getListPatientForDoctor)
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById)
    router.post('/api/patient-book-appointment', patientController.postBookAppointment)
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment)
    router.post('/api/sendEmail', userController.handleSendEmail)
    router.post('/api/create-new-specialty', specialtyController.createSpecialty)
    router.get('/api/get-specialty', specialtyController.getAllSpecialty)
    return app.use("/", router)
}

module.exports = initWebRoutes