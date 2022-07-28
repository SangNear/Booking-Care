const db = require("../models")

let createSpecialty = (data) => {
    return new Promise(async(res, rej) => {
        try {
            if(!data.name
                || !data.imageBase64
                || !data.descriptionHTML
                || !data.descriptionMarkdown
                ) {
                    res({
                        errCode: 1,
                        errMessage: 'Missing parrametter'
                    })
                } else {
                    await db.Specialty.create({
                        name: data.name,
                        image: data.imageBase64,
                        descriptionHTML: data.descriptionHTML,
                        descriptionMarkdown: data.descriptionMarkdown
                    })
                    res({
                        errCode : 0,
                        errMessage: 'Ok'
                    })
                }
        } catch (e) {
            rej(e)
        }
    })
}
let getAllSpecialty = (data) => {
    return new Promise(async(res, rej) => {
        try {
            let data = await db.Specialty.findAll({
                
            })
            if(data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item
                })
            }
            res({
                errMessage: 'ok',
                errCode: 0,
                data
            })
        } catch (e) {
            rej(e)
        }
    })
}


module.exports = { 
    createSpecialty:createSpecialty,
    getAllSpecialty : getAllSpecialty

}