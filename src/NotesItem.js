import React, { useRef } from "react";

const NotesItem = (props) => {
  const inputRef = useRef();

  const handleEdit = () => {
    inputRef.current.focus();
    props.onEditMode();
  };

  return (
    <div className="notes">
      <input
        placeholder=" Note Title"
        value={props.notesTitle}
        onChange={props.onNotesTitleInput}
        readOnly={props.readOnly}
        ref={inputRef}
      />
      <textarea
        placeholder="Note Content"
        value={props.notesContent}
        onChange={props.onNotesDetailInput}
        readOnly={props.readOnly}
      />
      {props.showNoteAddInput ? null : (
        <div className="edit-del-btn">
          <button onClick={handleEdit}>✍️</button>
          <button type="button" onClick={props.onDeleteClick}>
            <i className="fa fa-trash" />
          </button>
        </div>
      )}

      <div className="note-footer">
        <small className="notes-date">{props.notesDate} </small>
        {props.showNoteAddInput ? (
          <p className="remaining-length">
            {300 - props.notesContent.length + " Remaining"}
          </p>
        ) : null}
      </div>
      {props.showNoteAddInput ? (
        <button type="button" className="save" onClick={props.onSaveClick}>
          Save Note
        </button>
      ) : null}
    </div>
  );
};

export default NotesItem;
