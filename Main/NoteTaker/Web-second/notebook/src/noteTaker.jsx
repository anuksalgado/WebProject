import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Note = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);

  const saveNote = async () => {
    const formData = new FormData();
    formData.append('files', new Blob([content], { type: 'text/plain' }), title + '.txt');
    fetch('http://localhost:3000/uploads', {
      method: 'POST',
      body: formData,
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      window.location.reload(); // Refresh the page
    })
    .catch(error => console.error('Error saving note:', error));
  };
  

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/notes');
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
      <div className='box-border h-32 w-full p-4 border-4 shadow-md rounded-xl'>
          <div className=''>
              <input className='w-52'
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
          />
          </div>
          <div className=''>
          <textarea className='w-full'
              placeholder="Enter your note here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            {/* Adding referesh below to show note saved */}
            <button onClick={saveNote}>Save Note</button>
          </div>

          <div>
      <h1>Saved Notes</h1>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
      
      </div>
  );
};

export default Note;
