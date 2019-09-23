import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import UserDisplay from "./UserDisplay";
import axios from "axios";

function SignUpForm({ values, errors, touched, isSubmitting, status }) {

    const [alreadySignedUp, setAlreadySignedUp] = useState([]); //{username: "data", password: "data", email: "data"}

    setAlreadySignedUp(status);

    let errorStyle = {
        color: "red"
    };

    return ( <
            div >
            <
            Form > {
                touched.username && errors.username && < p style = { errorStyle } > { errors.username } < /p>} <
                Field type = "text"
                name = "username"
                placeholder = "Username" / > {
                    touched.email && errors.email && < p style = { errorStyle } > { errors.email } < /p>} <
                    Field type = "email"
                    name = "email"
                    placeholder = "Email" / > {
                        touched.password && errors.password && < p style = { errorStyle } > { errors.password } < /p>} <
                        Field type = "password"
                        name = "password"
                        placeholder = "Password" / > {
                            touched.tos && errors.tos && < p style = { errorStyle } > { errors.tos } < /p>} <
                            Field type = "checkbox"
                            name = "tos"
                            checked = { values.tos }
                            /> I Agree to the Terms of Service <
                            button disabled = { isSubmitting } > Submit < /button> <
                            /Form> {
                                alreadySignedUp.map((item) => {
                                    return <UserDisplay user = { item }
                                    />
                                })
                            } <
                            /div>
                        );
                    }

                    const FormikSignUpForm = withFormik({
                        mapPropsToValues({ username, email, password, tos }) {
                            return {
                                username: username || "",
                                email: email || "",
                                password: password || "",
                                tos: tos || false
                            };
                        },

                        validationSchema: Yup.object().shape({
                            email: Yup.string()
                                .email("email not valid")
                                .required("email is required"),
                            password: Yup.string()
                                .min(6, "password must be 6 characters or longer")
                                .required("password is required"),
                            username: Yup.string()
                                .min(3, "username must be 3 characters or longer")
                                .required("username is required"),
                            tos: Yup.bool()
                                .test(
                                    'tos',
                                    'Terms of Service must be agreed to',
                                    value => value === true
                                )
                                .required(
                                    'Terms of Service must be agreed to'
                                )
                        }),

                        handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
                            axios
                                .post("https://reqres.in/api/users", values)
                                .then(res => {
                                    setStatus(values);
                                    console.log(res);
                                    resetForm();
                                    setSubmitting(false);
                                })
                                .catch(err => {
                                    console.log(err);
                                    setSubmitting(false);
                                });
                        }

                    })(SignUpForm);

                    export default FormikSignUpForm;