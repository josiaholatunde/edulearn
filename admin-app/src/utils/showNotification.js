import { NotificationManager } from 'react-notifications'


export const showNotification =  ( type, message, title=null, defaultTimeOut=5000 ) => {

    switch (type) {
        case 'info':
            return NotificationManager.info(message)
        case 'success':
            return NotificationManager.success(message, title)
        case 'warning':
            return NotificationManager.warning(message, title, defaultTimeOut)
        case 'danger':
            return NotificationManager.error(message, title, defaultTimeOut)
        default:
            return NotificationManager.info(message)

    }
}