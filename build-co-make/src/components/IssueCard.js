import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// IMPORT STYLED COMPONENTS AND CSS MIXINS
import styled from "styled-components";
import SubmitIssueForm from "../components/submitIssueForm.js";

//import redux/fn
import { deleteIssues } from '../actions/index';
import { connect } from 'react-redux';

const StyledCard = styled.div `
  width: 60vw;
  margin: 0 auto;
  .card {
    background: #eeeeee;
    border: 1px solid gray;
    padding: 0.5rem;
    margin: 0.5rem;
    display: flex;
    flex-direction: row;
    .issueImage {
      width: 50%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: auto;
      }
    }
    .text {
      padding: 0.5rem;
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      h2 {
        width: 50%;
      }
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

function IssueCard(props) {

    console.log(props);
    const [issue, setIssue] = useState();
    const [form, setForm] = useState( < div > < /div>);function handleDelete() {
                props.deleteIssues(props.issue.id);
                // props.flagChange();

            }

            useEffect(() => {
                setIssue(props.issue);
            }, [props.issue]);

            let issueButtons = < div > < /div>;

            useEffect(() => {
                console.log("Re-rendering");
            }, [form]);

            function showForm() {
                console.log("On click");
                setForm( < SubmitIssueForm issue = { issue }
                    flagChange = { props.flagChange }
                    />);
                }

                if (props.showButtons) {
                    issueButtons = ( <
                        div >
                        <
                        Link to = "/userHome" > < button onClick = { handleDelete } > Delete < /button></Link >
                        <
                        button onClick = { showForm } > Edit < /button> <
                        Link to = "/userHome" > < button > Home < /button></Link >
                        <
                        /div>
                    );
                }


                if (!issue) return <p > Loading... < /p>;

                return ( <
                    StyledCard >
                    <
                    div className = "card" >
                    <
                    div className = "issueImage" >
                    <
                    img src = { issue.imageURL }
                    className = "pic" / >
                    <
                    /div> <
                    div className = "text" >
                    <
                    Link to = { `/issues/${issue.id}` } >
                    <
                    h2 > { issue.title } - { issue.category } <
                    /h2> <
                    p > { issue.details } < /p> <
                    /Link>

                    <
                    p > By user { issue.user_id }(TODO: get username by id) < /p> <
                    p > Upvotes: { issue.upvotes } < /p> { issueButtons } { form } <
                    /div> <
                    /div> <
                    /StyledCard>
                );
            }
            const mapStateToProps = (state) => {
                return {
                    state
                }

            }

            export default connect(mapStateToProps, { deleteIssues })(IssueCard);