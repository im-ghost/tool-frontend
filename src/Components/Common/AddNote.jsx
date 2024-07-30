// src/components/AddNote.js
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from './Editor';

const AddNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const dContent = [{type: 'paragraph',children: [{ text: 'A line of text in a paragraph.'}],}]
  const [content, setContent] = useState(dContent);
useEffect(()=>{
  
},[])
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const addNote = () =>{
    const newNote = {
      id: savedNotes.length ? savedNotes[savedNotes.length - 1].id + 1 : 1,
      title,
      content,
    };
    const updatedNotes = [...savedNotes, newNote];
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    navigate('/');
    }

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border border-gray-300 rounded dark:bg-black-900 bg-white-200"
        placeholder="Title"
      />
    <Editor initialValue={content} onChange={setContent} />
      <button onClick={addNote} className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
    </div>
  );
};

export default AddNote;
