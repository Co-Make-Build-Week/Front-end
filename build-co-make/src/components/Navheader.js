import React from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const StyledDiv = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid #333333;
    @media (max-width: 500px) {
        padding: 1rem 0;
        flex-direction: column;
    }
    a {
        margin: 1rem 2rem;
        text-decoration: none;
        color: #333333;
        @media (max-width: 500px) {
            margin: 0.5rem;
        }
        &:hover {
            color: #9A9A9A;
        }
    }
`;

export default function NavBar (props) {
console.log(props);
const logout = (props) => {
localStorage.removeItem('token');
}

    return (
        <StyledDiv>
            <NavLink to='/userHome'>Home</NavLink>
                        {/* <NavLink to='/profile'>Profile</NavLink> */}
            <NavLink to='/issuesListPage'>Issues</NavLink>
            <NavLink onClick={logout} >Logout</NavLink>
        </StyledDiv>
    )
}