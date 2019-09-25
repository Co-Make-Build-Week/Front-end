import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios';

const UserForm = ({ 
    values, 
    errors,
    touched,
    status
}) => {
    const [user, setUser] = useState({})  //adding so we can see the state after submit but not needed for form.
    
    useEffect(() => {
        if(status) {
            setUser(theUser => ({...user, theUser}));
        }
    }, [user, status])
    return (
        <Form className="form">
            <h1>Sign up here!</h1>
            {/* <h2>not a registered user yet? <button>click here to be one</button></h2> */}
            <label>Email
            <br />
                { touched.email && errors.email && <p>{errors.email}</p> }   {/*This is the validation*/}
                <Field type="text" name="username" placeholder="Username..."/>
            </label>
            <br/> 

            <label>Password
                <br />
                { touched.password && errors.password && <p>{errors.password}</p> }
                <Field type="password" name="password" placeholder="Password..." />
            </label>
            <hr/>
            <label>TOS<br/>I agree that I will not use this as a tool to cause undue stress to others.
                <Field component="select" name="agreement" >
                    <option value="I agree to your TOS">Agree</option>
                    <option value="I do not agree with your TOS">Disagree</option>
                </Field>
            </label>  
                <button type="submit">Join us!</button>
        </Form>
    )}

const FormikUserForm = withFormik({
        mapPropsToValues({ username, password }) {
            return {
                'username': username || '',
                'password': password || '',

            }
        },
        validationSchema: yup.object().shape({
            username: yup.string().min('3', 'Username must be 3 characters or more').required("You must provide a username."),
            password: yup.string().min('9').required("Minimum 9 letters please.")
        }),
        
        handleSubmit(values,{props}) {
            console.log("values: ", values);
            axios.post(`https://comake.herokuapp.com/api/auth/register`, values)
                .then(res => {
                    console.log("POST res", res.data);
                    localStorage.setItem('userId',res.data.id);
                    props.history.push('/userHome');
                    console.log(JSON.stringify(values));
                    
                })
                .catch(err =>
                    alert(err.response.data.message)
                );
        }   
})(UserForm)


export default FormikUserForm


// render(<FormikUserForm name="" email="" password="" />, document.getElementById('root'))
