import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

const UserDashboard = ({ loading }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.voter && user.voter.voterId) {
        
        }
    }, [dispatch]);

   

   

    return (
        <div className='text-left mt-5'>
            <h3>User Dashboard</h3>
            {/* {displayUI(electionStatus)} */}
        </div>
    );
};

const mapStateToProps = ({ loading }) => {
    return {
        loading
    };
};

export default connect(mapStateToProps, {  })(UserDashboard);
