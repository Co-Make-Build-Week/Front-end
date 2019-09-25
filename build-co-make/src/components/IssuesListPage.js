import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getAllIssues} from '../actions/index.js';

import IssueCard from './IssueCard.js';

// IMPORT STYLED COMPONENTS AND CSS MIXINS
import styled from 'styled-components';

//first stop for state
//then goes to profile page and card view of individual {id} issue.

const IssuesListPage = (props) => {
console.log(props);


    useEffect(() => {
        props.getAllIssues();

    },[])

    if(!props.issues.length){
        return <div>Loading......</div>;
    };

    return (
        <div>
             <header>
                <h1>Welcome to the issues page</h1>
                {/* <Link to=></Link> */}
            </header>
            <hr />
            <h2>Issues in your Area</h2>
            {props.issues.map((item) => {
                console.log("creating issue card for issue", item);
                return <IssueCard issue={item} showButtons={false} />
                //if we wanted could do something like showButtons={item.user_id === currentlyLoggedInUser.id} to
                //show buttons on issues page only if the user currently logged in owns it but idk how to get currentlyLoggedInUser.id
            })} 
        </div>
    );
}
const mapStateToProps = (state) => {
    console.log('state is king', state);
    const {issues} = state
    return {
    issues       
    }
}

export default connect(mapStateToProps, {getAllIssues})(IssuesListPage);