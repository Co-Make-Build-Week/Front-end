import React from "react";
import styled, { css } from "styled-components";

const formMixin = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  label {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    font-size: 1.75rem;
    margin: 0.5rem;
    span {
      flex-grow: 1;
    }
    input,
    select {
      font-size: 1.75rem;
      padding: 0.75rem;
      margin-left: 1rem;
      flex-grow: 2;
      border-style: 0.75px solid #ffffff;
    }
  }
  .errorMessage {
    color: red;
    font-weight: bold;
    display: flex;
    justify-content: center;
  }
  textarea {
    margin-top: 0.5rem;
    width: 100%;
    font-size: 1.75rem;
    padding: 0.75rem;
  }
  .button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0.5rem;
    button {
      font-size: 1.75rem;
      border: none;
      border-radius: 5px;
      padding: 0.5rem;
      background: #52d5ac;
    }
  }
`;


export default formMixin;