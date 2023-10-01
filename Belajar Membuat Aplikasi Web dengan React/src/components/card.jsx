import React from 'react';
import { showFormattedDate } from '../utils';
import Button from './button';

const Card = ({ id, title, createdAt, body, archived, action }) => {
  const deleteNote = (item) => action((notes) => notes.filter((note) => note.id !== item));
  const toggleArchive = (item) => {
    action((notes) =>
      notes.map((note) => {
        if (note.id === item) {
          return { ...note, archived: !note.archived };
        }
        return note;
      })
    );
  };

  return (
    <div>
      <article id={id} className="card">
        <header className="card-header">
          <h3 className="card-title">{title}</h3>
          <small className="card-date">{showFormattedDate(createdAt)}</small>
          <p className="card-body">{body}</p>
        </header>
        <footer className="card-footer">
          <Button eventHandler={() => deleteNote(id)} label="Delete" />
          <Button eventHandler={() => toggleArchive(id)} label={archived ? 'Unarchive' : 'Archive'} />
        </footer>
      </article>
    </div>
  );
};

export default Card;
