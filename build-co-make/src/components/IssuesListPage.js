import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IssueCard from './IssueCard.js';

import 'styled-components';

//first stop for state
//then goes to profile page and card view of individual {id} issue.

const IssuesPage = (props) => {

    const [issues, setIssues] = useState([]);

    // useEffect(() => {
    //     setIssues(props.issues);
    // }, [props.issues])
    if (issues.length === 0) {
        console.log("Setting test data");
        setIssues([//example data
            {
                "id": 2,
                "upvotes": 7,
                "created_at": "2019-09-23 19:43:51",
                "updated_at": "2019-09-23 19:43:51",
                "title": "Test Issue",
                "issueLocation": "1410 N 2970 W",
                "details": "It's really annoying",
                "imageURL": "asdf.com/picture",
                "category": "pothole",
                "user_id": 2
            },
            {
                "id": 3,
                "upvotes": 7,
                "created_at": "2019-09-23 19:43:51",
                "updated_at": "2019-09-23 19:43:51",
                "title": "huge oil spill",
                "issueLocation": "1410 N 2970 W",
                "details": "It's splippery and causing crashes",
                "imageURL": "https://www.dfa.co.za/wp-content/uploads/2017/07/DF-oilslip-2407-a.jpg",
                "category": "road debris",
                "user_id": 3
            },
            {
                "id": 5,
                "upvotes": 7,
                "created_at": "2019-09-23 19:43:51",
                "updated_at": "2019-09-23 19:43:51",
                "title": "Test Issue",
                "issueLocation": "1410 N 2970 W",
                "details": "It's really annoying",
                "imageURL": "asdf.com/picture",
                "category": "pothole",
                "user_id": 4
            }
        ]);
    }

    return (
        <div>
            <header>
                <h1>Welcome to the issues page</h1>
                {/* <Link to=></Link> */}
            </header>
            <hr />
            <h2>Issues in your Area</h2>
            {console.log("creating issue cards for", issues)}
            {issues.map((item) => {
                console.log("creating issue card for issue", item);
                return <IssueCard issue={item} showButtons={false} />
                //if we wanted could do something like showButtons={item.user_id === currentlyLoggedInUser.id} to
                //show buttons on issues page only if the user currently logged in owns it but idk how to get currentlyLoggedInUser.id
            })}
        </div>
    );
}
export default IssuesPage;