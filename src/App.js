import React, { Component } from "react";
import NotesItem from "./NotesItem";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notesTitle: "",
      notesDetail: "",
      notesDate: "",
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
    this.setState({
      notesDetail: value,
    });
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.notes !== this.state.notes) {
      window.localStorage.setItem("items", JSON.stringify(this.state.notes));
    }
  }

  toggleAddInput = () => {
    this.setState((state) => ({ showNoteAddInput: !state.showNoteAddInput }));
  };

  render() {
    return (
      <div className="container">
        <form>
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
          {this.state.showNoteAddInput ? (
            <NotesItem
              notesTitle={this.state.notesTitle}
              notesContent={this.state.notesDetail}
              notesDate={this.state.notesDate}
              onNotesTitleInput={this.handleTitleInputChange}
              onNotesDetailInput={this.handleDetailInputChange}
              onSaveClick={this.handleSaveClick}
            />
          ) : null}
          <div className="note-lists">
            {this.state.notes.map((note, i) => {
              return (
                <NotesItem
                  key={i}
                  notesTitle={note.notesTitleText}
                  notesContent={note.notesDetailText}
                  notesDate={note.notesDateInput}
                  // onNotesTitleInput={this.handleTitleInputChange}
                  // onNotesDetailInput={this.handleDetailInputChange}
                  // onSaveClick={this.handleSaveClick}
                />
              );
            })}
          </div>
        </form>
      </div>
    );
  }
}
export default App;
