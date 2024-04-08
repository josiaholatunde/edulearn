import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'

const APPLICATION_ROLES = {
    STUDENT_USER: 'STUDENT_USER',
    ADMIN: 'ADMIN'
}
const Dashboard = () => {

    const [user, setUser] = useState({})

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user)
    }, [])


    return <div className=''>
        { user?.roleType === APPLICATION_ROLES.STUDENT_USER ?  <UserDashboard /> : <AdminDashboard />}
       
    </div>

}


export default Dashboard