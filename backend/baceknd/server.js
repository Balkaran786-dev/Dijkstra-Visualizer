const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/cpp', (req, res) => {
  const code = req.body.code;
  const fileName = 'main.cpp';
  const outputFileName = process.platform === 'win32' ? 'main.exe' : './main';

  fs.writeFileSync(fileName, code);

  exec(`g++ ${fileName} -o main && ${outputFileName}`, (error, stdout, stderr) => {
    if (error) {
      res.json({ status: 'error', message: stderr });
      return;
    }
    res.json({ status: 'success', stdout, stderr });
  });
});

app.post('/api/java', (req, res) => {
  const code = req.body.code;
  const fileName = 'Main.java';

  fs.writeFileSync(fileName, code);

  exec(`javac ${fileName} && java Main`, (error, stdout, stderr) => {
    if (error) {
      res.json({ status: 'error', message: stderr });
      return;
    }
    res.json({ status: 'success', stdout, stderr });
  });
});

app.post('/api/javascript', (req, res) => {
  const code = req.body.code;

  try {
    const result = eval(code);
    res.json({ status: 'success', result });
  } catch (error) {
    res.json({ status: 'error', message: error.message });
  }
});

// Serve frontend files only if they exist (for local development)
const frontendBuildPath = path.join(__dirname, "../../frontend/build");
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
} else {
  // API-only mode for production deployment
  app.get("/", (req, res) => {
    res.json({
      message: "Dijkstra Visualizer API Server",
      status: "running",
      endpoints: {
        "POST /api/cpp": "Execute C++ Dijkstra algorithm"
      }
    });
  });

  app.get("*", (req, res) => {
    res.status(404).json({ error: "API endpoint not found" });
  });
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

