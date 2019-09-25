import React from "react";
import { Formik, Form, Field, ErrorMessage, withFormik } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { formMixin } from "./mixins";
import axiosWithAuth from "../axiosWithAuth/axiosWithAuth.js";

//redux imports
import {connect} from 'react-redux';
import {addIssue} from '../actions/index.js';

const StyledDiv = styled.div`
  ${formMixin}
`;

function SubmitIssueForm(props, { values, errors, touched, status }) {
  return (
    <Form>
      <div className="input-field">
        <label>
          <span>Issue</span>
          <Field name="title" type="text" placeholder="issue" />
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
          <Field name="address" type="text" placeholder="address" />
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
          <Field
            type="text"
            name="details"
            placeholder="tell us more"
          />
        </label>
        <ErrorMessage
          name="textarea"
          component="div"
          className="errorMessage"
        />
      </div>
      <div className="button">
        <button type="submit">Submit Issue</button>
      </div>
    </Form>
  );
}
const FormikSubmitIssueForm = withFormik({
  mapPropsToValues({ props, title, category, details, address }) {
    return {
      title: title || "",
      category: category || "other",
      address: address || "",
      details: details || ""
    };
  },
  validationSchema: yup.object().shape({
    title: yup
      .string()
      .required("Required")
      .min(5, "This line seems to short. Can you elaborate a bit more?")
      .max(30, "This line is too long. 30 chars max."),
    category: yup.string().required("Required"),
    address: yup.string().required("Required"),
    details: yup
      .string()
      .required("Required")
      .min(30, "More information needed")
      .max(300, "300 characters max allowed")
  }),

  handleChange(){
    console.log("agsda");
  },

  handleSubmit(values, props) {
    //TODO change to submit new issue
    // props.flip();
    // console.log("values: ", values, props);

    console.log("HANDLE SUBMIT WORKING", props.props);

    let issueTemplate = {
      category: "other",
      title: "New Issue",
      issueLocation: "Somewhere",
      details: "An Issue",
      imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEtKy-Lln5mNyl_jRIaRtm7df8uN-qhNG4xIQby120IPWBjxND2A"
    }

    if(values.category) issueTemplate.category = values.category;
    if(values.title) issueTemplate.title = values.title;
    if(values.address) issueTemplate.issueLocation = values.address;
    if(values.details) issueTemplate.details = values.details;

    props.props.addIssue(issueTemplate);

    axiosWithAuth()
      .post(`https://comake.herokuapp.com/api/issues`, issueTemplate)
      .then(res => {
        console.log("POST res", res.data);
        props.history.push("/userHome");
        console.log(JSON.stringify(values));
      })
      .catch(err => alert(err.response.data.message));
  }
})(SubmitIssueForm);

export default FormikSubmitIssueForm;