import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import { axiosWithAuth } from "../axiosWithAuth/axiosWithAuth.js";
import IssueCard from "../components/IssueCard.js";
import SubmitIssueForm from "./submitIssueForm";

// IMPORT STYLED COMPONENTS AND MIXINS
import styled from "styled-components";
import { wrappedMixin } from "./mixins";

//redux imports
import { connect } from 'react-redux';
import { getUserIssues } from '../actions/index.js';

const StyledDiv = styled.div `
  ${wrappedMixin};
`;


// const example =
//     //example data
//     [{
//             id: 2,
//             upvotes: 7,
//             created_at: "2019-09-23 19:43:51",
//             updated_at: "2019-09-23 19:43:51",
//             title: "Test Issue",
//             issueLocation: "1410 N 2970 W",
//             details: "It's really annoying",
//             imageURL: "asdf.com/picture",
//             category: "pothole",
//             user_id: 2
//         },
//         {
//             id: 3,
//             upvotes: 7,
//             created_at: "2019-09-23 19:43:51",
//             updated_at: "2019-09-23 19:43:51",
//             title: "huge oil spill",
//             issueLocation: "1410 N 2970 W",
//             details: "It's splippery and causing crashes",
//             imageURL: "https://www.dfa.co.za/wp-content/uploads/2017/07/DF-oilslip-2407-a.jpg",
//             category: "road debris",
//             user_id: 3
//         },
//         {
//             id: 5,
//             upvotes: 7,
//             created_at: "2019-09-23 19:43:51",
//             updated_at: "2019-09-23 19:43:51",
//             title: "Test Issue",
//             issueLocation: "1410 N 2970 W",
//             details: "It's really annoying",
//             imageURL: "asdf.com/picture",
//             category: "pothole",
//             user_id: 4
//         }
//     ];
const UserHome = (props, { values, errors, touched, status }) => {
const welcomeMesage = localStorage.getItem("message");
const id = localStorage.getItem('userId');

console.log(props);

    const [user, setUser] = useState(); //The user we get back from /api/users/:id
    const [issues, setIssues] = useState([]); //a list of all the user's issues
  // const [userIssues, setUserIssues] = useState()
    useEffect(() => {
         props.getUserIssues(id)


    }, []);

    // useEffect(() => {
    //     const id = localStorage.getItem('userId');
    //   axiosWithAuth()
    //   .get(`/auth/users/${id}/issues`, id)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {})
    // },[])


  //           if(!props.userIssues.length){
  //     return <div>No Current Submitted Issues At This Time......Make One</div>;
  // };
  // {}

    return ( 
    <StyledDiv>
        <header>
        <h1> 
          {!props.userIssues.length ? "No Current Submitted Issues At This Time......Make One" : welcomeMesage}
       </h1> 
       <h3>Current Issues: {props.userIssues.length}</h3>
        <Link to = "/issuesListPage" > All Local Issues </Link> 
        </header>

        { /*NEW ISSUE FORM*/ } <
        SubmitIssueForm / >

        { /*USER'S ISSUE LIST*/ } {
            props.userIssues.map(item => {
                return <IssueCard issue = { item }
                showButtons = { true }
                />;
            })
        } 
        </StyledDiv>
    );
};
// export default UserHome;

// const FormikUserHome = withFormik({
//   mapPropsToValues({ title, category, details }) {
//     return {
//       title: title || "",
//       category: category || "other",
//       details: details || ""
//     };
//   },
//   validationSchema: yup.object().shape({
//     title: yup
//       .string()
//       .min("5", "Title must be five characters or more")
//       .required("You must provide a title."),
//     details: yup
//       .string()
//       .min("3", "Details must be three characters or more")
//       .required("You must provide details.")
//   }),

//   handleSubmit(values, { props }) {
//     //TODO change to submit new issue
//     console.log("values: ", values, props);
//     // axios
//     //   .post(`https://comake.herokuapp.com/api/issues`, values)
//     //   .then(res => {
//     //     console.log("POST res", res.data);
//     //     props.history.push("/userHome");
//     //     console.log(JSON.stringify(values));
//     //   })
//     //   .catch(err => alert(err.response.data.message));
//   }
// })(UserHome);

const mapStateToProps = (state) => {
    console.log('make me sick', state);
    const {userIssues}= state;
    return {
        userIssues
    }
}

export default connect(mapStateToProps, { getUserIssues })(UserHome);