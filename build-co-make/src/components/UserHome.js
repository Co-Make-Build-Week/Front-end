import React from 'react';
import {Link} from 'react-router-dom';

//first stop for state

const UserHome =() => {
return(
    <div>
        <header>
            <h1>Welcome user-email-here!</h1>
            <Link to="/issuesListPage">Local Issues</Link>
        </header>
        <hr/>
        this is the user home page
    </div>
);
}
export default UserHome;