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
import {connect} from 'react-redux';
import {getUserIssues} from '../actions/index.js';

const StyledDiv = styled.div`
  ${wrappedMixin};
`;


const example =
  //example data
  [
    {
      id: 2,
      upvotes: 7,
      created_at: "2019-09-23 19:43:51",
      updated_at: "2019-09-23 19:43:51",
      title: "Test Issue",
      issueLocation: "1410 N 2970 W",
      details: "It's really annoying",
      imageURL: "asdf.com/picture",
      category: "pothole",
      user_id: 2
    },
    {
      id: 3,
      upvotes: 7,
      created_at: "2019-09-23 19:43:51",
      updated_at: "2019-09-23 19:43:51",
      title: "huge oil spill",
      issueLocation: "1410 N 2970 W",
      details: "It's splippery and causing crashes",
      imageURL:
        "https://www.dfa.co.za/wp-content/uploads/2017/07/DF-oilslip-2407-a.jpg",
      category: "road debris",
      user_id: 3
    },
    {
      id: 5,
      upvotes: 7,
      created_at: "2019-09-23 19:43:51",
      updated_at: "2019-09-23 19:43:51",
      title: "Test Issue",
      issueLocation: "1410 N 2970 W",
      details: "It's really annoying",
      imageURL: "asdf.com/picture",
      category: "pothole",
      user_id: 4
    }
  ];
const UserHome = (props, { values, errors, touched, status }) => {

console.log(props);

  const [user, setUser] = useState(); //The user we get back from /api/users/:id

  // const [userID, setUserID] = useState(1); //user = the ID of the currently logged in user, passed in from props.userID

  const [issues, setIssues] = useState([]); //a list of all the user's issues


useEffect(() => {
  props.getUserIssues();

},[]);

  // useEffect(() => {
  //   //setUser(api/users/:id)
  //   //setUserID(1); //TODO change to props.userID when we get that set up so we can pass in user id in App.js when we route to UserHome
  //   console.log(`attempting to get api/users/${userID}`);
  //   axiosWithAuth()
  //     .get(`/users/${userID}/issues`)
  //     .then(res => {
  //       console.log(res);
  //       setIssues(res.data.issues);
  //     })
  //     .catch(err => console.log("API error getting user list " + err));
  // }, [props.userID]);

const userinfoId = localStorage.getItem('userId');

console.log(userinfoId);


  //   useEffect(() => {
  //     console.log("Attempting to get user issues with user ID: ", user);
  //     setIssues(example);
  //     // axiosWithAuth()
  //     //     .get(`/users/:${user}`)
  //     //     .then((res) => {
  //     //         console.log(res);
  //     //         setIssues(res.data);
  //     //     })
  //     //     .catch(err => alert("API error getting user list " + err.response.data))
  //   }, [userID, status]); //dependant on when the user changes and when the status changes (status we set after the user submits a new issue, it contains anything)
  
  return (
    <StyledDiv>
      <header>
        <h1>Welcome to your profile page.</h1>
        <Link to="/issuesListPage">All Local Issues</Link>
      </header>

      {/*NEW ISSUE FORM*/}
      <SubmitIssueForm />

      {/*USER'S ISSUE LIST*/}
      {issues.map(item => {
        return <IssueCard issue={item} showButtons={true} />;
      })}
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
  return {
    state
  }
}

// const mapDispatchToProps = (dispatch) => {
// // someAction: values => 
// //   dispatch({type:})
// }
export default connect(mapStateToProps, {getUserIssues})(UserHome);
