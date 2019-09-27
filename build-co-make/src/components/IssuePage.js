import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { grabOneIssue } from "../actions/index.js";
import axios from "axios";
import IssueCard from "../components/IssueCard.js";

const IssuePage = props => {
        //console.log(props);
        // const [issue, setIssue] = useState();
        // console.log("selected issue", props.match.params.id);
        useEffect(() => {
            const id = props.match.params.id;
            props.grabOneIssue(id);
        }, [props.match.params.id]);
        // console.log("PROPS", props);
        // console.log(props.issue);

        if (!props.issue) {
            return ( <p> ...Loading Issue </p>)}

                return <IssueCard issue = { props.issue }
                showButtons = { localStorage.getItem('userId') == props.issue.user_id }
                />;
            };

            const mapStateToProps = (state) => {
                const issue = state.issues;
                return {
                    issue
                };
            };

            export default connect(
                mapStateToProps, { grabOneIssue }
            )(IssuePage);