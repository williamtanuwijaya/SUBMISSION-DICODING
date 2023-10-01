import { useState, useEffect } from 'react';
import FormInput from './form-input';
import Header from './header';
import SectionNotes from './section-notes';
import { getInitialData } from '../utils/index';
import React from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [searchNotes, setSearchNotes] = useState([]);
  const [notes, setNotes] = useState(getInitialData());

  const activeNotes = (searchNotes || notes).filter((note) => !note.archived);
  const archivedNotes = (searchNotes || notes).filter((note) => note.archived);

  useEffect(() => {
    setSearchNotes(notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase())));
  }, [query, notes]);

  return (
    <>
      <Header search={query} updateQuery={setQuery} updateNotes={setNotes} />
      <main>
        <FormInput updateNotes={setNotes} />
        <SectionNotes label="Active Notes" notes={activeNotes} setNotes={setNotes} />
        <SectionNotes label="Archived Notes" notes={archivedNotes} setNotes={setNotes} />
      </main>
    </>
  );
}

export default App;
