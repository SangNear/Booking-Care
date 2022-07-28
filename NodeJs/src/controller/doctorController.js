import doctorService from "../services/doctorService"

let getTopDocTorHome = async (req, res) => {
    let limet = req.query.limet
    if(!limet) limet = 10
    try {
        let response = await doctorService.getTopDocTorHome(+limet);
        
        return res.status(200).json(response)
        
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from servers'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let info = await doctorService.getDetailDoctorById(req.query.id);
        return res.status(200).json(
            info
        )
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from servers'
        })
    }
}

let getAllDoctor = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctor()
        return res.status(200).json(doctors)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage : 'Error code from server'
        })
    }
}

let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveDetailInforDoctor(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let bulkCreateSchedule = async(req,res) => {
    try {
        let info = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json(
            info
        )
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from servers'
        })
    }
}

let getScheduleByDate = async(req,res) => {
    try {
        let info = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date);
        return res.status(200).json(
            info
        )
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from servers'
        })
    }
}

let getExtraInforDoctorById = async(req,res) => {
    try {
        let info = await doctorService.getExtraInforDoctorById(req.query.doctorId);
        return res.status(200).json(
            info
        )
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: `Error from servers${error}`
        })
    }k
}

let getProfileDoctorById = async(req,res) => {
    try {
        let info = await doctorService.getProfileDoctorById(req.query.doctorId);
        return res.status(200).json(
            info
        )
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from servers'
        })
    }
}
let getListPatientForDoctor = async(req,res) => {
    try {
        let info = await doctorService.getListPatientForDoctor(req.query.doctorId, req.query.date);
        return res.status(200).json(
            info
        )
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: `Error from servers${error}`
        })
    }
}




module.exports = {
    getTopDocTorHome: getTopDocTorHome,
    getDetailDoctorById: getDetailDoctorById,
    getAllDoctor: getAllDoctor,
    postInforDoctor: postInforDoctor,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor :getListPatientForDoctor
}