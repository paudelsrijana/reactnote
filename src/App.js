import React, { Component } from "react";
import NotesItem from "./NotesItem";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesTitle: "",
      notesDetail: "",
      notesDate: "",
      searchInput: "",
      notes: window.localStorage.getItem("items")
        ? JSON.parse(window.localStorage.getItem("items"))
        : [],

      showNoteAddInput: false,
    };
  }

  handleTitleInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      notesTitle: value,
    });
  };
  handleDetailInputChange = (event) => {
    const value = event.target.value;
    if (value.length <= 300) {
      this.setState({
        notesDetail: value,
      });
    }
  };

  handleSaveClick = (e) => {
    e.preventDefault();
    if (this.state.notesTitle !== "" && this.state.notesDetail !== "") {
      const notesTitle = this.state.notesTitle;
      const notesDetail = this.state.notesDetail;
      const notesDate = new Date();
      const note = {
        notesTitleText: notesTitle,
        notesDetailText: notesDetail,
        notesDateInput: notesDate.toLocaleDateString(),
        editMode: false,
      };
      const notesCloned = this.state.notes.slice();
      notesCloned.push(note);
      this.setState({
        notes: notesCloned,
        notesTitle: "",
        notesDetail: "",
        notesDate: "",
        showNoteAddInput: false,
      });
    }
  };
  handleRemoveNotes = (index) => {
    const notesCloned = this.state.notes.slice();
    notesCloned.splice(index, 1);
    this.setState({
      notes: notesCloned,
    });
    // window.localStorage.setItem("items", JSON.stringify(notesCloned));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.notes !== this.state.notes) {
      window.localStorage.setItem("items", JSON.stringify(this.state.notes));
    }
  }

  toggleAddInput = () => {
    this.setState((state) => ({ showNoteAddInput: !state.showNoteAddInput }));
  };
  handleSearchInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      searchInput: value,
    });
  };
  searchnotes = () => {
    return this.state.notes.filter((note) => {
      return note.notesTitleText
        .toLowerCase()
        .includes(this.state.searchInput.toLowerCase());
    });
  };
  handleEditMode = (index) => {
    const notesCloned = this.state.notes.slice();
    const prevEditMode = notesCloned[index].editMode;
    notesCloned[index].editMode = !prevEditMode;

    this.setState({
      notes: notesCloned,
    });
  };

  handleEditNoteChange = (event, index, key) => {
    const notesCloned = this.state.notes.slice();
    const value = event.target.value;
    notesCloned[index][key] = value;
    this.setState({
      notes: notesCloned,
    });
  };

  render() {
    const filtered = this.searchnotes();
    const noNote = this.state.notes.length === 0;
    return (
      <div className="container">
        <div className="header">
          <div className="logo col-lg-4">
            <img src="logo.png" alt="logo" />
          </div>
          <h4 className="col-lg-4">Add Your New Notes Here: </h4>
          <button
            type="button"
            className="add-click"
            onClick={this.toggleAddInput}
          >
            <i className="fa fa-plus-square add-notes col-lg-4" />
          </button>
        </div>
        {noNote ? null : (
          <div className="search-div">
            <input
              type="text"
              className="form-control "
              placeholder="Search your notes...."
              id="searchInput"
              onChange={this.handleSearchInputChange}
              value={this.state.searchInput}
            />
          </div>
        )}

        {this.state.showNoteAddInput ? (
          <NotesItem
            notesTitle={this.state.notesTitle}
            notesContent={this.state.notesDetail}
            notesDate={this.state.notesDate}
            onNotesTitleInput={this.handleTitleInputChange}
            onNotesDetailInput={this.handleDetailInputChange}
            onSaveClick={this.handleSaveClick}
            showNoteAddInput={this.state.showNoteAddInput}
            readOnly={false}
          />
        ) : null}
        <div className="note-lists">
          {filtered.map((note, i) => {
            return (
              <NotesItem
                key={i}
                notesTitle={note.notesTitleText}
                notesContent={note.notesDetailText}
                notesDate={note.notesDateInput}
                onNotesTitleInput={(e) =>
                  this.handleEditNoteChange(e, i, "notesTitleText")
                }
                onNotesDetailInput={(e) =>
                  this.handleEditNoteChange(e, i, "notesDetailText")
                }
                // onSaveClick={this.handleSaveClick}
                onDeleteClick={() => {
                  this.handleRemoveNotes(i);
                }}
                readOnly={!note.editMode}
                // editMode={note.editMode}
                onEditMode={() => {
                  this.handleEditMode(i);
                }}
                // onEditNoteChange={(e) => {
                //   this.handleEditNoteChange(e, i);
                // }}
              />
            );
          })}
        </div>
        {/* <pre>
          <code>{JSON.stringify(this.state, null, 2)}</code>
        </pre> */}
      </div>
    );
  }
}
export default App;
