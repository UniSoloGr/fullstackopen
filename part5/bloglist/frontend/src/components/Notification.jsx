const Notification = ({notification}) => {
    if (!notification) return null

    console.log(notification)
    return (
        <div className={`notification ${notification.type}`}>
            {notification.message}
        </div>
    )
}

export default Notification