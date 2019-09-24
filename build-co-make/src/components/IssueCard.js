import React, { useState, useEffect } from 'react';

// Example issue right now: {
//     "id": 2,
//     "upvotes": 7,
//     "created_at": "2019-09-23 19:43:51",
//     "updated_at": "2019-09-23 19:43:51",
//     "title": "Test Issue",
//     "issueLocation": "1410 N 2970 W",
//     "details": "It's really annoying",
//     "imageURL": "asdf.com/picture",
//     "category": "pothole",
//     "user_id": 2
//    }

function IssueCard(props) {

    const [issue, setIssue] = useState();

    useEffect(() => {
        setIssue(props.issue);
    }, [props.issue])


    let issueButtons = <div></div>;

    if(props.showButtons){
        issueButtons = (
        <div>
            <button>Delete</button>
            <button>Edit</button>
        </div>
        )
    }

    if(!issue) return <p>Loading...</p>

    return (
        <div>
            <img src={issue.imageURL} />
            <h2>{issue.title} - {issue.category}</h2>
            <p>{issue.details}</p>
            <p>By user {issue.user_id} (TODO: get username by id)</p>
            <p>Upvotes: {issue.upvotes}</p>
            {issueButtons}
        </div>
    );
}

export default IssueCard;
