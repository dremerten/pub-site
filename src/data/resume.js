import {Activity, BookOpenText, CircleUser, MapPin} from "lucide-react";

export const personalInfo = {
  name: "Andreas Merten",
  role: "DevOps/Infra QA Engineer",
  summary: [
    "I'm a DevOps-focused Infrastructure QA Engineer with 6+ years of experience building secure, reproducible QA/Dev environments and automating legacy and cloud systems using Kubernetes, Docker, Terraform, and Ansible. I have hands-on experience testing and managing Kubernetes clusters, as well as cloud infrastructure across AWS, Azure, and GCP. As the point engineer for DISA and FISC compliance environments, I've developed strong sysadmin expertise across DNS, networking, SMTP, LDAP, Active Directory, Linux, and Windows Server. I'm currently studying for the Certified Kubernetes Administrator (CKA) exam.",
    "I have a strong QA testing mindset and consistently look for inefficiencies and areas for improvement to make both myself and the broader team more productive. While working in QA, I designed and built a continuous deployment infrastructure that allows QA and development engineers to quickly spin up and install new builds for testing and development purposes. Over the years, this system has saved the team hundreds of hours and significantly improved our ability to deliver high-quality software, often leading to QA sign-off multiple days ahead of schedule on several product releases.",
    "I take initiative, continuously refine processes, and look for ways to help the team work smarter and deliver better results. I'm always eager to learn and grow, and helping my team succeed is at the core of how I work."
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
    position: "DevOps/Infra QA",
    years: "2020 - Present",
    status: "Active",
    highlights: [
      "Implemented automation and parallel testing, reducing QA cycle times and\n          accelerating release schedules.",
      "Key contributor to the release cycles of HSTS, AsperaProxy, HTTP-Gateway,\n          and OTFV (Out-of-file-validation) virus detection ensuring stability and\n          timely delivery.",
      "Enhanced product performance and customer satisfaction by contributing to\n          Faspex5 versions 5.0.0 through 5.0.14.",
      "Created turnkey test environments, reducing setup time by 50%",
      "Enabled parallel deployments across all supported OS versions, improving team\n          efficiency.",
      "Helped Architect and implement high-availability Faspex5 deployments.\n          Responsible for validation testing for both on-prem (MariaDB Galera) and\n          cloud (RDS HA) ensuring compatibility.",
      "Managed and successfully drove the annual DISA Security STIG testing to\n          completion as the sole engineer for the past five years.",
      "Coordinated with External Security Teams and Pentest Teams for annual security\n          Testing for entire WebApp Portfolio.",
      "Developed, maintained, and Dockerized automation scripts to streamline\n          workflows.",
      "Led AWS cloud deployments and applied CI/CD pipelines using Jenkins for core\n          and legacy web applications.",
      "Conducted comprehensive validation testing across distributed systems,\n          containers, and cloud infrastructure."
    ]
  },
  {
    company: "Aspera, an IBM company",
    position: "Software Apprentice",
    years: "2019 - 2020",
    highlights: [
      "Completed an intensive hands-on program specializing in software development, quality assurance, and testing methodologies.",
      "Acquired practical experience in deploying, testing, and maintaining enterprise applications in both on-premises and cloud environments.",
      "Developed foundational skills in DevOps practices, automation, and continuous integration pipelines, establishing a strong entry into the technology field."
    ]
  },
  {
    company: "Infoset-ng",
    position: "Open Source Contributor",
    years: "August 2017 - Feb 2018",
    highlights: [
      "Performed Unit Testing, Debugging and Technical Documentation.",
      "Contributed to the development of an all-purpose data gathering application.",
      "Collaborated in the design infrastructure and deployment of MySQL based back-end.",
      "Implemented database connection pooling to reduce the load on the database server when experiencing high transaction volumes.",
      "Assisted with the set up and maintenance of the organization's network agents"
    ]
  }
];

export const skillsData = [
  {type: "cloud", items: ["AWS", "Azure", "GCP"]},
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
    role: "DevOps & Test Engineer",
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
