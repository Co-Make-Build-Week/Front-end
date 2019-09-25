import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import styled, { css } from "styled-components";
import formMixin from "./mixins";

const StyledDiv = styled.div`
  ${formMixin}
`;

const validationSchema = yup.object().shape({
  issue: yup
    .string()
    .required("Required")
    .min(5, "This line seems to short. Can you elaborate a bit more?")
    .max(30, "This line is too long. 30 chars max."),
  category: yup.string().required("Required"),
  address: yup.string().required("Required"),
  textarea: yup
    .string()
    .required("Required")
    .min(30, "More information needed")
    .max(300, "300 characters max allowed")
});

export default function SubmitIssueForm({ onSubmit }) {
  return (
    <StyledDiv className="form">
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          issue: "",
          category: "",
          address: "",
          textarea: ""
        }}
        onSubmit={onSubmit}
        render={props => {
          return (
            <Form>
              <div className="input-field">
                <label>
                  <span>Issue</span>
                  <Field name="issue" type="text" placeholder="issue" />
                </label>
                <ErrorMessage
                  name="issue"
                  component="div"
                  className="errorMessage"
                />
              </div>
              <div>
                <label>
                  <span>Category</span>
                  <Field component="select" name="category">
                    <option value="select">Select option</option>
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
                    component="textarea"
                    name="textarea"
                    placeholder="tell us more"
                    rows="3"
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
        }}
      />
    </StyledDiv>
  );
}
