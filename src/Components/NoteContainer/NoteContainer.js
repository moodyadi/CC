import React from "react";
import Note from "../Note/Note";

import "./NoteContainer.css";

function NoteContainer(props) {
  const reverseArray = (arr) => {
    const array = [];

    for (let i = arr.length - 1; i >= 0; --i) {
      array.push(arr[i]);
    }

    return array;
  };

  const notes = reverseArray(props.notes);

  const handleSaveNote = (noteData) => {
    // Implement your logic to save the note data
    console.log("Saving Note:", noteData);
    // Optionally, you can pass this data to the parent component for saving
    // props.saveNote && props.saveNote(noteData);
  };

  return (
    <div className="note-container">
      <h2>CopyCat</h2>
      <div className="note-container_notes custom-scroll">
        {notes?.length > 0 ? (
          notes.map((item) => (
            <Note
              key={item.id}
              note={item}
              deleteNote={props.deleteNote}
              updateText={props.updateText}
              saveNote={handleSaveNote} // Pass the saveNote function
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
