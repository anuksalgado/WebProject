import express from "express";
import bodyParser from "body-parser";
import multer from "multer"; //To communicate files
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { exec } from "child_process"; //Used to execute shell commands
import util from "util"; //built-in Node.js module that provides utility functions.
import cors from "cors";




const execPromise = util.promisify(exec); // creates a Promise-based version of the exec function to use with asynchronous operations.


const __dirname = dirname(fileURLToPath(import.meta.url)); //To get the whole path upto working directory

const app = express();
const port = process.env.PORT || 3001;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// CORS

/*app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3002");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Handle preflight requests
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});*/

app.use(cors());



let docName;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Document');
    },
    filename: (req, file, cb) => {
        //console.log(file);
        docName = file.originalname;
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // A Multer error occurred (e.g., file size exceeded)
        res.status(400).send('Multer error: ' + err.message);
    } else if (err) {
        // An unknown error occurred
        res.status(500).send('Unknown error: ' + err.message);
    } else {
        // No error occurred, proceed to the next middleware or route handler
        next();
    }
});

//function to check if a particular file exists
async function fileExists(filePath) {
    try {
        await fs.access(filePath, fs.constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
}


let pathToOffice;

const osPlatform = process.platform;

if (osPlatform === 'win32' || osPlatform === 'win64') {
    pathToOffice = 'C:\\Program Files\\LibreOffice\\program\\soffice.exe';
} else if (osPlatform === 'darwin') {
    pathToOffice = '/Applications/LibreOffice.app/Contents/MacOS/soffice';
} else if (osPlatform === 'linux') {
    pathToOffice = '/usr/bin/soffice';
} else {
    console.error('Unsupported operating system');
    process.exit(1);
}


async function convertWordToPdf(inputPath, outputPath) {
    try {
        // Convert using LibreOffice
        const { stdout, stderr } = await execPromise(`"${pathToOffice}" --headless --invisible --convert-to pdf --outdir "${outputPath}" "${inputPath}"`);
        if (stderr && !stderr.includes('Secure coding is not enabled for restorable state!')) {
            throw new Error(stderr);
        }
        //console.log('Conversion successful:', stdout);

    } catch (error) {
        console.error('Error converting Word to PDF:', error);
        throw error;
    }
}

async function deleteDirectory(path) {
    try {
        await fs.rm(path, { recursive: true, force: true });
        console.log(`Directory ${path} has been deleted successfully`);
    } catch (error) {
        console.error(`Error deleting directory ${path}:`, error);
    }
}



/*app.get("/", (req, res) => {
    //send homepage
    res.render("uploadDoc.ejs");
});*/


app.post("/getdocument", upload.fields([
    { name: 'doc-upload', maxCount: 1 }
]), async (req, res) => {
    console.log(`Document successfully uploaded: ${docName}`);

    //console.log(req.body);

    console.log("---------------------------------------------------------------------\n");


    //Convert process below and send the file
    try {
        if (await fileExists(__dirname + `/public/Document/${docName}`)) {
            const docNameWithoutExtension = docName.replace(extname(docName), '');
            await convertWordToPdf(__dirname + `/public/Document/${docName}`, __dirname + `/public/Document/${docNameWithoutExtension}`);
            console.log("Document successfully converted");
            const filePath = join(__dirname, 'public', 'Document', docNameWithoutExtension, `${docNameWithoutExtension}.pdf`);

            const fileBuffer = await fs.readFile(filePath);

            // Set headers for file download
            res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
            res.setHeader('Content-Disposition', `attachment; filename="${docNameWithoutExtension}_${Date.now()}.pdf"`);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Length', fileBuffer.length);

            // Send the file
            res.send(fileBuffer);

            // Clean up: deletes the uploaded file
            await fs.unlink(__dirname + `/public/Document/${docName}`);
            //await fs.unlink(filePath);

            //Clean up: deletes the folder created to store the converted file
            await deleteDirectory(__dirname + `/public/Document/${docNameWithoutExtension}`);
        }
        else {
            res.status(404).json({ message: "UNSUCCESSFUL: File not found" });
        }
    } catch (error) {
        console.error("Failed to make conversion:", error.message);
        res.status(500).json({ message: "UNSUCCESSFUL: Conversion failed" });
    }


});




app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

