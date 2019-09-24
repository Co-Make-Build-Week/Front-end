import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import { axiosWithAuth } from '../axiosWithAuth/axiosWithAuth';



// sends the user info to backend to be used on 

const UserForm = ({ 
    values, 
    errors,
    touched,
    status
}) => {
    const [user, setUser] = useState([])  //adding so we can see the state after submit but not needed for form.
    
    useEffect(() => {
        if(status) {
            setUser([...user, status])
        }
    }, [user, status])
    return (
        <Form className="form">
            <h1>Login Here!</h1>
            <h2>not a registered user yet? <Link to='/registration'><button>click here to be one</button></Link></h2>
            <label>Email
            <br />
                { touched.username && errors.username && <p>{errors.username}</p> }   {/*This is the validation*/}
                <Field type="text" name="email" placeholder="email"/>
            </label>
            <br/> 

            <label>Password
                <br />
                { touched.password && errors.password && <p>{errors.password}</p> }
                <Field type="password" name="password" placeholder="password" />
            </label>
            <hr/>
                <button type="button">Login</button>
        </Form>
    )}

const FormikUserForm = withFormik({
        mapPropsToValues({ username, password }) {
            return {
                username: username || '',
                password: password || '',
            }
        },
        validationSchema: yup.object().shape({
            username: yup.string().min('3', 'Username must be 3 characters or more').required("You must provide a username."),
            password: yup.string().min('9').required("Minimum 9 letters please.")
        }),
        
        handleSubmit(values, { setStatus }) {
            
            console.log("values: ", values);
            // setNestedObjectValues(values);
            // post api's here or schedule a timer, etc
            axiosWithAuth()   
                .post(`https://comake.herokuapp.com/api/auth/login`, values)
                .then(res => {
                    console.log("POST res", res);
                    // setNestedObjectValues(res.data);
                })
                .catch(err => console.log("ERROR API", err))
        }   
})(UserForm)


export default FormikUserForm


// render(<FormikUserForm name="" email="" password="" />, document.getElementById('root'))
