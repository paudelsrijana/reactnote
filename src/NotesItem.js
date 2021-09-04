const NotesItem = (props) => {
  return (
    <div className="notes">
      <textarea
        rows="2"
        cols="10"
        placeholder=" Note Title"
        value={props.notesTitle}
        onChange={props.onNotesTitleInput}
      />
      <div className="edit-del-btn">
        <button>✍️</button>
        <button>
          <i className="fa fa-trash" />
        </button>
      </div>

      <textarea
        rows="8"
        cols="10"
        placeholder="Note Content"
        value={props.notesContent}
        onChange={props.onNotesDetailInput}
      />
      <div className="note-footer">
        <small>{props.notesDate} </small>
      </div>
      <button className="save" onClick={props.onSaveClick}>
        Save Note
      </button>
    </div>
  );
};

export default NotesItem;
