import { getAllCodeService,getAllSpecialty, getTopDocTorHomeService, createNewUserService, getAllUsers, getAllDoctor, saveDetailDoctorService } from '../../services/userService';
import actionTypes from './actionTypes';
import {toast} from "react-toastify"
// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let response = await getAllCodeService("GENDER")
            if (response && response.errCode === 0) {
                dispatch(fetchGenderSuccess(response.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
            dispatch(fetchGenderFailed())
            console.log('fetchGenderStart:', error);
        }
    }

}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})



export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {

            let response = await getAllCodeService("POSITION")
            if (response && response.errCode === 0) {
                dispatch(fetchPositionSuccess(response.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (error) {
            dispatch(fetchPositionFailed())
            console.log('fetchPositionStart:', error);
        }
    }

}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRole = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('role')

            if (res && res.errCode === 0) {

                console.log("save infor success");
                dispatch({
                    type: actionTypes.FETCH_ROLE_SUCCESS,
                    dataRole: res.data
                })
            }
            else {
                console.log("save infor error");
                dispatch({
                    type: actionTypes.FETCH_ROLE_FAILED,

                })
            }
        } catch (error) {
            console.log("save infor success", error);
            dispatch({
                type: actionTypes.FETCH_ROLE_FAILED
            })
        }
    }
}

export const fetchAllUser = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL")

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_USER_SUCCESS,
                    dataUser: res.users
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_USER_FAILED,

                })
            }
        } catch (error) {
            console.log("FETCH_ALL_USER_FAILED", error);
            dispatch({
                type: actionTypes.FETCH_ALL_USER_FAILED
            })
        }
    }
}





export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDocTorHomeService('10')
            console.log("check fetch: ", res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,

                })
            }
        } catch (error) {
            console.log("FETCH_TOP_DOCTORS_FAILED", error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            })
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)

            if (res && res.errCode === 0) {
                toast.success("Tạo mới người dùng thành công!")
                dispatch({
                    type: actionTypes.SAVE_USER_SUCCESS,

                })
                dispatch({
                    type: actionTypes.FETCH_ALL_USER_SUCCESS,
                    dataUser: res.users
                })
            }
            else {
                dispatch({
                    type: actionTypes.SAVE_USER_FAILED,

                })
            }
        } catch (error) {

            dispatch({
                type: actionTypes.SAVE_USER_FAILED
            })
        }
    }
}

export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctor()

            if (res && res.errCode === 0) {
                console.log("check create new user", res);
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr: res.data
                })
            }
            else {
                console.log("SAVE_USER_FAILED");
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,

                })
            }
        } catch (error) {
            console.log("SAVE_USER_FAILED", error);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED
            })
        }
    }
}

export const saveDetaileDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data)
            console.log("check res save", res);
            if (res && res.errCode === 0) {
                toast.success("Thành công")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,

                })
            }
            else {
                toast.error("Thất bại")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,

                })
            }
        } catch (error) {
            console.log("SAVE_DETAIL_DOCTOR_FAILED", error);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME")

            if (res && res.errCode === 0) {

                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }
            else {
                console.log("FETCH_ALLCODE_SCHEDULE_TIME_FAILED");
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,

                })
            }
        } catch (error) {
            console.log("FETCH_ALLCODE_SCHEDULE_TIME_FAILED", error);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}

export const getAllRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })

            let resPrice = await getAllCodeService("PRICE")
            let resPayment = await getAllCodeService("PAYMENT")
            let resProvince = await getAllCodeService("PROVINCE")
            let resSpecialty = await getAllSpecialty()


            if (resPrice && resPrice.errCode === 0 
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode ===0
                ) {
                    let data = {
                        resPrice: resPrice.data,
                        resPayment: resPayment.data,
                        resProvince: resProvince.data,
                        resSpecialty: resSpecialty.data
                    }

                dispatch(fetchRequiredDoctorInforSuccess(data))
            }
            else {
                
                dispatch(fetchRequiredDoctorInforFailed())
            }
        } catch (error) {
            
            dispatch(fetchRequiredDoctorInforFailed())
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
    
})