import PageWrapper from "../components/PageWrapper.jsx";
import { personalInfo, experienceData, skillsData, comments } from "@/data/resume";
import { useState, useEffect } from "react";

const Resume = () => {
  const [getNodesCommand, setGetNodesCommand] = useState("");
  const [showNodesOutput, setShowNodesOutput] = useState(false);
  const [applyCommand, setApplyCommand] = useState("");
  const [showApplySuccess, setShowApplySuccess] = useState(false);
  const [getPodsCommand, setGetPodsCommand] = useState("");
  const [showPodsOutput, setShowPodsOutput] = useState(false);
  const [podStatus, setPodStatus] = useState(0);
  const [describeCommand, setDescribeCommand] = useState("");
  const [describeOutput, setDescribeOutput] = useState("");

  const getNodesCmd = "kubectl get nodes -o wide";
  const applyCmd = "kubectl apply -f resume.yaml";
  const getPodsCmd = "kubectl get pod -n andre";
  const describeCmd = "kubectl describe deploy/resume -n andre";

  const nodesOutput = `NAME              STATUS   ROLES           AGE   VERSION   INTERNAL-IP     EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION      CONTAINER-RUNTIME
control-plane-1   Ready    control-plane   45d   v1.28.2   192.168.1.10    <none>        Ubuntu 22.04.3 LTS   5.15.0-91-generic   containerd://1.7.2
worker-node-1     Ready    <none>          45d   v1.28.2   192.168.1.11    <none>        Ubuntu 22.04.3 LTS   5.15.0-91-generic   containerd://1.7.2
worker-node-2     Ready    <none>          45d   v1.28.2   192.168.1.12    <none>        Ubuntu 22.04.3 LTS   5.15.0-91-generic   containerd://1.7.2
worker-node-3     Ready    <none>          45d   v1.28.2   192.168.1.13    <none>        Ubuntu 22.04.3 LTS   5.15.0-91-generic   containerd://1.7.2`;

  const getPodOutput = () => {
    const podStatuses = [
      `NAME                      READY   STATUS              RESTARTS   AGE
resume-7d8f9c5b6-xk7md    0/1     Pending             0          1s`,
      `NAME                      READY   STATUS              RESTARTS   AGE
resume-7d8f9c5b6-xk7md    0/1     Init:0/1            0          2s`,
      `NAME                      READY   STATUS              RESTARTS   AGE
resume-7d8f9c5b6-xk7md    0/1     ContainerCreating   0          3s`,
      `NAME                      READY   STATUS    RESTARTS   AGE
resume-7d8f9c5b6-xk7md    1/1     Running   0          6s`
    ];
    return podStatuses[podStatus] || podStatuses[0];
  };

  const buildDescribeOutput = () => {
    let output = `Name:                   resume
Namespace:              andre
CreationTimestamp:      ${new Date().toISOString()}
Labels:                 app=resume
                        environment=production
Annotations:            deployment.kubernetes.io/revision: 1
Selector:               app=resume
Replicas:               1 desired | 1 updated | 1 total | 1 available
StrategyType:           RollingUpdate
MinReadySeconds:        0
Pod Template:
  Labels:               app=resume

Metadata:
  Name:                 ${personalInfo.name}
  Role:                 ${personalInfo.role}

Experience:`;

    experienceData.forEach((exp, idx) => {
      output += `\n  [${idx + 1}] ${exp.position}
      Company:          ${exp.company}
      Duration:         ${exp.years}
      Highlights:`;
      exp.highlights.forEach((highlight, hidx) => {
        output += `\n        - ${highlight}`;
      });
    });

    output += `\n\nSkills:`;
    skillsData.forEach(skill => {
      output += `\n  ${skill.type.padEnd(40)}: ${skill.items.join(', ')}`;
    });

    output += `\n\nConditions:
  Type                  Status  Reason
  ----                  ------  ------
  Available             True    MinimumReplicasAvailable
  Progressing           True    NewReplicaSetAvailable

Events:                 <none>`;

    return output;
  };

  useEffect(() => {
    let index = 0;
    const getNodesTimer = setInterval(() => {
      if (index < getNodesCmd.length) {
        setGetNodesCommand(getNodesCmd.slice(0, index + 1));
        index++;
      } else {
        clearInterval(getNodesTimer);
        setTimeout(() => {
          setShowNodesOutput(true);

          setTimeout(() => {
            let applyIndex = 0;
            const applyTimer = setInterval(() => {
              if (applyIndex < applyCmd.length) {
                setApplyCommand(applyCmd.slice(0, applyIndex + 1));
                applyIndex++;
              } else {
                clearInterval(applyTimer);
                setTimeout(() => {
                  setShowApplySuccess(true);

                  setTimeout(() => {
                    let podsIndex = 0;
                    const podsTimer = setInterval(() => {
                      if (podsIndex < getPodsCmd.length) {
                        setGetPodsCommand(getPodsCmd.slice(0, podsIndex + 1));
                        podsIndex++;
                      } else {
                        clearInterval(podsTimer);
                        setTimeout(() => {
                          setShowPodsOutput(true);
                          setPodStatus(0);

                          setTimeout(() => {
                            setPodStatus(1);
                            setTimeout(() => {
                              setPodStatus(2);
                              setTimeout(() => {
                                setPodStatus(3);

                                setTimeout(() => {
                                let descIndex = 0;
                                const descTimer = setInterval(() => {
                                  if (descIndex < describeCmd.length) {
                                    setDescribeCommand(describeCmd.slice(0, descIndex + 1));
                                    descIndex++;
                                  } else {
                                    clearInterval(descTimer);

                                    setTimeout(() => {
                                      const output = buildDescribeOutput();
                                      let outIndex = 0;
                                      const outputTimer = setInterval(() => {
                                        if (outIndex < output.length) {
                                          setDescribeOutput(output.slice(0, outIndex + 1));
                                          outIndex++;
                                        } else {
                                          clearInterval(outputTimer);
                                        }
                                      }, 5);
                                    }, 500);
                                  }
                                }, 50);
                              }, 1000);
                              }, 1200);
                            }, 1000);
                          }, 800);
                        }, 300);
                      }
                    }, 50);
                  }, 1000);
                }, 300);
              }
            }, 50);
          }, 1000);
        }, 300);
      }
    }, 50);

    return () => clearInterval(getNodesTimer);
  }, []);

  return (
    <PageWrapper>
      <div className="bg-black rounded border border-green-500/30 shadow-lg shadow-green-500/10 hover:border-green-500/50 transition-all">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-400 text-sm font-mono ml-2">kubectl - terminal</span>
        </div>

        <div className="p-6 font-mono text-sm min-h-[500px]">
          <div className="mb-4">
            <span className="text-green-400">user@k8s</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-white">$ </span>
            <span className="text-gray-200">{getNodesCommand}</span>
            {getNodesCommand.length < getNodesCmd.length && (
              <span className="animate-pulse bg-green-400 text-green-400">_</span>
            )}
          </div>

          {showNodesOutput && (
            <div className="mb-6 text-gray-300 whitespace-pre font-mono text-xs">
              {nodesOutput}
            </div>
          )}

          {showNodesOutput && (
            <div className="mb-4">
              <span className="text-green-400">user@k8s</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">$ </span>
              <span className="text-gray-200">{applyCommand}</span>
              {applyCommand.length > 0 && applyCommand.length < applyCmd.length && (
                <span className="animate-pulse bg-green-400 text-green-400">_</span>
              )}
            </div>
          )}

          {showApplySuccess && (
            <div className="mb-4 text-green-300">
              deployment.apps/resume created
            </div>
          )}

          {showApplySuccess && (
            <div className="mb-4">
              <span className="text-green-400">user@k8s</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">$ </span>
              <span className="text-gray-200">{getPodsCommand}</span>
              {getPodsCommand.length > 0 && getPodsCommand.length < getPodsCmd.length && (
                <span className="animate-pulse bg-green-400 text-green-400">_</span>
              )}
            </div>
          )}

          {showPodsOutput && (
            <div className="mb-6 text-gray-300 whitespace-pre font-mono text-xs">
              {getPodOutput()}
            </div>
          )}

          {showPodsOutput && podStatus === 3 && (
            <div className="mb-4">
              <span className="text-green-400">user@k8s</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-white">$ </span>
              <span className="text-gray-200">{describeCommand}</span>
              {describeCommand.length > 0 && describeCommand.length < describeCmd.length && (
                <span className="animate-pulse bg-green-400 text-green-400">_</span>
              )}
            </div>
          )}

          {describeOutput && (
            <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
              {describeOutput}
              {describeOutput.length < buildDescribeOutput().length && (
                <span className="animate-pulse bg-green-400 text-green-400">_</span>
              )}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Resume;
