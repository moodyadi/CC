import React from "react";
import Note from "../Note/Note";
import "./NoteContainer.css";

function NoteContainer(props) {
  const notes = Array.isArray(props.notes) ? props.notes.slice().reverse() : [];

  const handleSaveNote = (noteData) => {
    console.log("Saving Note:", noteData);
    // Optionally, you can pass this data to the parent component for saving
    // props.saveNote && props.saveNote(noteData);
  };

  return (
    <div className="note-container">
      <h2>CopyCat</h2>
      <div className="note-container_notes custom-scroll">
        {notes.length > 0 ? (
          notes.map((item) => (
            <Note
              key={item.id}
              note={item}
              deleteNote={props.deleteNote}
              updateText={props.updateText}
              saveNote={handleSaveNote}
            />
          ))
        ) : (
          <h3>No Credentials added</h3>
        )}
      </div>
    </div>
  );
}

export default NoteContainer;
