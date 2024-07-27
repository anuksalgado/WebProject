import React, { useState } from 'react';
import './WordCounter.css';
import * as pdfjs from 'pdfjs-dist';
//import mammoth from 'mammoth'; // Import mammoth library for handling docx files

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function WordCounter() {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    const words = newText.trim().split(/\s+/);
    setWordCount(newText.trim() === '' ? 0 : words.length);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const contents = e.target.result;

      try {
        if (file.name.endsWith('.pdf')) {
          const count = await getWordCountFromPdf(contents);
          setWordCount(count);
        // } else if (file.name.endsWith('.docx')) {
        //   const count = await getWordCountFromDocx(contents); // Call function to count words in docx file
        //   setWordCount(count);
        } else if (file.name.endsWith('.txt')) {
          const count = getWordCountFromTxt(contents);
          setWordCount(count);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  const getWordCountFromPdf = async (contents) => {
    try {
      const loadingTask = pdfjs.getDocument({ data: contents });
      const pdf = await loadingTask.promise;
      let count = 0;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        count += pageText.trim().split(/\s+/).filter(word => word !== '').length; // Filter out empty strings
      }

      return count;
    } catch (error) {
      console.error('Error parsing PDF:', error);
      return 0; // Return 0 in case of error
    }
  };

//   const getWordCountFromDocx = async (contents) => {
//     try {
//       const result = await mammoth.extractRawText({ arrayBuffer: contents });
//       return result.value.trim().split(/\s+/).length;
//     } catch (error) {
//       console.error('Error parsing DOCX:', error);
//       return 0; // Return 0 in case of error
//     }
//   };

  const getWordCountFromTxt = (contents) => {
    return contents.trim().split(/\s+/).length;
  };

  return (
    <div className="container">
      <h1>Word Counter</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Paste your text here..."
        rows={10}
        cols={50}
      />
      <input type="file" accept=".pdf, .docx, .txt" onChange={handleFileUpload} />
      <div className="word-count">Word Count: {wordCount}</div>
    </div>
  );
}

export default WordCounter;
