import db from "../models/index"
require('dotenv').config()
import _ from 'lodash'

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE

let getTopDocTorHome = (limet) => {
    return new Promise(async (res, rej) => {
        try {
            let users = await db.User.findAll({
                limit: limet,
                where: { roleId: 'R2' },
                order: [[
                    'createdAt', 'DESC'
                ]],
                attributes: {
                    exclude: ['password',]
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],

                raw: true,
                duplicating: false,

                nest: true
            })

            res({
                errCode: 0,
                data: users
            })
        } catch (error) {
            rej(error)
        }
    })
}


let getDetailDoctorById = (inputId) => {
    return new Promise(async (res, rej) => {
        try {
            if (!inputId) {
                res({
                    errCode: 1,
                    errMessage: 'Missing required parametter!'
                })
            }
            else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },

                    attributes: {
                        exclude: ['password']
                    },

                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                            ]
                        }
                    ],

                    raw: false,
                    nest: true
                })

                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')
                }

                res({
                    errCode: 0,
                    data: data
                })
            }
        } catch (error) {
            rej(error)
        }
    })
}

let getExtraInforDoctorById = (inputId) => {
    return new Promise(async (res, rej) => {
        try {
            if (!inputId) {
                res({
                    errCode: 1,
                    errMessage: 'Missing required parametter!'
                })
            }
            else {
                let data = await db.User.findOne({
                    where: {
                        doctorId: inputId
                    },

                    attributes: {
                        exclude: ['id', 'doctorId']
                    },

                    include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                    ],

                    raw: false,
                    nest: true
                })

                if (!data) data = {}
                res({
                    errCode: 0,
                    data: data
                })



            }
        } catch (error) {
            rej(error)
        }
    })
}


let getAllDoctor = (req, res) => {
    return new Promise(async (res, rej) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                }
            })

            res({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            rej(error)
        }
    })
}

let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (res, rej) => {
        try {
                let checkObj = checkRequiredFields(inputData)
                if(checkObj.isValid === false)
             
                res({
                    errCode: 1,
                    errMessage: `Missing parametter:${checkObj.element}`
                })
            
            else {
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    })
                }
                else if (inputData.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    })

                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML,
                            doctorMarkdown.contentMarkdown = inputData.contentMarkdown,
                            doctorMarkdown.description = inputData.description,
                            doctorMarkdown.updatedAt = new Date()

                        await doctorMarkdown.save()
                    }
                }

                let doctorInfor = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: inputData.doctorId
                    },
                    raw: false
                })
                if (doctorInfor) {
                    doctorInfor.doctorId = inputData.doctorId
                    doctorInfor.priceId = inputData.selectedPrice
                    doctorInfor.provinceId = inputData.selectedProvince
                    doctorInfor.paymentId = inputData.selectedPayment
                    doctorInfor.nameClinic = inputData.nameClinic
                    doctorInfor.addressClinic = inputData.addressClinic
                    doctorInfor.note = inputData.note
                    doctorInfor.specialtyId = inputData.specialtyId
                    doctorInfor.clinicId = inputData.clinicId
                    await doctorInfor.save()
                }
                else {
                    await db.Doctor_Infor.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.selectedPrice,
                        provinceId: inputData.selectedProvince,
                        paymentId: inputData.selectedPayment,
                        nameClinic: inputData.nameClinic,
                        addressClinic: inputData.addressClinic,
                        note: inputData.note,
                        specialtyId : inputData.specialtyId,
                        clinicId : inputData.clinicId
                    })
                }

                res({
                    errCode: 0,
                    errMessage: "Save info doctor succed"
                })
            }
        } catch (error) {
            rej(error)
        }
    })
}

let bulkCreateSchedule = (data) => {
    return new Promise(async (res, rej) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
                res({
                    errCode: 1,
                    errMessage: 'Missing required param!'
                })
            }
            else {
                let schedule = data.arrSchedule
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE
                        return item
                    })
                }


                let existing = await db.Schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.formatedDate },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true
                }

                )

                let toCreate = _.differenceWith(schedule, existing, (a, b) => {

                    return a.timeType === b.timeType && +a.date === +b.date

                })

                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate)
                }


                console.log('check diff ===============', toCreate);
                // 

                res({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }

        } catch (error) {
            rej(error)
        }
    })
}
let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (res, rej) => {
        try {
            if (!doctorId || !date) {
                res({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    include: [

                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] },
                    ],

                    raw: false,
                    nest: true
                })
                if (!dataSchedule) dataSchedule = []

                res({
                    errCode: 0,
                    data: dataSchedule
                })
            }


        } catch (error) {
            rej(error)
        }
    })
}

let getProfileDoctorById = (inputId) => {
    return new Promise(async (res, rej) => {
        try {
            if (!inputId) {
                res({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId

                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [

                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        {model : db.Allcode, as:'positionData' , attributes: ['valueEn', 'valueVi']},
                        {
                            model: db.Doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },

                            include : [
                                {model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi']},
                                {model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi']},
                                {model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi']}
                            ]
                        }
                    ],

                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary')
                }

                if(!data) data = {}

                res({
                    errCode: 0,
                    data: data
                })
            }


        } catch (error) {
            rej(error)
        }
    })
}

let checkRequiredFields = (inputData) => {
    let arrFields = ['doctorId', 'contentHTML','contentMarkdown',
    'action', 'selectedPrice','selectedPayment',
    'nameClinic', 'addressClinic', 'note']

    let isValid = true

    let element = ''
    for(let i = 0; i < arrFields.length; i++) {
        if(!inputData[arrFields[i]]) {
            isValid = false
            element = arrFields[i]
            break
        }
    }
    return {
        isValid: isValid,
        element: element
    }
}
let getListPatientForDoctor = (doctorId, date) => {
    return new Promise(async (res, rej) => {
        try {
            if(!doctorId || !date) {
                res({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        statusId: 'S2',
                        doctorId: doctorId,
                        date: date
                    },
                    include: [ 
                        {
                            model: db.User, as:'patientData',
                            attributes: ['email', 'firstName','address', 'gender'],
                            include: [
                                {
                                    model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']
                                }
                            ]
                        },
                        {
                            model: db.Allcode, as:'timeTypeDataPatient', attributes: ['valueEn', 'valueVi']
                        }
                    ],
                    raw: false,
                    nest: true
            })
            res({
                errCode: 0,
                data:data
            })
        }
            
        } catch (error) {
            rej(error)
        }
    })
}

module.exports = {
    getTopDocTorHome: getTopDocTorHome,
    getDetailDoctorById: getDetailDoctorById,
    getAllDoctor: getAllDoctor,
    saveDetailInforDoctor: saveDetailInforDoctor,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getProfileDoctorById: getProfileDoctorById,
    getExtraInforDoctorById: getExtraInforDoctorById,
    checkRequiredFields : checkRequiredFields,
    getListPatientForDoctor: getListPatientForDoctor
}