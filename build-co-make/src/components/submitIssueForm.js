import React, {useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage, withFormik } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { formMixin } from "./mixins";
import {axiosWithAuth} from "../axiosWithAuth/axiosWithAuth.js";
import { Link } from "react-router-dom";

//redux imports
import {connect} from 'react-redux';
import {addIssue, updateIssue, getUserIssues} from '../actions/index.js';
import IssuesListPage from './IssuesListPage';

const StyledDiv = styled.div`
  ${formMixin}
`;

function SubmitIssueForm(props, { values, errors, touched, status, isSubmitting }) {
  //props will have a props.issue prop, if undefined we're creating new issue, if not undefined we're editing

  let existingIssue = {
    category: "",
    title: "",
    issueLocation: "",
    details: "",
    imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEtKy-Lln5mNyl_jRIaRtm7df8uN-qhNG4xIQby120IPWBjxND2A"
  }

  const [fieldValues, setFieldValues] = useState(existingIssue);

  let submitButtonName = "Submit Issue";
  if(props.issue) {
    existingIssue = props.issue;
    submitButtonName = "Update Issue";
  }

  useEffect(() => {
    console.log('from submitIssueform', status);
  }, [status])

  const getDefaultValue = (arg) => {
      return arg;
  }


  return (
    <Form>
      <div className="input-field">
        <label>
          <span>Issue</span>
          <Field onChange={(event) => {setFieldValues({ ...fieldValues, [event.target.name]: event.target.value })}} name="title" type="text" placeholder={existingIssue.title} value={getDefaultValue(fieldValues.title)}/>
        </label>
        <ErrorMessage
          name="title"
          component="div"
          className="errorMessage"
        />
      </div>
      <div>
        <label>
          <span>Category</span>
          <Field component="select" name="category">
            <option value="select" className="firstOptionSelect">Select option</option>
            <option value="roads">roads</option>
            <option value="sidewalks">sidewalks</option>
            <option value="landscape">landscape</option>
            <option value="debris">debris</option>
            <option value="other">other</option>
          </Field>
        </label>
        <ErrorMessage
          name="category"
          component="div"
          className="errorMessage"
        />
      </div>
      <div>
        <label>
          <span>Address</span>
          <Field name="address" type="text" placeholder={existingIssue.issueLocation} onChange={(event) => {setFieldValues({ ...fieldValues, issueLocation: event.target.value })}} value={fieldValues.issueLocation} />
        </label>
        <ErrorMessage
          name="address"
          component="div"
          className="errorMessage"
        />
      </div>
      <div>
        <label>
          <span>Tell us more:</span>
          <Field type="text" name="details" placeholder={existingIssue.details} onChange={(event) => {setFieldValues({ ...fieldValues, [event.target.name]: event.target.value })}} value={getDefaultValue(fieldValues.details)}/>
        </label>
        <ErrorMessage
          name="textarea"
          component="div"
          className="errorMessage"
        />
      </div>
      
        <div className="button">
          <button disabled = { isSubmitting } type="submit">{submitButtonName}</button>
        </div>
      
    </Form>
  );
}
const FormikSubmitIssueForm = withFormik({
  mapPropsToValues({ values, title, category, details, address,flagChange }) {
    console.log("ADDRESS, MAKE SURE THIS MATCHES WHAT YOU PUT IN FORM", address, title, category, details)
    return {
      title: title,
      category: category,
      address: address,
      details: details
    };
  },
  validationSchema: yup.object().shape({
   
  }),

  handleChange(values, { setStatus }){
    console.log("handleChange values", values);
    setStatus(values);
    //setIssue({ ...issue, [event.target.name]: event.target.value });
    
  },

  handleSubmit(values, props) {
    //console.log("PROPS ", props, handleChange, flagChange);
    props.props.flag();
    props.props.getUserIssues();

    //use setStatus() to send stuff to SubmitIssueForm 
          //setStatus(values);

    console.log("values: ", values);

    console.log("HANDLE SUBMIT WORKING", props.props);

    let issueTemplate = {
      category: "other",
      title: "New Issue",
      issueLocation: "Somewhere",
      details: "An Issue",
      imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEtKy-Lln5mNyl_jRIaRtm7df8uN-qhNG4xIQby120IPWBjxND2A"
    }

    issueTemplate.category = values.category;
    issueTemplate.title = values.title;
    issueTemplate.issueLocation = values.address;
    issueTemplate.details = values.details;

    console.log("sumbit issue", props.issue);
    if(props.issue){//edit
      console.log("updating issue");
      props.props.updateIssue(issueTemplate)
    }
    else{//add
    props.props.addIssue(issueTemplate)
    }

    console.log('from the freakin form', props);

  }
})(SubmitIssueForm);

const mapStateToProps = state => {
  const {issues} = state
  console.log("MSTP:", state)
  return {
    issues
  }
}

export default connect(mapStateToProps,{addIssue, updateIssue,  getUserIssues})(FormikSubmitIssueForm);