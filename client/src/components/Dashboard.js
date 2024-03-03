import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'

const Dashboard = () => {

    const [user, setUser] = useState({})

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user)
    }, [])


    return <div className=''>
        { user?.roleType === 'VOTER' ?  <UserDashboard /> : <AdminDashboard />}
       
    </div>

}


export default Dashboard