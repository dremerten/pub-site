import Title from "../ui-components/Title.jsx";
import PageWrapper from "../ui-components/PageWrapper.jsx";

const About = () => {
  return (
    <PageWrapper>
      <Title title="About Me" />
      <section>
        I am an experienced DevOps and Platform Test Engineer with over 7 years of expertise in designing, deploying, and maintaining both on-premises and cloud applications. I am proficient in Kubernetes, OpenShift, Docker, Podman, CI/CD pipelines, and cloud infrastructure (AWS, Azure, GCP). My skills also extend to automation frameworks and implementing Blue-Green deployments, ensuring seamless releases and minimizing downtime.
      </section>
      <section>
        <h3>Key Achievements:</h3>
        <ul style={{ listStyle: "disc", paddingLeft: "20px" }}>
          <li>Optimized application performance and accelerated release cycles.</li>
          <li>Improved operational efficiency.</li>
          <li>Designed and maintained internal infrastructure for the Aspera WebApps team, ensuring reliable, reproducible, and secure environments.</li>
          <li>Prioritized security by proactively reviewing software versions and dependencies to ensure long-term support (LTS) and high standard compliance.</li>
        </ul>
      </section>
    </PageWrapper>
  );
};

export default About;
