// src/components/NotePage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from './Editor';

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const fetchedNote = savedNotes.find(note => note.id === parseInt(id));
    setNote(fetchedNote);
  }, [id]);

  const saveNote = () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = savedNotes.map(n => (n.id === note.id ? note : n));
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    navigate('/');
  };

  const exportNote = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(note, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${note.title}.json`;
    document.body.appendChild(element);
    element.click();
  };

  return note ? (
    <div className="flex flex-col gap-4 max-w-md mx-auto">
      <input
        type="text"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        className="p-2 border border-gray-300 rounded"
        placeholder="Title"
      />
      <Editor initialValue={note.content} onChange={newValue => setNote({ ...note, content: newValue })} />
      <div className="flex justify-end space-x-2">
        <button onClick={saveNote} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        <button onClick={exportNote} className="px-4 py-2 bg-red-600 text-white rounded">Export</button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default NotePage;
