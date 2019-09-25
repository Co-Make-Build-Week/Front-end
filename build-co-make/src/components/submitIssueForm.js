import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  label {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    font-size: 1.75rem;
    margin: 0.5rem;
    span {
      flex-grow: 1;
    }
    input,
    select {
      font-size: 1.75rem;
      padding: 0.75rem;
      margin-left: 1rem;
      flex-grow: 2;
      border-style: 0.75px solid #ffffff;
    }
  }
  .errorMessage {
    color: red;
    font-weight: bold;
    display: flex;
    justify-content: center;
  }
  textarea {
    margin-top: 0.5rem;
    width: 100%;
    font-size: 1.75rem;
    padding: 0.75rem;
  }
  .button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0.5rem;
    button {
      font-size: 1.75rem;
      border: none;
      border-radius: 5px;
      padding: 0.5rem;
      background: #52D5AC;
    }
  }
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
