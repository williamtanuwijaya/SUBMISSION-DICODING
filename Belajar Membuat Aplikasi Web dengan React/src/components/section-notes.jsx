import React from "react";
import Card from "./card";

const SectionNotes = ({ label, notes, setNotes }) => {
  return (
    <section>
      <h2>{label}</h2>
      {notes.length === 0 ? (
        <p>Tidak ada catatan.</p>
      ) : (
        <div className="card-container">
          {notes?.map((note) => (
            <Card key={note.id} action={setNotes} {...note} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SectionNotes;
