import {Activity, BookOpenText, CircleUser, MapPin} from "lucide-react";

export const personalInfo = {
  name: "Andre Merten",
  role: "DevOps Test & Infrastructure Engineer",
  summary: [
    "I'm a Senior QA/DevOps Engineer with 6+ years of experience building secure, automated infrastructure and enabling development teams through scalable platform solutions. I'm actively seeking my next role as a DevOps or Platform Engineer where I can leverage my deep automation expertise, infrastructure-as-code skills, and systems thinking to empower engineering teams at scale.",
    "Throughout my career, I've built CI/CD pipelines, automated environment provisioning with Kubernetes and Docker, and designed self-service deployment systems that saved hundreds of engineering hours while accelerating release cycles. My expertise is centered on AWS cloud infrastructure, with hands-on experience in container orchestration, Terraform, Ansible, and strong sysadmin foundations in Linux, Windows Server, networking, DNS, LDAP, and Active Directory. I also have basic experience with Azure and Google Cloud Platform.",
    "What sets me apart is my QA background—it gives me a reliability-first mindset focused on eliminating manual toil, improving developer experience, and building resilient systems. I approach DevOps and platform engineering with an eye for process improvement, test automation, and reducing friction in the software delivery lifecycle. I'm currently pursuing my CKA certification to deepen my Kubernetes expertise and position myself as a strong platform engineering contributor ready to tackle complex infrastructure challenges."
  ]
};

export const metadataInfo = [
  {text: "Certified Kubernetes Admin (in progress)", icon: BookOpenText},
  {text: "Looking for DevOps and QA Related Opportunites", icon: Activity},
  {text: "Open to Work Bay Area", icon: MapPin},
  {text: "Looking for Full-Time Employment", icon: CircleUser}
];

export const coreSkills = [
  "Docker",
  "Kubernetes",
  "Cloud",
  "Shell",
  "Security",
  "Containerization",
  "Infra as Code",
  "IT Administration",
  "Python",
  "GitLab CI"
];

export const experienceData = [
  {
    company: "Aspera, an IBM company",
    position: "Senior QA / DevOps Engineer",
    years: "Jan 2025 - Dec 2025 (1 year)",
    status: "Active",
    highlights: [
      "Optimized application performance and automated deployment pipelines, reducing release cycles by up to 35% and saving hundreds of engineering hours annually",
      "Led research, testing, and validation of a new containerized app, eliminated prior single points of failure, and authored the official HA documentation, becoming the Webapps team SME",
      "Designed and maintained secure, reproducible internal environments, improving reliability, developer productivity, and QA testing efficiency",
      "Led, organized, setup and configured IBM Aspera WebApps Products for DISA and STIG Testing for potential Government Entity contracts",
      "Contributed to key product releases, including HSTS, Aspera Proxy, HTTP-Gateway, OTFV, and Faspex 5 (5.0.0–5.0.14), enhancing stability, high-availability, and customer satisfaction"
    ]
  },
  {
    company: "Aspera, an IBM company",
    position: "QA Automation Engineer",
    years: "Feb 2023 - Jan 2025 (2 years)",
    highlights: [
      "Implemented automation and parallel testing strategies, reducing QA cycle times by 50% and accelerating release schedules",
      "Executed comprehensive QA and validation testing across distributed systems, containerized applications, and cloud infrastructure, ensuring defect-free releases",
      "Developed turnkey test environments that reduced setup time by 50%, improved team collaboration, and enabled timely delivery of high-quality projects",
      "Ensured software security and compliance by reviewing dependencies and enforcing long-term support (LTS) standards, reducing vulnerability exposure",
      "Led AWS cloud deployments and implemented CI/CD pipelines with Jenkins, improving deployment reliability and delivery speed"
    ]
  },
  {
    company: "Aspera, an IBM company",
    position: "QA Engineer",
    years: "Mar 2020 - May 2022 (2 years)",
    highlights: [
      "Adept in process improvement initiatives, identifying areas for optimization and implementing effective solutions",
      "Proficient in defining comprehensive test plans, crafting detailed test cases, identifying crucial use cases, and creating effective test matrices",
      "Solid expertise including Test Automation, Functional, Regression, Integration, System, Cross-platform, and Performance testing",
      "Knowledgeable in security and compliance requirements, incorporating them into the QA processes",
      "Developed and containerized automation scripts using Docker to streamline operational workflows and improve process reliability"
    ]
  },
  {
    company: "Aspera, an IBM company",
    position: "Software Engineer Apprentice",
    years: "Feb 2019 - Feb 2020 (1 year)",
    highlights: [
      "Selected as the sole apprentice from cohort to receive full-time employment offer upon program completion",
      "Completed intensive hands-on program specializing in software development, quality assurance, and testing methodologies",
      "Acquired practical experience deploying, testing, and maintaining enterprise applications in both on-premises and cloud environments",
      "Contributed to quality assurance processes and test automation development for IBM Aspera products"
    ]
  }
];

