import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import convertToPercentage from "../../utils/levelCalculation";
import EditBioForm from "./EditBioForm";
import EditCertificationForm from "./CertificationForm";
import EditProfile from "./EditProfile";
import StreakCalendar from "./StreakCalendar";
import { getUserDetails } from "../../redux/actions/userActions";
import DeleteCertificationModal from "./DeleteCertificationModal";
import EditSocialProfileLinks from "./EditSocialProfileLinks";
import UpdateProfileImage from "./UpdateProfileImage";

const DEFAULT_AVATAR_URL =
  "https://tylermcginnis.com/would-you-rather/sarah.jpg";

const CERTIFICATION_FORM_MODE = {
  EDIT: 'EDIT',
  CREATE: 'CREATE'
}

  const Profile = ({ user }) => {
    
    const [showEditProfileModal, setShowEditProfileModal] = useState(false)
    const [showEditSocialProfileLinkModal, setShowEditSocialProfileLinkModal] = useState(false)
    const [showEditBioModal, setShowEditBioModal] = useState(false)
    const [showDeleteCertificationModal, setShowDeleteCertificationModal ] = useState(false)
    const [certificationFormMode, setCertificationFormMode ] = useState(CERTIFICATION_FORM_MODE.CREATE)
    const [showEditCertificationModal, setShowEditCertificationModal] = useState(false)
    const [showChangeProfileImageModal, setShowChangeProfileImageModal] = useState(false)
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
    setCurrentCertification(certification)
    setShowDeleteCertificationModal(true)
  }


  return (
    <Fragment>
      <div className="row profile-section-card card mt-5" style={{  boxShadow: '0px 6px 30px 5px rgba(0, 0, 0, 0.12)'}}>
        <div className="col-lg-10 profile-card text-center">
          <div
            className="profile-container  h-100 d-flex align-items-center">
            <div className="profile-img-container d-flex flex-column" style={{ position: 'relative'}}>
              <div className="profile-img-container ml-3">
                <img
                  src={user?.imageUrl || DEFAULT_AVATAR_URL}
                  alt="avatar"
                  className="img-fluid rounded-circle"
                />
              </div>
              <div className="edit-item-container pointer" style={{ position: 'absolute', bottom: '4%', right: '0%', background: 'rgba(253, 126, 20, 0.10)', borderRadius: '8px'}} onClick={() => setShowChangeProfileImageModal(true)}>
                <img src="./edit-img.png" />
              </div>
            </div>
            <div className="text-container ml-5">
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
        <div className="col-lg-2 d-flex justify-content-end align-items-start"><button className="btn btn-md custom-btn-primary mt-5 f-16" onClick={() => setShowEditProfileModal(true) }>
            <i className="mdi mdi-pencil mr-1"></i>Edit Profile</button> 
        </div>
      </div>
      <div className="bio-section mt-5">
        <div className="row">
            <div className="col-lg-3 card p-3 text-left">
                <div className="bio-header mb-3">
                    <div className="d-flex justify-content-between">
                        <h4 className="bio-header-text">Bio</h4>
                        <div className="pointer" onClick={() => setShowEditBioModal(true) }>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                           <path d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17" stroke="#FD7E14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 5.00011L19 8.00011M20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12L20.385 6.58511Z" stroke="#FD7E14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </div>
                    </div>
                    <p> { user?.biography || 'You need to add a biography' } </p>
                </div>
                <div className="badges-section mb-3">
                    <h4 className="bio-header-text">Badges</h4>
                    <div className="badge-container">
                    { [1, 2, 3, 4].map((_, index) => (
                      <svg key={index} className='mx-1' xmlns="http://www.w3.org/2000/svg" width="60" height="74" viewBox="0 0 60 74" fill="none">
                        <path d="M30 0.336914L0 13.6702V33.6702C0 52.1702 12.8 69.4702 30 73.6702C47.2 69.4702 60 52.1702 60 33.6702V13.6702L30 0.336914ZM40.2667 50.3369L30 44.1702L19.7667 50.3369L22.4667 38.6702L13.4333 30.8702L25.3667 29.8369L30 18.8369L34.6333 29.8036L46.5667 30.8369L37.5333 38.6702L40.2667 50.3369Z" fill="#E0A024"/>
                      </svg>
                    )) }
                        <span className="additional-text">+ 15 more</span>
                    </div>
                </div>

                <div className="skills-section mb-3">
                    <h4 className="bio-header-text">Skills</h4>
                    <div className="skill-container">
                        <p style={{ fontSize: '14px'}}> { user?.skills || 'Click on the edit button to add a skill' } </p>
                        
                    </div>
                </div>

                <div className="profile links-section mb-3">
                    <div className="d-flex justify-content-between">
                      <h4 className="bio-header-text">Links</h4>
                      <div className="pointer" style={{ fontSize: '14px', color: '#007bff', textDecoration: 'underline'}} onClick={() => setShowEditSocialProfileLinkModal(true) }>Add new Link</div>
                    </div>
                    <div className="link-container">

                      {
                        user && user.socialProfile && user.socialProfile.githubUrl && (<div className="d-flex align-items-center mb-2">
                          <i class="bi bi-github mr-2"></i>
                          <a href={user.socialProfile.githubUrl} className="links-font-size">{user.socialProfile.githubUrl}</a>
                        </div>)
                      }
                      {
                        user && user.socialProfile && user.socialProfile.linkedInUrl && (<div className="d-flex align-items-center mb-2">
                          <i class="bi bi-linkedin mr-2"></i>
                          <a href={user.socialProfile.linkedInUrl} className="links-font-size">{user.socialProfile.linkedInUrl}</a>
                        </div>)
                      }

                      {
                        user && user.socialProfile && user.socialProfile.twitterUrl && (<div className="d-flex align-items-center mb-2">
                          <i class="bi bi-twitter mr-2"></i>
                          <a href={user.socialProfile.twitterUrl} className="links-font-size">{user.socialProfile.twitterUrl}</a>
                        </div>)
                      }

                      {
                        user && user.socialProfile && user.socialProfile.discordUrl && (<div className="d-flex align-items-center mb-2">
                          <i class="bi bi-discord mr-2"></i>
                          <a href={user.socialProfile.discordUrl} className="links-font-size">{user.socialProfile.discordUrl}</a>
                        </div>)
                      }

                      {
                        user && !user.socialProfile  && (<div style={{ fontSize: '14px'}}>No social profile links to show</div>)
                      }
                        
                    </div>
                </div>
            </div>
            <div className="col-lg-6 text-left">
                <div className="current-level card p-3">
                    <h5>Current Level</h5>
                    <div className="progress my-2">
                        <div className="progress-bar" role="progressbar" style={{"width": `${levelPercentage}%`, background: '#007bff'}} aria-valuenow={levelPercentage} aria-valuemin="0" aria-valuemax="100"></div>
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
            <div className="col-lg-3 px-0">
                <div className="current-level card p-3">
                    <h5>Streak</h5>
                    <StreakCalendar />
                </div>

                <div className="certifications card p-2 mt-5">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 ml-0 pl-3">Certifications</h5>
                      <i className="mdi mdi-plus mdi-24px pointer secondary-text" onClick={() => {
                        setCertificationFormMode(CERTIFICATION_FORM_MODE.CREATE)
                        setShowEditCertificationModal(true) 
                      }}></i>
                    </div>
                    <ul className="text-left mt-3 ml-0 pl-3">
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
        <UpdateProfileImage user={user} showModal={showChangeProfileImageModal} handleClose = {() => setShowChangeProfileImageModal(false)} />
        <EditSocialProfileLinks showModal={showEditSocialProfileLinkModal} handleClose = {() => setShowEditSocialProfileLinkModal(false)} />
        <DeleteCertificationModal currentCertification={currentCertification} showModal={showDeleteCertificationModal} handleClose = {() => setShowDeleteCertificationModal(false)}  />
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
