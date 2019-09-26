import { axiosWithAuth } from '../axiosWithAuth/axiosWithAuth';

//the fetch or initial get information ALL ISSUES

export const FETCH_ALLISSUES_START = 'FETCH_ISSUES_START';
export const FETCH_ALLISSUES_SUCCESS = 'FETCH_ISSUES_SUCCESS';
export const FETCH_ALLISSUES_FAILURE = 'FETCH_ISSUES_FAILURE';

export const getAllIssues = () => dispatch => {
    dispatch({ type: FETCH_ALLISSUES_START });
    axiosWithAuth()
        .get('/issues')
        .then(res => {
            dispatch({ type: FETCH_ALLISSUES_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: FETCH_ALLISSUES_FAILURE, payload: err.response });
        });

};


//the fetch for USER created issues
export const FETCH_USERISSUES_START = 'FETCH_USERISSUES_START';
export const FETCH_USERISSUES_SUCCESS = 'FETCH_USERISSUES_SUCCESS';
export const FETCH_USERISSUES_FAILURE = 'FETCH_USERISSUES_FAILURE';

export const getUserIssues = (userId) => dispatch => {
    console.log("getUserIssues is ATLEAST getting called");
    dispatch({ type: FETCH_USERISSUES_START });
    axiosWithAuth()
        .get(`/auth/users/${userId}/issues`)
        .then(res => {
            console.log('hello from actions');
            dispatch({ type: FETCH_USERISSUES_SUCCESS, payload: res.data })

        })
        .catch(err => {
            dispatch({ type: FETCH_USERISSUES_FAILURE, payload: err.response });
        })
        .finally(() => {
            console.log("getUserIssues is ATLEAST happening");
        });
};


//post or adding ALL issues TO main list
export const POST_ALLISSUES_START = 'POST_ISSUES_START';
export const POST_ALLISSUES_SUCCESS = 'POST_ISSUES_SUCCESS';
export const POST_ALLISSUES_FAILURE = 'POST_ISUES_FAILURE';
//, userId
export const addIssue = (issues) => dispatch => {
    console.log("addIssue")
    dispatch({ type: POST_ALLISSUES_START });
    axiosWithAuth()
        .post('/issues', issues)
        .then(res => {
            console.log("Working", res.data)
            dispatch({ type: POST_ALLISSUES_SUCCESS, payload: res.data });
            // getUserIssues(userId);
        })
        .catch(err => {
            console.log("erroring", err)
            dispatch({ type: POST_ALLISSUES_FAILURE, payload: err.response });
        });
};


// update issues/:id
export const UPDATE_ISSUES_START = 'UPDATE_ISSUES_START';
export const UPDATE_ISSUES_SUCCESS = 'UPDATE_ISSUES_SUCCESS';
export const UPDATE_ISSUES_FAILURE = 'UPDATE_ISSUES_FAILURE';

export const updateIssue = (issue, userId) => dispatch => {
    dispatch({ type: UPDATE_ISSUES_START });
    axiosWithAuth()
        .put(`/issues/${issue.id}`, issue)
        .then(res => {
            dispatch({ type: UPDATE_ISSUES_SUCCESS, payload: res.data })
            // getUserIssues(userId);
            getAllIssues();

        })
        .catch(err => {
            dispatch({ type: UPDATE_ISSUES_FAILURE, payload: err.response });
        });
};

//to vote then .put the vote value
export const UPDATE_VOTE_START = 'UPDATE_VOTE_START';
export const UPDATE_VOTE_SUCCESS = 'UPDATE_VOTE_SUCCESS';
export const UPDATE_VOTE_FAILURE = 'UPDATE_VOTE_FAILURE';

export const theVote = (issueId, userId) => dispatch => {
    dispatch({ type: UPDATE_VOTE_START });
    axiosWithAuth()
        .put(`/issues/${issueId}/vote`)
        .then(res => {
            console.log()
            dispatch({ type: UPDATE_VOTE_SUCCESS, payload: res.data })
            // getUserIssues(userId);
            getAllIssues();
        })
        .catch(err => {
            dispatch({ type: UPDATE_VOTE_FAILURE, payload: err.response });
        });
};

export const FETCH_ONEISSUE_START = 'FETCH_ONEISSUE_START' ;
export const FETCH_ONEISSUE_SUCCESS = 'FETCH_ONEISSUE_SUCCESS';
export const FETCH_ONEISSUE_FAILURE = 'FETCH_ONEISSUE_FAILURE';

export const grabOneIssue = (issueId) => dispatch => {
    dispatch({type: FETCH_ONEISSUE_START});
    axiosWithAuth()
    .get(`/issues/${issueId}`)
    .then(res => {
        console.log("grabOneIssue successful", res.data);
        dispatch({type: FETCH_ONEISSUE_SUCCESS, payload: res.data})
    })
    .catch(err => {
        console.log("grabOneIssue failed", err.response);
        dispatch({type: FETCH_ONEISSUE_FAILURE, payload: err.response});
    })
    .finally(() => {
        console.log("grabOneIssue is happening at least");
    });
}

export const deleteIssues = (issueId) => dispatch => {
    axiosWithAuth()
        .delete(`/issues/${issueId}`)
        .then(res => {
            getUserIssues(localStorage.getItem('userId'));
            console.log('deleted issue', res);

        })
        .catch(err => {
            alert('error', err.response);
        });
};