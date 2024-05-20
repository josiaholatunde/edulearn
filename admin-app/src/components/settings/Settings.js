import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getApplicationSettings, saveApplicationSettings } from '../../redux/actions/applicationSettingActions';
import { showNotification } from '../../utils/showNotification';

const Settings = ({ loading, applicationSettings }) => {
    const [defaultChallengeDuration, setDefaultChallengeDuration ] = useState(5);
    const [challengeRules, setChallengeRules ] = useState('')
    const [errors, setErrors] = useState({})
    
    const dispatch = useDispatch()

    const setErrorIfEmpty = (name, value) => {
        if (!value.trim()) {
            setErrors({ ...errors, [name]: `The ${name} field is required` })
        }
    }

    const saveSettings = (e) => {
        e?.preventDefault()
        if (!defaultChallengeDuration || !challengeRules) {
            return showNotification('danger', 'One or more fields required')
        }
        const setting = {
            defaultChallengeDuration,
            challengeRules
        }
        if (applicationSettings?.id) {
            setting.id = applicationSettings?.id
        }
        dispatch(saveApplicationSettings(setting))
    }


    useEffect(() => {
        if (applicationSettings == null) {
            dispatch(getApplicationSettings())
        } else {
            setChallengeRules(applicationSettings?.challengeRules)
            setDefaultChallengeDuration(applicationSettings?.defaultChallengeDuration)
        }
    }, [applicationSettings?.id])


    return <div className='h-100 w-100 p-4' style={{ height: '100px', width: '100px'}}>
        <h1 className='f-32 mb-0 d-flex align-items-center'>Settings</h1>

        <div className='row my-5'>
            <div className='col-lg-6'>
            <form>
            <div className="form-group mb45 d-flex flex-column align-items-start">
                        <label htmlFor="title" style={{ fontWeight: '400', fontStyle: 'normal', fontSize: '16px', lineHeight: 'normal' }}>Default Challenge Duration<span className="text-danger">*</span></label>
                        <input
                            type='number' className='form-control' id="title" name="title"
                            placeholder="Enter challenge duration" value={defaultChallengeDuration} onChange={({ target }) => {
                                setErrorIfEmpty(target.name, target.value)
                                setDefaultChallengeDuration(target.value)
                            }} />

                        <span className="text-danger"> {errors[defaultChallengeDuration] && errors[defaultChallengeDuration]}</span>
            </div>

            <div className="form-group mb45 d-flex flex-column align-items-start">
                <label htmlFor="title">Challenge Rules<span className="text-danger">*</span></label>
                <textarea
                    rows={7}
                    type='text' className='form-control' id="challengeRules" name="challengeRules"
                    placeholder="Enter challenge rules" value={challengeRules} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setChallengeRules(target.value)
                    }}  ></textarea>

                <span className="text-danger"> {errors[challengeRules] && errors[challengeRules]}</span>
            </div>

            <div className='row mt45'>
                    <div className='col-lg-12'>
                        <button
                            className="btn btn-lg btn-block btn-cool"
                            style={{ fontSize: '16px' }}
                            onClick={saveSettings}
                        >

                            {
                                loading ? (<span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>)
                                    : <i className="bi bi-box-arrow-in-right mr12" id="login-btn-icon"></i>
                            }
                            Save
                        </button>
                    </div>
                </div>
        </form>
            </div>
        </div>

    </div>
}

const mapStateToProps = ({ applicationSettings: { applicationSettings }, loading }) => {
    return ({
        applicationSettings,
        loading
    })
}
export default connect(mapStateToProps, { saveApplicationSettings, getApplicationSettings })(Settings)