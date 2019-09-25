import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Field, withFormik } from 'formik';
import axios from 'axios';
import yup from 'yup'

//first stop for state


const UserHome = ({issues}) => {

    const [item, setItem] = useState({
        issue: "",
        // user_id: localStorage.getItem("id"),
        editing: false
      });
    
    const initialIssue = {
    note: ""
    };
    
    const [editIssue, setEditIssue] = useState(initialIssue);

    const handleSubmit = () => {
       // event.preventDefault();
      console.log("item", item);
     // props.postData(item);
      setItem({
        issue: ""
      });
    }

    const handleChange = event => {
        console.log(item);
        setItem({ ...item, [event.target.name]: event.target.value });
    };

    const handleEdit = () => {
    //     // issue: editIssue; 
    };
            
          
            //   axios
            //     .put(
            //      ``,
            //       editNote
            //     )
            //     .then(res => {
            //       console.log(res);
            //       window.location.reload();
            //       setItem({ issue: "" });
            //     })
          
            //     .catch(err => console.error("error", err.response));
            //};

            const handleDelete = postId => {
                //let newFilter = post.filter(element => element.id === post.id);
                // axios
                //     .delete(
                //     ``
                //     )
                //     .then(response => {
                //     window.location.reload();
                //     console.log(response);
                //     })
                //     .catch(error => {
                //     console.log(error.response);
                //     });
            };
                  

    return(
        <div>
            <header>
                <h1>Welcome {issues.email}!</h1>
                <Link to="/issuesListPage">All Local Issues</Link>
            </header>
            <hr/>
            <Form onSubmit={handleSubmit}>
                <div className="user-input-form">
                    <Field
                    className="input-field"
                    type="textarea"
                    value="issue"
                    name="issue"
                    onChange={handleChange}
                    />
                    <button
                    className="submit-button"
                    value="Submit"
                    type="submit"
                    >
                    Add new issue
                    </button>
                </div>
            </Form>
            <hr />
            <br></br>
            {issues.map(issue => {
                return (
                    <div className="today-quote">
                    <h1>{issue}</h1>
                    <button
                        className="user-list"
                        onClick={() => handleDelete(issues.id)}
                    >
                        Delete today's note
                    </button>
                    {/* <button onClick={toggleEditing}>Redo today's note</button> */}
                    <div className="editBlock">
                        <input
                        //placeholder="Edit your issue here"
                        onChange={e =>
                            setEditIssue({ ...editIssue, issue: e.target.value })
                        }
                        value={editIssue.issue}
                        />
                        <button
                        className="edit-button"
                        onClick={() => handleEdit(issues.id)}
                        >
                        Submit edit
                        </button>
                    </div>
                    </div>
                );
            })}
        </div>
    );
    
}

const FormikUserHome = withFormik({
    mapPropsToValues({}) {
        return {
            
        }
    },
    // validationSchema: yup.object().shape({
    //    issue: yup.string().min('20', '20 character max')
    // }),
    
    // handleSubmit(values, { setStatus }) {
    //     console.log("values: ", values);
    //     axiosWithAuth()  
    //         .post(`/auth/register`, values)
    //         .then(res => {
    //             console.log("POST res", res.data);
    //             console.log(values);
                
    //         })
    //         .catch(err => console.log("ERROR API", err))
    // }   
})(UserHome)
export default FormikUserHome;
//export default connect(
    //     mapStateToProps,
    //     { postData, getData }
    //   )(Today);
