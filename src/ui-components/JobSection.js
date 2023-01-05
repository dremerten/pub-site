import React from "react";
import styled from "styled-components";

const JobSection = ({
  company,
  role,
  dateRange,
  experienceList=[]
}) => {
  const JobSection = styled("div")`
    padding: 16px 0;
    display: flex;
    margin-bottom: 10px;
  `;

  const LeftTitle = styled("div")`
    padding: 0 20px;
    flex-wrap: wrap;
    flex: 1;
    font-size: 14px;
  `;

  const Details = styled("div")`
    padding-left: 20px;
    flex: 6;
    
    h3 {
      font-size: 15px;
      font-weight: 600;
      margin: 0;
    }
    
    .subtitle {
      font-style: italic;
      font-weight: 400;
      font-size: 14px;
      margin-bottom: 10px;
    }
  `;

  const ExperienceList = styled("ul")`
    position: relative;
  `;

  const ExperienceListItem = styled("li")`
    padding-left: 30px;
    margin-bottom: 8px;
    
    &::before {
      content: "▹";
      position: absolute;
      left: 0px;
      color: gray;
    }
  `;

  return (
    <JobSection>
      <LeftTitle>
        <span>{ company }</span>
      </LeftTitle>
      <Details>
        <h3>{ role }</h3>
        <div className="subtitle">{ dateRange }</div>

        <ExperienceList>
          {
            experienceList.map((item, index) => (
              <ExperienceListItem key={index}>{ item }</ExperienceListItem>
            ))
          }
        </ExperienceList>
      </Details>
    </JobSection>
  );
}

export default JobSection;
