import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

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
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          issue: "",
          category: "",
          address: "",
          textarea: "",
        }}
        onSubmit={onSubmit}
        render={props => {
          return (
            <Form>
              <div>
                <label>
                  Issue
                  <Field name="issue" type="text" placeholder="issue" />
                  <ErrorMessage name="issue" component="div" />
                </label>
              </div>
              <div>
                <label>
                  Category
                  <Field component="select" name="category">
                    <option value="select">Select option</option>
                    <option value="potholes">Potholes</option>
                    <option value="trees">Trees</option>
                    <option value="sidewalks">Sidewalks</option>
                  </Field>
                  <ErrorMessage name="category" component="div" />
                </label>
              </div>
              <div>
                <label>
                  Address
                  <Field name="address" type="text" placeholder="address" />
                  <ErrorMessage name="address" component="div" />
                </label>
              </div>
              <div>
                <label>
                  Tell us more:
                  <Field
                    component="textarea"
                    name="textarea"
                    placeholder="tell us more"
                  />
                  <ErrorMessage name="textarea" component="div" />
                </label>
              </div>
              <div>
                <button type="submit">Submit Issue</button>
              </div>
            </Form>
          );
        }}
      />
    </div>
  );
}
