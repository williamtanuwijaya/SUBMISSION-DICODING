import { useState } from 'react';
import React from 'react';
import Input from './input';

const FormInput = ({ updateNotes }) => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  const createNote = (event) => {
    event.preventDefault();
    const timestamp = new Date().toISOString();

    updateNotes((notes) => [...notes, { id: timestamp, title, body: note, archived: false, createdAt: timestamp }]);
  };

  return (
    <div className='formInput'>
      <form onSubmit={createNote}>
        <h2>Buat Catatan</h2>
        <small className='characters'>
          Remaining characters: <span>{50 - title.length}</span>
        </small>
        <Input value={title} onChange={setTitle} type="text" placeholder="Title" id="title" name="title" required />
        <Input value={note} onChange={setNote} type="textarea" placeholder="Write your note" id="note" name="note" required />
        <Input type="submit" id="submit_form" name="submit_form" value="Create" />
      </form>
    </div>
  );
};

export default FormInput;
