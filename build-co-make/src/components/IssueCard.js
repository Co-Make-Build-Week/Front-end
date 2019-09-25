import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function IssueCard(props) {
console.log(props);
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
        <>
            <Link to={`/issues/${issue.id}`}>
                <div className="card">
                    <h2>{issue.title} - {issue.category}</h2>
                    <p>{issue.details}</p>
                    <p>By user {issue.user_id} (TODO: get username by id)</p>
                    <p>Upvotes: {issue.upvotes}</p>
                    {issueButtons}
                    <img src={issue.imageURL} className="pic" />
                </div>
            </Link>
        </>
    );
};

export default IssueCard;
