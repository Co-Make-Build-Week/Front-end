import React from "react";
import { NavLink } from "react-router-dom";
import {Image} from 'semantic-ui-react';
import styled from "styled-components";
import logoMain3 from '../images/main3.png';

const StyledDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
  background: #e29027;
  box-shadow: 2px 3px burlywood;
  border-bottom: 1px solid sienna;
  width: 100%;
  position: fixed;
  top: 0px;
  opacity: .9;
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
      color: #9a9a9a;
    }
  }
  .link {
    opacity: 1;
  }
  .img {
    opacity: 1;
  }
`;

export default function NavBar(props) {
  //console.log(props);
  const logout = props => {
    localStorage.removeItem("token");
  };

  return (
      <StyledDiv>
          <NavLink className="link" to="/userHome"> Home </NavLink>
          <Image className="img" src={logoMain3}/>
  
          <NavLink className="link" to="/issuesListPage"> All Local Issues Here </NavLink>
          <NavLink
           className="link" 
           to="" 
           onClick={logout}> Logout 
          </NavLink>
      </StyledDiv>
  );
}
