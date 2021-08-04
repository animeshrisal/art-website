import React from 'react'
import { useSocket } from '../../shared/context';


const Dashboard = () => {
    const { notification, closeNotification } = useSocket()

    return <div>{notification.toString()}</div>
}

export default Dashboard;