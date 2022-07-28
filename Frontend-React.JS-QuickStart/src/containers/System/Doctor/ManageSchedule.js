import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageSchedule.scss'
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { CRUD_ACTIONS, LANGUAGE,dateFormat } from '../../../utils';
import DatePicker from "../../../components/Input/DatePicker"
import moment from 'moment';
import _ from 'lodash';
import {saveBulkScheduleDoctor} from "../../../services/userService"
import { toast } from 'react-toastify';

class ManageSchedule extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listDoctors: [],
            selectedOption: {},
            currentDate: '',
            rangeTime: []
            
        }
    }


    componentDidMount() {
        this.props.fetchAllDoctor()
        this.props.fetchAllScheduleTime()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctor !== this.props.listDoctor) {
            let dataSelect = this.builDataInputSelect(this.props.listDoctor)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if(data && data.length > 0) {
                // data = data.map(item => {
                //     item.isSelected = false
                //     return item
                // })

                data = data.map(item => ({ ...item, isSelected: false}))
            }
            this.setState({
                rangeTime: data
            })
        }

    }

    builDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.lastName} ${item.firstName}`

                object.label = language === LANGUAGE.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }
        return result
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedOption: selectedDoctor })

    };

    hanldeOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let {rangeTime} = this.state
        console.log("rangtime bfor", rangeTime);
        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected
                return item
            })

            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleSaveSchedule = async () => {
        let {rangeTime, selectedOption, currentDate} = this.state
        let result = []
        if(!currentDate) {
            console.log("invalid date!")
        }
        if(selectedOption && _.isEmpty(selectedOption)) {
            console.log("invalid selected doctor!")
        }

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        //  = moment(currentDate).unix()
        let formatedDate = new Date(currentDate).getTime()
        
        if(rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true) 
            console.log("check rangetime", rangeTime);
            if(selectedTime && selectedTime.length > 0) {
                selectedTime.map(schedule => {
                    let object = {}
                    object.doctorId = selectedOption.value
                    object.date = formatedDate
                    object.timeType = schedule.keyMap
                    result.push(object)
                })
                
            }
            else {
                toast.error("Tạo lịch khám thành công!")
                return
            }
        }

        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedOption.value,
            formatedDate:formatedDate
        })

        

        toast.success("Tạo lịch khám thành công!")
    }

    render() {
        console.log("check stapropste: ", this.state);
        let { rangeTime } = this.state
        let { language } = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        console.log("check rangtiem", rangeTime);
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <label><FormattedMessage id="manage-schedule.choose-doctor"/></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}

                            />
                        </div>

                        <div className='col-6'>
                            <label><FormattedMessage id="manage-schedule.choose-date"/></label>
                            <DatePicker
                                onChange={this.hanldeOnchangeDatePicker}
                                className="form-control"

                                value={this.state.currentDate}
                                minDate={yesterday}
                                
                            />
                        </div>

                        <div className='col-12 pick-hour-container'>
                            {
                                rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                    return (
                                        <button 
                                        className={item.isSelected === true ? 'btn btn-schedule active'  : 'btn btn-schedule'} 
                                        key="index" 

                                        onClick={() => {this.handleClickBtnTime(item)}}>
                                            {language === LANGUAGE.VI ? item.valueVi : item.valueEn}

                                        </button>
                                    )
                                })
                            }
                        </div>

                        <div className='col-12'>
                            <button 
                            className='btn btn-primary btn-save-schedule'
                            onClick={() => this.handleSaveSchedule()}
                            
                            ><FormattedMessage id="manage-schedule.save"/></button>
                        </div>


                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        listDoctor: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: (id) => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
