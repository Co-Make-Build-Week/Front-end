import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import { axiosWithAuth } from "../axiosWithAuth/axiosWithAuth.js";
import IssueCard from "../components/IssueCard.js";
import SubmitIssueForm from "./SubmitIssueForm";

// IMPORT STYLED COMPONENTS AND MIXINS
import styled from "styled-components";
import { wrappedMixin } from "./mixins";

//redux imports
import { connect } from 'react-redux';
import { getUserIssues } from '../actions/index.js';

const StyledDiv = styled.div `
  ${wrappedMixin};
`;


const UserHome = (props, { values, errors, touched, status }) => {
const welcomeMesage = localStorage.getItem("message");
const id = localStorage.getItem('userId');

console.log("Re-rendering component, user id got from localStorage:", id);

    const [user, setUser] = useState(); //The user we get back from /api/users/:id
    const [issues, setIssues] = useState([]); //a list of all the user's issues
  useEffect(() => {
         props.getUserIssues(id);
    }, []);

    function callMe(){
        console.log("Called");
    }


    useEffect(()=> {
        console.log("props.userIssues useEffect");
        setIssues(props.userIssues);
    },[props.userIssues]);

    return ( 
    <StyledDiv>
        <header>
        <h1> 
          {!props.userIssues.length ? "No Current Submitted Issues At This Time......Make One" : welcomeMesage}
       </h1> 
       <h3>Current Issues: {props.userIssues.length}</h3>
        <Link to = "/issuesListPage" > All Local Issues </Link> 
        </header>

        { /*NEW ISSUE FORM*/ } 
        <SubmitIssueForm  flag={callMe}/>

        { /*USER'S ISSUE LIST*/ } {
            props.userIssues.map(item => {
                return <IssueCard  flag={callMe} issue={ item }
                showButtons = { true }
                />;
            })
        } 
        </StyledDiv>
    );
};

const mapStateToProps = (state) => {
    console.log('make me sick', state);
    const {userIssues}= state;
    return {
        userIssues
    }
}

export default connect(mapStateToProps, { getUserIssues })(UserHome);