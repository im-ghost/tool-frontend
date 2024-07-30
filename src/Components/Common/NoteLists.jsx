// src/components/NoteList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NoteCard from './NoteCard';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        {notes.map(note => (
          <NoteCard key={note.id} note={note} deleteNote={deleteNote} />
        ))}
      </div>
      <Link to="/add">
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Add Note</button>
      </Link>
    </div>
  );
};

export default NoteList;
