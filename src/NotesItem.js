const NotesItem = (props) => {
  return (
    <div className="notes">
      <input
        placeholder=" Note Title"
        value={props.notesTitle}
        onChange={props.onNotesTitleInput}
      />
      <textarea
        placeholder="Note Content"
        value={props.notesContent}
        onChange={props.onNotesDetailInput}
      />
      <div className="edit-del-btn">
        <button>✍️</button>

        <button onClick={props.onDeleteClick}>
          <i className="fa fa-trash" />
        </button>
      </div>

      <div className="note-footer">
        <small className="notes-date">{props.notesDate} </small>
        <p className="remaining-length">
          {300 - props.notesContent.length + " Remaining"}
        </p>
      </div>

      <button className="save" onClick={props.onSaveClick}>
        Save Note
      </button>
    </div>
  );
};

export default NotesItem;
