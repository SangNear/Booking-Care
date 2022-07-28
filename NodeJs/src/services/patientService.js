import db from "../models/index"
require('dotenv').config()
import emailService from './emailService'
import {v4 as uuidv4} from 'uuid'
import moment from 'moment';

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result
}
let postBookAppointment = (data) => {
    return new Promise(async (res, rej) => {
        try {
            if (!data.email 
                || !data.doctorId 
                || !data.timeType 
                || !data.date 
                || !data.fullName
                || !data.selectedGender
                || !data.address
                ) {
                res({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let token = uuidv4()
                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctor: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })




                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName
                    },

                })


                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: new Date(moment(new Date()).startOf('day').valueOf()).getTime(),
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }

                res({
                    errCode: 0,
                    errMessage: 'save infor patient succeed'
                })
            }

        } catch (error) {
            rej(error)
        }
    })
}

let postVerifyBookAppointment = (data) => {
    return new Promise(async (res, rej) => {
        try {
            if (!data.token  || !data.doctorId  ) {
                res({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let appointment = await db.Booking.findOne({
                    where : {
                        doctorId: data.doctorId,

                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                
                if(appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save()

                    res({
                        errCode: 0,
                        errMessage: "Update the appointment succeed"
                    })
                } else {
                    res({
                        errCode: 2,
                        errMessage: "Appointment has been activated or does not exitst"
                    })
                } 
            }

        } catch (error) {
            rej(error)
        }
    })
}

module.exports = { 
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}