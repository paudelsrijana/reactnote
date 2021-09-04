const NotesItem = (props) => {
  return (
    <div className="notes">
      <textarea
        placeholder=" Note Title"
        value={props.notesTitle}
        onChange={props.onNotesTitleInput}
      />
      <div className="edit-del-btn">
        <button onChange={props.onEditNoteChange} onClick={props.onEditMode}>
          ✍️
        </button>
        <button onClick={props.onDeleteClick}>
          <i className="fa fa-trash" />
        </button>
      </div>

      <textarea
        placeholder="Note Content"
        value={props.notesContent}
        onChange={props.onNotesDetailInput}
      />
      <div className="note-footer">
        <small>{props.notesDate} </small>
      </div>
      <small>{300 - props.notesContent.length}</small>
      <button className="save" onClick={props.onSaveClick}>
        Save Note
      </button>
    </div>
  );
};

export default NotesItem;
