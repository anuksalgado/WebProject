import express from "express";
import bodyParser from "body-parser";
import multer from "multer"; //To communicate files
import { dirname, extname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { exec } from "child_process"; //Used to execute shell commands
import util from "util"; //built-in Node.js module that provides utility functions.




const execPromise = util.promisify(exec); // creates a Promise-based version of the exec function to use with asynchronous operations.


const __dirname = dirname(fileURLToPath(import.meta.url)); //To get the whole path upto working directory

const TestServer = express();
const port = 3000;



TestServer.use(bodyParser.urlencoded({ extended: true }));
TestServer.use(express.static("public"));



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

TestServer.use((err, req, res, next) => {
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
function fileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
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
    pathToOffice = '' // have to enter the path according to how soffice is in linux //TODO
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



TestServer.get("/", (req, res) => {
    //send homepage
    res.render("uploadDoc.ejs");
});


TestServer.post("/getdocument", upload.fields([
    { name: 'doc-upload', maxCount: 1 }
]), async (req, res) => {
    console.log(`Document successfully uploaded: ${docName}`);

    //console.log(req.body);

    console.log("---------------------------------------------------------------------\n");


    //Convert process below and send the file
    try {
        if (fileExists(__dirname + `/public/Document/${docName}`)) {
            const docNameWithoutExtension = docName.replace(extname(docName), '');
            await convertWordToPdf(__dirname + `/public/Document/${docName}`, __dirname + `/public/Document/${docNameWithoutExtension}`);
            console.log("Document successfully converted");
            res.render("downloadDoc.ejs", {
                filepath: `/Document/${docNameWithoutExtension}/${docNameWithoutExtension}.pdf`
            });
        }
        else {
            res.send("<h1>UNSUCCESSFUL: File not found</h1>");
        }
    } catch (error) {
        console.error("Failed to make conversion:", error.message);
        res.send("<h1>UNSUCCESSFUL: Conversion failed</h1>");
    }


});




TestServer.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

