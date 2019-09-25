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
    dispatch({ type: FETCH_USERISSUES_START });
    axiosWithAuth()
        .get(`/users/${userId}/issues`)
        .then(res => {
            dispatch({ type: FETCH_USERISSUES_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: FETCH_USERISSUES_FAILURE, payload: err.response });
        });
};


//post or adding ALL issues TO main list
export const POST_ALLISSUES_START = 'POST_ISSUES_START';
export const POST_ALLISSUES_SUCCESS = 'POST_ISSUES_SUCCESS';
export const POST_ALLISSUES_FAILURE = 'POST_ISUES_FAILURE';

export const addIssue = (issue) => dispatch => {
    dispatch({ type: POST_ALLISSUES_START });
    axiosWithAuth()
        .post('/issues', issue)
        .then(res => {
            dispatch({ type: POST_ALLISSUES_SUCCESS, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: POST_ALLISSUES_FAILURE, payload: err.response });
        });
};


// update issues/:id
export const UPDATE_ISSUES_START = 'UPDATE_ISSUES_START';
export const UPDATE_ISSUES_SUCCESS = 'UPDATE_ISSUES_SUCCESS';
export const UPDATE_ISSUES_FAILURE = 'UPDATE_ISSUES_FAILURE';

export const updateIssue = (issueId) => dispatch => {
    dispatch({type: UPDATE_ISSUES_START});
    axiosWithAuth()
    .put(`/issues/${issueId}`)
    .then(res => {
        dispatch({type: UPDATE_ISSUES_SUCCESS, payload: res.data})
    })
    .catch(err => {
        dispatch({type: UPDATE_ISSUES_FAILURE, payload: err.response});
    });
};

//to vote then .put the vote value
export const UPDATE_VOTE_START = 'UPDATE_VOTE_START';
export const UPDATE_VOTE_SUCCESS = 'UPDATE_VOTE_SUCCESS';
export const UPDATE_VOTE_FAILURE = 'UPDATE_VOTE_FAILURE';

export const theVote = () => dispatch => {
    dispatch({type:UPDATE_VOTE_START});
    axiosWithAuth()
    .put(`/issues/${issueId}/vote`)
    .then(res => {
        dispatch({type: UPDATE_VOTE_SUCCESS, payload:res.data})
    })
    .catch(err => {
        dispatch({type: UPDATE_VOTE_FAILURE, payload: err.response});
    });
};

export const deleteIssues = (issueId) => dispatch => {
    axiosWithAuth()
        .delete(`/issues/${issueId}`)
        .then(res => {
            console.log('deleted issue', res);
        })
        .catch(err => {
            alert('error', err.response);
        });
};