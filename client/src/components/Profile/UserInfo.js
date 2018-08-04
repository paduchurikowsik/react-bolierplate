import React from 'react';

// const formateDate = date = {
//     const newDate = new Date(date).toLocaleDateString('en-US');
//     const newTime = new Date(date).toLocaleTimeString('en-US');

//     return `${newDate} at ${newTime}`;

// }

const UserInfo = ({ session }) => (
    <div>
        <h3>User Info</h3>
        <p>Full Name: {session.getCurrentUser.fullname}</p>
        <p>Email: {session.getCurrentUser.email}</p>
        <h4>User Role:  {session.getCurrentUser.roles.map(role => {
            <li key={role._id}>{role.name}</li>
        })}</h4>
        {!session.getCurrentUser.roles.length && <p>No roles</p>}

    </div>
)

export default UserInfo;