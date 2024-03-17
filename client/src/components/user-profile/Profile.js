import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import convertToPercentage from "../../utils/levelCalculation";
import EditBioForm from "./EditBioForm";
import EditCertificationForm from "./CertificationForm";
import EditProfile from "./EditProfile";
import StreakCalendar from "./StreakCalendar";
import { getUserDetails } from "../../redux/actions/userActions";

const DEFAULT_AVATAR_URL =
  "https://tylermcginnis.com/would-you-rather/sarah.jpg";

const CERTIFICATION_FORM_MODE = {
  EDIT: 'EDIT',
  CREATE: 'CREATE'
}

  const Profile = ({ user }) => {
    
    // const [user, setUser] = useState({});
    const [showEditProfileModal, setShowEditProfileModal] = useState(false)
    const [showEditBioModal, setShowEditBioModal] = useState(false)
    const [certificationFormMode, setCertificationFormMode ] = useState(CERTIFICATION_FORM_MODE.CREATE)
    const [showEditCertificationModal, setShowEditCertificationModal] = useState(false)
    const [ currentCertification, setCurrentCertification ] = useState(null)
  
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getUserDetails(user?.email))
  }, []);

  const displayFullName = (user) => {
    return `${user?.firstName} ${user?.lastName}`
  }

  const levelPercentage = convertToPercentage(user?.level || 10)


  const handleEditCertification = (certification) => {
    setCurrentCertification(certification)
    setCertificationFormMode(CERTIFICATION_FORM_MODE.EDIT);
    setShowEditCertificationModal(true)
  }

  const handleDeleteCertification = (certification) => {
    
  }

  return (
    <Fragment>
      <div className="row profile-section-card card mt-5">
        <div className="col-lg-10 profile-card text-center">
          <div
            className="profile-container  h-100 d-flex align-items-center"
            style={{ borderRight: "1px solid black;" }}
          >
            <div className="profile-img-container">
              <img
                src={DEFAULT_AVATAR_URL}
                alt="avatar"
                className="img-fluid rounded-circle"
              />
            </div>
            <div className="text-container ml-4">
              <div className="d-flex align-items-center mb-3 ">
                <h5>Name: </h5>
                <span className="ml-2">{ displayFullName(user) } </span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <h5>Occupation: </h5>
                <span className="ml-2">Student</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <h5>Location: </h5>
                <span className="ml-2"> { user?.location || 'N/A' } </span>
              </div>
              <div className="d-flex align-items-center">
                <h5>University: </h5>
                <span className="ml-2"> { user?.university || 'N/A' } </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2"><button className="btn btn-md btn-cool mt-5 f-16" onClick={() => setShowEditProfileModal(true) }>
            <i className="mdi mdi-pencil mr-1"></i>Edit Profile</button> 
        </div>
      </div>
      <div className="bio-section mt-5">
        <div className="row">
            <div className="col-lg-3 card p-3 text-left">
                <div className="bio-header mb-3">
                    <div className="d-flex justify-content-between">
                        <h4 className="bio-header-text">Bio</h4>
                        <i className="mdi mdi-pencil pointer" onClick={() => setShowEditBioModal(true) }></i>
                    </div>
                    <p> { user?.biography || 'You need to add a biography' } </p>
                </div>
                <div className="badges-section mb-3">
                    <h4 className="bio-header-text">Badges</h4>
                    <div className="badge-container">
                        <span className="mdi mdi-police-badge-outline"></span>
                        <span className="mdi mdi-police-badge-outline"></span>
                        <span className="mdi mdi-police-badge-outline"></span>
                        <span className="mdi mdi-police-badge-outline"></span>
                        <span className="additional-text">+ 15 more</span>
                    </div>
                </div>

                <div className="skills-section mb-3">
                    <h4 className="bio-header-text">Skills</h4>
                    <div className="skill-container">
                        <p style={{ fontSize: '14px'}}> { user?.skills || 'Click on the edit button to add a skill' } </p>
                        
                    </div>
                </div>

                <div className="links-section mb-3">
                    <h4 className="bio-header-text">Links</h4>
                    <div className="link-container">
                        <div>
                            <a href="www.linkedin.com/ogunboyejolatunde" className="links-font-size">www.linkedin.com/ogunboyejolatunde</a>
                        </div>
                        <div>
                            <a href="www.linkedin.com/ogunboyejolatunde" className="links-font-size">www.github.com/josiaholatunde</a>
                        </div>
                        <div>
                            <a href="www.linkedin.com/ogunboyejolatunde" className="links-font-size">www.twitter.com/josiaholatunde1</a> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-5 text-left">
                <div className="current-level card p-3">
                    <h5>Current Level</h5>
                    <div className="progress my-2">
                        <div className="progress-bar text-cool bg-cool" role="progressbar" style={{"width": `${levelPercentage}%`}} aria-valuenow={levelPercentage} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span className=""> Level { user?.level || 10 }</span>
                </div>

                <div className="current-level card p-3 mt-5">
                    <h5>History</h5>
                    <div className="history my-2">
                        <div className="d-flex justify-content-between">
                            <h5>Implement various sorting algorithms</h5>
                            <span>Won</span>
                        </div>
                        <p>Implement the sorting algorithm to sort an array of integers in ascending order. Implement bubble sort algorithm to sort integers in ascending order</p>
                        <div className="d-flex justify-content-between">
                            <div>
                                <i className="mdi mdi-account-multiple"></i>
                                <i className="mdi mdi-account-multiple"></i>
                                <i className="mdi mdi-account-multiple"></i>
                                <span className="additional-text">+ 2100 more</span>
                            </div>
                            <div style={{ fontSize: '14px'}}>Position: 123</div>
                        </div>
                    </div>

                    <div className="history my-2">
                        <div className="d-flex justify-content-between">
                            <h5>Implement various sorting algorithms</h5>
                            <span>Won</span>
                        </div>
                        <p>Implement the sorting algorithm to sort an array of integers in ascending order. Implement bubble sort algorithm to sort integers in ascending order</p>
                        <div className="d-flex justify-content-between">
                            <div>
                                <i className="mdi mdi-account-multiple"></i>
                                <i className="mdi mdi-account-multiple"></i>
                                <i className="mdi mdi-account-multiple"></i>
                                <span className="additional-text">+ 2100 more</span>
                            </div>
                            <div style={{ fontSize: '14px'}}>Position: 123</div>
                        </div>
                    </div>

                    <div className="history my-2">
                        <div className="d-flex justify-content-between">
                            <h5>Implement various sorting algorithms</h5>
                            <span>Won</span>
                        </div>
                        <p>Implement the sorting algorithm to sort an array of integers in ascending order. Implement bubble sort algorithm to sort integers in ascending order</p>
                        <div className="d-flex justify-content-between">
                            <div>
                                <i className="mdi mdi-account-multiple"></i>
                                <i className="mdi mdi-account-multiple"></i>
                                <i className="mdi mdi-account-multiple"></i>
                                <span className="additional-text">+ 2100 more</span>
                            </div>
                            <div style={{ fontSize: '14px'}}>Position: 123</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="current-level card p-3">
                    <h5>Streak</h5>
                    <StreakCalendar />
                </div>

                <div className="certifications card p-2 mt-5">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Certifications</h5>
                      <i className="mdi mdi-plus mdi-24px pointer" onClick={() => {
                        setCertificationFormMode(CERTIFICATION_FORM_MODE.CREATE)
                        setShowEditCertificationModal(true) 
                      }}></i>
                    </div>
                    <ul className="text-left mt-3">
                        { user?.certifications && user?.certifications.length == 0 ? 
                          (<h6>User has not added any certification</h6>) :
                          (user?.certifications.map(certification => 
                            (<li className="mb-2 d-flex justify-content-between align-items-center">
                                <span className="certification-name">{ certification?.name }</span>
                                <div className="cetification-icons d-flex">
                                    <i className="mdi mdi-pencil pointer" onClick={() => handleEditCertification(certification) }></i>
                                    <i className="mdi mdi-delete ml-2 pointer" onClick={() => handleDeleteCertification(certification) }></i>
                                </div>
                              </li>)))
                        }
                    </ul>
                </div>
            </div>
        </div>
        <EditProfile showModal={showEditProfileModal} handleClose = {() => setShowEditProfileModal(false)} />
        <EditBioForm showModal={showEditBioModal} handleClose = {() => setShowEditBioModal(false)} />
        <EditCertificationForm currentCertification={currentCertification} formMode={certificationFormMode} showModal={showEditCertificationModal} handleClose = {() => setShowEditCertificationModal(false)}  />
      </div>
    </Fragment>
  );
};


const mapStateToProps = ({ authedUser }) => {
  return ({
    user: authedUser?.user?.studentUser
  })
}
export default connect(mapStateToProps, { getUserDetails })(Profile);
