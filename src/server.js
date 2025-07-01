import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// Get the file path from the URL of the current module
const __fileName = fileURLToPath(import.meta.url);
// Get the directory name from the file path
const __dirName = dirname(__fileName);

// Middleware
app.use(express.json());

// Serves the HTML file from the /public directory 
// Also tells express to serve all files from the public folder as static assets
app.use(express.static(path.join(__dirName, '../public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirName, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`);
})