export const skillsData = [
  {type: "cloud", items: ["AWS (Primary)", "Azure (Basic)", "GCP (Basic)"]},
  {type: "containerization & orchestration", items: ["Kubernetes", "OpenShift", "Docker", "Podman"]},
  {type: "ci/cd & automation", items: ["Jenkins", "GitLab CI", "GitHub Actions", "Python3", "Shell Scripting"]},
  {type: "infrastructure as code", items: ["Terraform", "Ansible"]},
  {type: "monitoring & observability", items: ["Prometheus", "Grafana", "ELK Stack"]},
  {type: "security", items: ["TLS Certificate & Secret Management", "Security-by-Design", "Blue-Green Deployments"]},
  {type: "systems & networking", items: ["Linux", "Windows Server", "Firewalls", "DNS"]},
  {type: "identity & access management", items: ["Okta", "JumpCloud", "Authentik", "Keycloak", "ADFS", "Microsoft Entra ID"]},
  {type: "api testing & validation", items: ["Postman"]},
  {type: "version control & project management", items: ["Git", "GitHub", "Jira", "Confluence"]},
  {type: "communication & collaboration", items: ["MS Outlook", "Teams", "Slack"]},
  {type: "methodologies", items: ["Agile", "DevOps"]}
];

export const comments = [
  "Proven track record of creating turnkey test environments,",
  "reducing setup time by 50%"
];

export const additionalExperience = [
  {
    company: "IBM Aspera",
    role: "DevOps Test & Infrastructure Engineer",
    dateRange: "Feb 2019 - Present",
    experienceList: [
      "Implemented automation and parallel testing, reducing QA cycle times and accelerating release schedules.",
      "Key contributor to the release cycles of HSTS, AsperaProxy, HTTP-Gateway, and OTFV, ensuring stability and timely delivery.",
      "Enhanced product performance and customer satisfaction by contributing to Faspex5 versions 5.0.0 through 5.0.14.",
      "Created turnkey test environments, reducing setup time from hours to 30 minutes.",
      "Enabled parallel deployments across all supported OS versions, improving team efficiency.",
      "Designed and implemented high-availability Faspex5 deployments for both on-prem (MariaDB Galera) and cloud (RDS HA) customers.",
      "Managed and successfully drove the annual DISA Security STIG testing to completion as the sole engineer for the past five years.",
      "Developed, maintained, and Dockerized automation scripts to streamline workflows.",
      "Led AWS cloud deployments and applied CI/CD pipelines using Jenkins for core and legacy web applications.",
      "Conducted comprehensive validation testing across distributed systems, containers, and cloud infrastructure."
    ]
  },
  {
    company: "Infoset-ng (open-source project), The Palisadoes Foundation",
    role: "Open-source Contributor",
    dateRange: "August 2017 - February 2018",
    experienceList: [
      "Performed Unit Testing, Debugging and Technical Documentation.",
      "Contributed to the development of an all purpose data gathering application.",
      "Collaborated in the design infrastructure and deployment of MySQL based back-end.",
      "Implemented database connection pooling to reduce the load on the database server when experiencing high transaction volumes.",
      "Assisted with the set up and maintenance of the organization's network agents"
    ]
  },
  {
    company: "Education and Training",
    role: "IBM Apprenticeship Program",
    dateRange: "2019-2020",
    experienceList: [
      "Completed an intensive hands-on program specializing in software development, quality assurance, and testing methodologies.",
      "Acquired practical experience in deploying, testing, and maintaining enterprise applications in both on-premises and cloud environments.",
      "Developed foundational skills in DevOps practices, automation, and continuous integration pipelines, establishing a strong entry into the technology field."
    ]
  }
];
