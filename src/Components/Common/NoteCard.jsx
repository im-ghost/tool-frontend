// src/components/NoteCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const NoteCard = ({ note, deleteNote }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 w-full max-w-md">
      <h3 className="text-xl font-bold">{note.title}</h3>
      <p className="text-gray-600">{note.description}</p>
      <div className="flex justify-end space-x-2 mt-2">
        <Link to={`/note/${note.id}`} className="text-blue-600 hover:underline">Edit</Link>
        <button onClick={() => deleteNote(note.id)} className="text-red-600 hover:underline">Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
