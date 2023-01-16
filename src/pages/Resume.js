import React from 'react';
import PageWrapper from "../ui-components/PageWrapper";
import Title from "../ui-components/Title";
import JobSection from "../ui-components/JobSection";

const Resume = () => {


  return (
    <PageWrapper>
      <Title title="Resume" />
      <JobSection
        company="IBM Aspera"
        role="Software Operations Test Engineer"
        dateRange="Feb 2019 - Present"
        experienceList={[
          "QA Webapps Team Lead",
          "Lead Engineer with Defense Information Systems Agency (DISA) Security Compliance",
          "AWS Cloud Deployments of all Aspera High Availability Web applications",
          "Created Jenkins CI/CD Test Automation Deployments for multiple Aspera Core and Legacy WebApps",
          "Migration from Docker to Kubernetes",
          "Deployment and Management of all QA Test Environments",
          "Responsible for testing on all Cloud Providers"
        ]}
      />

      <JobSection
        company="Infoset-ng (open-source project), The Palisadoes Foundation"
        role={"Open-source Contributor"}
        dateRange="August 2017 - February 2018"
        experienceList={[
          "Performed Unit Testing, Debugging and Technical Documentation.",
            "Contributed to the development of an all purpose data gathering application.",
            "Collaborated in the design infrastructure and deployment of MySQL based back-end.",
            "Implemented database connection pooling to reduce the load on the database server when experiencing high transaction volumes.",
            "Assisted with the set up and maintenance of the organization’s network agents"
          ]}
      />
    </PageWrapper>
  );
};

export default Resume;
