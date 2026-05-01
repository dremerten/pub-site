import {Activity, BookOpenText, CircleUser, MapPin} from "lucide-react";

export const personalInfo = {
  name: "Andre Merten",
  role: "Senior QA / DevOps Engineer",
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
    company: "IBM Aspera",
    position: "Senior QA / DevOps",
    years: "May 2024 - Dec 2025",
    status: "Active",
    highlights: [
      "Architected and maintained hybrid AWS and on-prem production infrastructure with multi-AZ deployments, auto-scaling, HA load balancing, and MariaDB Galera clustering — achieving 99.99% uptime.",
      "Managed infrastructure as code using Terraform and Ansible, enabling repeatable, version-controlled provisioning across all environments.",
      "Built and maintained CI/CD pipelines supporting continuous delivery across development, staging, and production environments.",
      "Deployed CloudWatch and cloud-based logging to proactively identify SQL bottlenecks and deadlocks, improving application performance by 12%.",
      "Served as primary infrastructure engineer for government contract validation — granted access to internal government testing environments to deploy and configure the full Aspera product line under DISA STIG security requirements.",
      "Led identity and security architecture (Vault, Entra ID, Okta), implementing SSO, SAML 2.0 federation, and PKI across the platform.",
      "Stepped in across teams wherever the situation demanded — replicating complex multi-product environments on live Sev1 calls, unblocking deployments, and resolving integration failures that required full-stack product knowledge."
    ]
  },
  {
    company: "IBM Aspera",
    position: "QA Automation Engineer",
    years: "Feb 2022 - May 2024",
    highlights: [
      "Migrated legacy Ruby/Chef pipelines to Python, eliminating security vulnerabilities and long-term maintenance overhead.",
      "Containerized Jenkins using Kubernetes dynamic agents — replacing static build infrastructure with short-lived agents that terminated after each job.",
      "Automated VM and OpenShift cluster provisioning via IBM Fyre, enabling fully hands-off environment setup and test execution.",
      "Built a smoke test pipeline gating stable builds to Slack, eliminating faulty distribution that previously cost the team up to 3 days of lost productivity per incident.",
      "Parallelized CI pipelines in Jenkins, reducing test cycle times by 50%."
    ]
  },
  {
    company: "IBM Aspera",
    position: "Software Quality Engineer",
    years: "Jan 2020 - Jan 2022",
    highlights: [
      "Rewrote the legacy TestRail test case library and established a team-wide authoring standard, eliminating inconsistent and uncontrolled test case creation.",
      "Drove automation of high-volume manual testing tasks, compressing QA cycles and contributing to multiple early releases.",
      "Executed performance and reliability testing on distributed systems, catching critical vulnerabilities before production."
    ]
  },
  {
    company: "IBM Aspera",
    position: "Software Engineer Apprentice",
    years: "Feb 2019 - Jan 2020",
    highlights: [
      "Completed IBM apprenticeship in Software Engineering and Systems Fundamentals.",
      "Built hands-on proficiency deploying and maintaining applications across on-prem and cloud environments."
    ]
  }
];

export const skillsData = [
  {type: "Cloud & Infrastructure", items: ["AWS Cloud Suite", "Terraform", "Ansible", "Kubernetes", "Docker", "OpenShift", "Linux (RHEL, Rocky, Ubuntu)", "Windows Server"]},
  {type: "Networking & IT Administration", items: ["TCP/IP", "UDP", "SSH", "DNS", "Firewall Management", "VPC Networking", "Load Balancing", "VPN", "TLS/SSL", "PKI", "Keepalived"]},
  {type: "CI/CD & Automation", items: ["Jenkins", "GitHub Actions", "Python", "Bash", "PowerShell", "Dynamic Build Agents"]},
  {type: "Observability", items: ["ELK Stack", "Prometheus", "Grafana", "CloudWatch"]},
  {type: "Identity & Security", items: ["HashiCorp Vault", "Active Directory", "Entra ID", "Okta", "SAML 2.0", "SSO", "DISA STIG", "Secrets Management"]},
  {type: "Data & High Availability", items: ["MariaDB Galera", "MaxScale", "RDS", "Multi-AZ Deployments"]}
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
