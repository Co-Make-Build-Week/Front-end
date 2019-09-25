import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// IMPORT STYLED COMPONENTS AND CSS MIXINS
import styled from "styled-components";

const StyledCard = styled.div`
  width: 60vw;
  margin: 0 auto;
  .card {
    background: #eeeeee;
    border: 1px solid gray;
    padding: 0.5rem;
    margin: 0.5rem;
    display: flex;
    flex-direction: row;
    .issueImage {
      width: 50%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: auto;
      }
    }
    .text {
      padding: 0.5rem;
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      h2 {
        width: 50%;
      }
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

function IssueCard(props) {
  console.log(props);
  const [issue, setIssue] = useState();

  useEffect(() => {
    setIssue(props.issue);
  }, [props.issue]);

  let issueButtons = <div></div>;

  if (props.showButtons) {
    issueButtons = (
      <div>
        <button>Delete</button>
        <button>Edit</button>
      </div>
    );
  }

  if (!issue) return <p>Loading...</p>;

  return (
    <StyledCard>
      <Link to={`/issues/${issue.id}`}>
        <div className="card">
          <div className="issueImage">
            <img src={issue.imageURL} className="pic" />
          </div>
          <div className="text">
            <h2>
              {issue.title} - {issue.category}
            </h2>
            <p>{issue.details}</p>

            <p>By user {issue.user_id} (TODO: get username by id)</p>
            <p>Upvotes: {issue.upvotes}</p>
            {issueButtons}
          </div>
        </div>
      </Link>
    </StyledCard>
  );
}

export default IssueCard;
