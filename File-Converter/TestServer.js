import express from "express";
import bodyParser from "body-parser";
import multer from "multer"; //To communicate files
import axios from "axios"; //To simplify API communication if needed
import { dirname } from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer"; //To convert html to pdf
import mammoth from "mammoth"; //To convert doc to html
import fs from "fs";

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
        console.log(file);
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

// Function to convert Word to HTML using mammoth.js
async function convertToHtml(inputPath) {
    try {
        var options = {
            styleMap: [
                "u => strong", //anything that s underlined in the doc would be changed to strong in html 
                "p[style-name^='Heading'] => h1:fresh", //any paragraph with style starting with Heading will be changed to a H1 tag
                "comment-reference => sup" //html will include any comments in the doc as well
            ]
        };


        const result = await mammoth.convertToHtml({ path: inputPath }, options);
        const html = result.value; // The generated HTML
        const messages = result.messages; // Any messages, such as warnings during conversion
        console.log(messages);
        return html;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Function to convert HTML to PDF using puppeteer
async function convertToPdf(html, outputPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    await page.pdf({ path: outputPath, format: 'A4' });
    await browser.close();
}

// Main function to convert Word to PDF
async function convertWordToPdf(inputPath, outputPath) {
    try {
        const htmlContent = await convertToHtml(inputPath);
        await convertToPdf(htmlContent, outputPath);
        console.log('Conversion successful!');
    } catch (error) {
        console.error('Error converting Word to PDF:', error);
    }
}

TestServer.get("/", (req, res) => {
    //send homepage of document converter
    res.render("uploadDoc.ejs");
});

TestServer.post("/getdocument", upload.fields([
    { name: 'doc-upload', maxCount: 1 }
]), async (req, res) => {
    console.log(`Document successfully uploaded: ${docName}`);

    console.log(req.body);

    console.log("------------------------------------------------------");


    //do whatever convert process below and send the file
    try {
        if (fileExists(__dirname + `/public/Document/${docName}`)) {
            await convertWordToPdf(__dirname + `/public/Document/${docName}`, __dirname + `/public/Document/ConvertedDocToPDF.pdf`);
            res.render("downloadDoc.ejs", {
                filepath: `/Document/ConvertedDocToPDF.pdf`
            });
        }
        else {
            res.send("<h1>UNSUCCESSFULL</h1>");
        }
    } catch (error) {
        console.error("Failed to make conversion:", error.message);
    }


});

TestServer.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

