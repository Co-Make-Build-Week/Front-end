import {
    FETCH_ALLISSUES_START,
    FETCH_ALLISSUES_SUCCESS,
    FETCH_ALLISSUES_FAILURE,
    FETCH_USER_START,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_USERISSUES_START,
    FETCH_USERISSUES_SUCCESS,
    FETCH_USERISSUES_FAILURE,
    POST_ALLISSUES_START,
    POST_ALLISSUES_SUCCESS,
    POST_ALLISSUES_FAILURE,
    UPDATE_ISSUES_START,
    UPDATE_ISSUES_SUCCESS,
    UPDATE_ISSUES_FAILURE,
    UPDATE_VOTE_START,
    UPDATE_VOTE_SUCCESS,
    UPDATE_VOTE_FAILURE

} from '../actions/index.js';

const initialState = {
    issues: [],
    userIssues: [],
    userInfo: [],
    isLoading: false,
    error: '',

}

export const issuesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALLISSUES_START:
            
                return {
                    ...state,
                    isLoading: true,
                    error: ''
                };
           
        case FETCH_ALLISSUES_SUCCESS:
                console.log('this is the payload', action.payload)
                return {
                    ...state,
                    issues:[ ...action.payload],
                    isLoading: false,
                    error: ''
                };
        case FETCH_ALLISSUES_FAILURE:
                return {
                    ...state,
                    isLoading: false,
                    error: 'not loading like that'
                };
        case POST_ALLISSUES_START:
                return {
                    ...state,
                    isLoading: true,
                    error: ''
                };
        case POST_ALLISSUES_SUCCESS:
                return {
                    ...state,
                    issues: [...state.issues, ...action.payload],
                    isLoading: false,
                    error: '',
                };
        case POST_ALLISSUES_FAILURE:
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                }
        case FETCH_USERISSUES_START:
                return {
                    ...state,
                    isLoading: true,
                    error: ''
                }
        case FETCH_USERISSUES_SUCCESS:
                return {
                    ...state,
                    userIssues: [...action.payload],
                    isLoading: false,
                    error: ''
                }
        case FETCH_USERISSUES_FAILURE:
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                }
        case UPDATE_ISSUES_START:
                return {
                    ...state,
                    isLoading: true,
                    error: ''
                }
        case UPDATE_ISSUES_SUCCESS:
                return {
                    ...state,
                    issues: [...action.payload],
                    isLoading: false,
                    error: ''
                }
        case UPDATE_ISSUES_FAILURE:
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                }
    
        default:
            return state;

    }
}

