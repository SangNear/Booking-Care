import React, { Component } from 'react';

import { connect } from 'react-redux';

import Slider from "react-slick";
import * as actions from "../../../store/actions"
import {withRouter} from 'react-router'
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctor: this.props.topDoctorsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors()
    }

    handleDetailDoctor = (doctor) => {
        console.log("check detail doctor", doctor);
        this.props.history.push(`/detail-doctor/${doctor.id }`)
    }

    render() {
        console.log("check topDoctorRedux", this.props.topDoctorsRedux);
        let arrDoctor = this.state.arrDoctor
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật</span>
                        <button className='btn-section'>xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.setting}>

                            {arrDoctor && arrDoctor.length > 0 && arrDoctor.map((doctor, index) => {
                                console.log("check list doc",doctor);
                                let imageBase64 = ''
                                if(doctor.image) {
                                    imageBase64 = new Buffer(doctor.image, 'base64').toString('binary')
                                }
                                return(
                                    <div className='section-customize' onClick={() => this.handleDetailDoctor(doctor)}>
                                    <div className='outer-bg'>
                                        <img className='doc-img' src={imageBase64} />
                                        <div className='positon text-center'>{doctor.firstName} {doctor.lastName}</div>
                                        <div className='positon text-center'>Da liễu</div>
                                    </div>
                                </div>
                                )
                                
                            })}
                        </Slider>
                    </div>

                </div>
            </div>


        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
