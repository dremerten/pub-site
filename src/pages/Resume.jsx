import PageWrapper from "../components/PageWrapper.jsx";

const ExperienceItem = ({
  company,
  position,
  years
}) => {
  return (
    <div>
      <span className="text-purple-400">- company:</span> <span className="text-orange-300">{ company }</span>
      <div className="ml-4">
        <span className="text-blue-400">position:</span> <span className="text-orange-300">{ position }</span><br/>
        <span className="text-blue-400">years:</span> <span className="text-green-300">{ years }</span>
      </div>
    </div>
  );
}

const experienceItems = [
  {company: "Aspera, an IBM company", position: "DevOps & Platform Engineer", years: "2019 - Present"}
];

const Resume = () => {
  return (
    <PageWrapper>
      <div className="border-2 rounded-md font-mono">
        <div className="border-b-2 pt-2 pb-2 pl-3 pr-3 flex flex-row items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-slate-400 text-sm">resume.yaml</span>
        </div>

        <div className="p-6">
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-blue-400">name:</span> <span className="text-orange-300">"Andreas Merten"</span>
            </div>
            <div>
              <span className="text-blue-400">role:</span> <span className="text-orange-300">"DevOps and Platform Test Engineer"</span>
            </div>

            <div className="mt-6">
              <span className="text-blue-400">experience:</span>
              <div className="ml-4 mt-2 space-y-3">
                {
                  experienceItems.map((item, index) => (
                    <ExperienceItem
                      key={index}
                      position={item.position}
                      company={item.company}
                      years={item.years}
                    />
                  ))
                }
              </div>
            </div>

            <div className="mt-6">
              <span className="text-blue-400">skills:</span>
              <div className="ml-4 mt-2">
                <span className="text-purple-400">cloud:</span> <span className="text-slate-400">[</span><span className="text-orange-300">"AWS", "GCP", "Azure"</span><span className="text-slate-400">]</span><br/>
                <span className="text-purple-400">container:</span> <span className="text-slate-400">[</span><span className="text-orange-300">"Kubernetes", "Docker"</span><span className="text-slate-400">]</span><br/>
                <span className="text-purple-400">iac:</span> <span className="text-slate-400">[</span><span className="text-orange-300">"Terraform", "Ansible"</span><span className="text-slate-400">]</span>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-slate-600"># Proven track record of reducing incident response</span><br/>
              <span className="text-slate-600"># time by 60% and improving system reliability</span>
            </div>
          </div>
        </div>
      </div>
      {/*<JobSection*/}
      {/*  company="IBM Aspera"*/}
      {/*  role="DevOps & Platform Test Engineer"*/}
      {/*  dateRange="Feb 2019 - Present"*/}
      {/*  experienceList={[*/}
      {/*    "Implemented automation and parallel testing, reducing QA cycle times and accelerating release schedules.",*/}
      {/*    "Key contributor to the release cycles of HSTS, AsperaProxy, HTTP-Gateway, and OTFV, ensuring stability and timely delivery.",*/}
      {/*    "Enhanced product performance and customer satisfaction by contributing to Faspex5 versions 5.0.0 through 5.0.14.",*/}
      {/*    "Created turnkey test environments, reducing setup time from hours to 30 minutes.",*/}
      {/*    "Enabled parallel deployments across all supported OS versions, improving team efficiency.",*/}
      {/*    "Designed and implemented high-availability Faspex5 deployments for both on-prem (MariaDB Galera) and cloud (RDS HA) customers.",*/}
      {/*    "Managed and successfully drove the annual DISA Security STIG testing to completion as the sole engineer for the past five years.",*/}
      {/*    "Developed, maintained, and Dockerized automation scripts to streamline workflows.",*/}
      {/*    "Led AWS cloud deployments and applied CI/CD pipelines using Jenkins for core and legacy web applications.",*/}
      {/*    "Conducted comprehensive validation testing across distributed systems, containers, and cloud infrastructure."*/}
      {/*  ]}*/}
      {/*/>*/}

      {/*<JobSection*/}
      {/*  company="Infoset-ng (open-source project), The Palisadoes Foundation"*/}
      {/*  role={"Open-source Contributor"}*/}
      {/*  dateRange="August 2017 - February 2018"*/}
      {/*  experienceList={[*/}
      {/*    "Performed Unit Testing, Debugging and Technical Documentation.",*/}
      {/*      "Contributed to the development of an all purpose data gathering application.",*/}
      {/*      "Collaborated in the design infrastructure and deployment of MySQL based back-end.",*/}
      {/*      "Implemented database connection pooling to reduce the load on the database server when experiencing high transaction volumes.",*/}
      {/*      "Assisted with the set up and maintenance of the organization's network agents"*/}
      {/*    ]}*/}
      {/*/>*/}

      {/*<JobSection*/}
      {/*  company="Education and Training"*/}
      {/*  role="IBM Apprenticeship Program"*/}
      {/*  dateRange="2019-2020"*/}
      {/*  experienceList={[*/}
      {/*    "Completed an intensive hands-on program specializing in software development, quality assurance, and testing methodologies.",*/}
      {/*    "Acquired practical experience in deploying, testing, and maintaining enterprise applications in both on-premises and cloud environments.",*/}
      {/*    "Developed foundational skills in DevOps practices, automation, and continuous integration pipelines, establishing a strong entry into the technology field."*/}
      {/*  ]}*/}
      {/*/>*/}
    </PageWrapper>
  );
};

export default Resume;
