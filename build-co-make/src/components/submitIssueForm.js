import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const initialIssueForm = {
  issue: "",
  category: "",
  address: "",
  email: "",
  textarea: "",
};

const onSubmit = () => {};

export default function SubmitIssueForm({ onSubmit }) {
  return (
    <div>
      <Formik
        initialValues={initialIssueForm}
        onSubmit={onSubmit}
        render={props => {
          return (
            <Form>
              <div>
                <label>
                  Issue
                  <Field name="issue" type="text" placeholder="issue" />
                </label>
              </div>
              <div>
                <label>
                  Category
                  <Field component="select" name="category">
                    <option value="potholes">Potholes</option>
                    <option value="trees">Trees</option>
                    <option value="sidewalks">Sidewalks</option>
                  </Field>
                </label>
              </div>
              <div>
                <label>
                  Address
                  <Field name="address" type="text" placeholder="address" />
                </label>
              </div>
              <div>
                  <label>
                      Tell us more:
                      <Field component="textarea" name="textarea" placeholder="tell us more" />
                      {/* <textarea name="more-text" rows="5" cols="33"></textarea> */}
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
