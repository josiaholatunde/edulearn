import React, { Fragment, useEffect, useState } from "react";
import EditBioForm from "./EditBioForm";
import EditProfile from "./EditProfile";
import StreakCalendar from "./StreakCalendar";

const DEFAULT_AVATAR_URL =
  "https://tylermcginnis.com/would-you-rather/sarah.jpg";
const Profile = () => {
  const [user, setUser] = useState({});
    const [showEditProfileModal, setShowEditProfileModal] = useState(false)
    const [showEditBioModal, setShowEditBioModal] = useState(false)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

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
                <span className="ml-2">Olatunde Ogunboyejo</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <h5>Occupation: </h5>
                <span className="ml-2">Student</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <h5>Location: </h5>
                <span className="ml-2">United Kingdom</span>
              </div>
              <div className="d-flex align-items-center">
                <h5>University: </h5>
                <span className="ml-2">University of Leicester</span>
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
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,</p>
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
                        <span>HTML,CSS,Java,Javascript</span>
                        
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
                        <div className="progress-bar" role="progressbar" style={{"width": '75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span className="">Level 10</span>
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
                    <h5>Certifications</h5>
                    <ul className="text-left">
                        <li className="mb-2">Andela with Google Web Development</li>
                        <li className="mb-2">AWS Solutions Architect</li>
                        <li className="mb-2">Google Cloud Solutions Architect</li>
                        <li className="mb-2">Google Cloud Practitioner Architect</li>
                    </ul>
                </div>
            </div>
        </div>
        <EditProfile showModal={showEditProfileModal} handleClose = {() => setShowEditProfileModal(false)} />
        <EditBioForm showModal={showEditBioModal} handleClose = {() => setShowEditBioModal(false)} />
      </div>
    </Fragment>
  );
};

export default Profile;
