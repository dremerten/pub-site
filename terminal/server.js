import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import pty from "node-pty";
import path from "path";
import url from "url";
import { exec } from "child_process";

const app = express();
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 7681;
const DEFAULT_TOPIC = process.env.DEFAULT_TOPIC || "aws";

app.use(express.static(path.join(__dirname, "public")));

const server = createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });

wss.on("connection", (ws, req) => {
  const reqUrl = new URL(req.url, "http://localhost");
  const topic = (reqUrl.searchParams.get("topic") || DEFAULT_TOPIC).trim() || DEFAULT_TOPIC;
  const runId = `quiz-${topic}-${Date.now().toString(36)}`;
  const command = `docker rm -f ${runId} >/dev/null 2>&1; docker run --name ${runId} --rm -it moabukar/devops-interview-prep practice ${topic}`;
  const shellCmd = process.env.SHELL || "/bin/sh";
  // Append exit so when the quiz container ends, the session closes instead of dropping to a shell
  const shell = pty.spawn(shellCmd, ["-lc", `${command}; exit`], {
    name: "xterm-color",
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env,
  });

  shell.onData((data) => ws.readyState === ws.OPEN && ws.send(data));

  ws.on("message", (msg) => {
    try {
      const parsed = JSON.parse(msg);
      if (parsed.type === "input") {
        shell.write(parsed.data);
      } else if (parsed.type === "resize" && parsed.cols && parsed.rows) {
        shell.resize(parsed.cols, parsed.rows);
      }
    } catch {
      // Ignore malformed messages
    }
  });

  ws.on("close", () => shell.kill());
  ws.on("error", () => shell.kill());
  shell.onExit(() => ws.close());

  const cleanup = () => exec(`docker rm -f ${runId}`, () => {});
  ws.on("close", cleanup);
  ws.on("error", cleanup);
});

server.listen(PORT, () => {
  console.log(`Quiz terminal listening on http://0.0.0.0:${PORT}`);
});
