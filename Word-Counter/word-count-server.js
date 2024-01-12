const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const fs = require('fs');

// Configuration for file uploads using multer
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files
const app = express();

// ROute for the root path
app.get('/', (req, res) => {
  res.send('This is the root path!');
});

// Endpoint for handling pdf file uploads
app.post('/upload', upload.single('pdf'), async (req, res) => {
  try 
  {
    // Check if a valid pdf file is uploaded
    if (!req.file || req.file.mimetype !== 'application/pdf') 
    {
      return res.status(400).json({ error: 'Please upload a valid PDF file' });
    }

    const filePath = req.file.path;

    try 
    {
      // Parse the pdf content
      const data = await pdf(filePath);
      const text = data.text;

      // Count words in the extracted text
      const wordCount = countWords(text);

      // Deleting the uploaded file after processing
      fs.unlink(filePath, (err) => 
      {
        if (err) 
        {
          console.error('Error deleting file:', err);
        }
      });

      // Send the word count as JSON response
      res.json({ wordCount });
    } 
    catch (error) 
    {
      // Handle errors during pdf processing
      console.error('Error processing PDF:', error);
      res.status(500).json({ error: 'Error processing PDF' });
    }
  } 
  catch (error) 
  {
    // Handle errors during file upload handling
    console.error('Error handling file upload:', error);
    res.status(500).json({ error: 'Error handling file upload' });
  }
});

// Function to count words in a text
const countWords = (text) => {
  const wordArray = text.match(/[\w'-]+/g);

  let wordCount;
  
  if (wordArray) 
  {
    wordCount = wordArray.length;
  } 
  else 
  {
    wordCount = 0;
  }

  return wordCount;
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
{
  console.log(`Node.js web server running on port ${PORT}`);
});
