import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, withFormik } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { formMixin } from "./mixins";
import { withRouter } from "react-router-dom";

//redux imports
import { connect } from "react-redux";
import {
    addIssue,
    updateIssue,
    getUserIssues,
    getAllIssues
} from "../actions/index.js";
import IssuesListPage from "./IssuesListPage";

const StyledDiv = styled.div `
  ${formMixin}
`;

function SubmitIssueForm(props, { values, errors, touched, isSubmitting }) {
    //props will have a props.issue prop, if undefined we're creating new issue, if not undefined we're editing
    console.log(props);
    let existingIssue = {
        //if we're not editing, these values will show up in field placeholders. If we're editing, these defaults will be overwritten and they will show up in field values
        category: "Select",
        title: "Enter a title...",
        issueLocation: "Enter a location...",
        details: "Enter some details...",
        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEtKy-Lln5mNyl_jRIaRtm7df8uN-qhNG4xIQby120IPWBjxND2A"
    };

    let submitButtonName = "Submit Issue";
    if (props.issue) {
        console.log(
            "props.issue isn't undefined, so that means we're editing",
            props.issue
        );
        existingIssue = props.issue;
        submitButtonName = "Update Issue";
        props.values.issueID = props.issue.id;
    }

    const [fieldValues, setFieldValues] = useState(existingIssue);

    useEffect(() => {
        if (!isDefault(fieldValues.title)) props.values.title = fieldValues.title;
        if (!isDefault(fieldValues.issueLocation)) props.values.issueLocation = fieldValues.issueLocation;
        if (!isDefault(fieldValues.details)) props.values.details = fieldValues.details;
    }, [fieldValues]);

    const updateFieldValues = event => {
        console.log("setting address value ", !isSubmitting);
        if (!isSubmitting)
            setFieldValues({
                ...fieldValues,
                [event.target.name]: event.target.value
            });
    };

    function isDefault(field) {
        //checks to see if field is a default value
        if (
            field === existingIssue.title ||
            field === existingIssue.details ||
            field === existingIssue.issueLocation ||
            field === existingIssue.category
        ) {
            return true;
        }
        return false;
    }

    function getDefaultValue(arg) {
        if (!props.issue && isDefault(arg)) {
            //creating and the user hasn't typed yet
            return undefined;
        } else {
            //editing
            return arg;
        }
    }

    return ( 
    <StyledDiv>
        <Form>
        <div className = "input-field" >
        <label>
        <span > Issue </span> 
        <Field onChange = { updateFieldValues }
        name = "title"
        type = "text"
        placeholder = { existingIssue.title }
        value = { getDefaultValue(fieldValues.title) }
        /> 
        </label> 
        <ErrorMessage name = "title"
        component = "div"
        className = "errorMessage" / >
        </div> 
        <div>
        <label>
        <span > Category </span> 
        <Field component = "select"
        name = "category">
        <option value = "select"
        className = "firstOptionSelect">
        Select Option 
        </option> 
        <option value = "roads" > roads </option> 
        <option value = "sidewalks" > sidewalks </option>
        <option value = "landscape" > landscape </option> 
        <option value = "debris" > debris </option> 
        <option value = "other" > other </option> 
        </Field> 
        </label> 
        <ErrorMessage name = "category"
        component = "div"
        className = "errorMessage" 
        />
        </div> 
        <div>
        <label>
        <span> Address </span> 
        <Field name = "issueLocation"
        type = "text"
        placeholder = { existingIssue.issueLocation }
        onChange = { updateFieldValues }
        value = { getDefaultValue(fieldValues.issueLocation) }
        /> 
        </label> 
        <ErrorMessage name = "issueLocation"
        component = "div"
        className = "errorMessage" /
        >
        </div> 
        <div>
        <label >
        <span> Tell us more: </span> 
        <Field name = "details"
        type = "text"
        onChange = { updateFieldValues }
        placeholder = { existingIssue.details }
        value = { getDefaultValue(fieldValues.details) }
        /> 
        </label> 
        <ErrorMessage name = "details"
        component = "div"
        className = "errorMessage" /
        >
        </div>

        <div className = "button" >
        <button disabled = { isSubmitting }
        type = "submit" > { submitButtonName } 
        </button> 
        </div> 
        </Form> 
        </StyledDiv>
    );
}
const FormikSubmitIssueForm = withFormik({
    mapPropsToValues({ title, category, details, issueLocation, issueID }) {
        //console.log("issueLocation, MAKE SURE THIS MATCHES WHAT YOU PUT IN FORM", issueLocation, title, category, details)
        return {
            title: title || "",
            category: category || "Select Option",
            issueLocation: issueLocation || "",
            details: details || "",
            issueID: issueID
                // initialValues: values
        };
    },
    validationSchema: yup.object().shape({
        title: yup
            .string()
            .min(3, "title too short")
            .max(20, "title too long")
            .required("title is required"),
        category: yup
            .string()
            .oneOf(["roads", "sidewalks", "landscape", "debris", "other"]),
        issueLocation: yup
            .string()
            .min(5, "location too short")
            .max(20, "location too long")
            .required("location is required"),
        details: yup
            .string()
            .min(12, "details too short")
            .max(300, "details too long")
            .required("details is required")
    }),

    handleSubmit(values, props) {
        props.props.getAllIssues();
        props.props.history.push("/issuesListPage");
        // window.location.reload()

        console.log("HANDLE SUBMIT WORKING", props.props);
        console.log("values: ", values);

        let issueTemplate = {
            category: "other",
            title: "New Issue",
            issueLocation: "Somewhere",
            details: "An Issue",
            imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEtKy-Lln5mNyl_jRIaRtm7df8uN-qhNG4xIQby120IPWBjxND2A"
        };

        issueTemplate.category = values.category;
        issueTemplate.title = values.title;
        issueTemplate.issueLocation = values.issueLocation;
        issueTemplate.details = values.details;

        console.log("submit issue", props);
        if (props.props.issue) {
            //edit
            // console.log("updating issue");
            props.props.updateIssue(issueTemplate, values.issueID);
        } else {
            //add
            // console.log("adding issue");
            props.props.addIssue(issueTemplate);
        }
    }
})(SubmitIssueForm);

const mapStateToProps = state => {
    const { issues } = state;
    //console.log("MSTP:", state)
    return {
        issues
    };
};

export default withRouter(
    connect(
        mapStateToProps, { addIssue, updateIssue, getUserIssues, getAllIssues }
    )(FormikSubmitIssueForm)
);