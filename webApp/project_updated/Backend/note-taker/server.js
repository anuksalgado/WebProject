const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const path = require('path'); // Import the path module

const app = express();
app.use(cors()) // allows incoming requests from any IP

const uploads = multer({ dest: path.join(__dirname, 'uploads') }); // Path to the uploads directory

app.post("/uploads", uploads.array("files"), (req, res) => {
  console.log(req);
  console.log(res);
  res.json({ status: "files received" });
});

app.get("/notes", (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads'); // Path to the uploads directory

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error reading files:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    
    const notes = files.map(file => {
      const title = file.slice(0, -4); // Remove the ".txt" extension
      const content = fs.readFileSync(path.join(uploadsDir, file), 'utf8');
      return { title, content };
    });
    
    res.json(notes);
  });
});

app.listen(3003, function () {
  console.log("server running on port 3003");
})
