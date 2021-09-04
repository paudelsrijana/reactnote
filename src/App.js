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
        : [
            {
              notesTitleText: "hello",
              notesDetailText: "hy",
              notesDate: "12/12/1234",
            },
          ],
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
  handleDateInputChange = (event) => {
    const date = new Date();
    this.setState({
      notesDate: date.toLocaleDateString(),
    });
  };
  handleSaveClick = (e) => {
    e.preventDefault();
    if (this.state.notesTitle !== "" && this.state.notesDetail !== "") {
      const notesTitle = this.state.notesTitle;
      const notesDetail = this.state.notesDetail;
      const notesDate = this.state.notesDate;
      const note = {
        notesTitleText: notesTitle,
        notesDetailText: notesDetail,
        notesDateInput: notesDate,
      };
      const notesCloned = this.state.notes.slice();
      notesCloned.push(note);
      window.localStorage.setItem("items", JSON.stringify(notesCloned));
      this.setState({
        notes: notesCloned,
        notesTitle: "",
        notesDetail: "",
        notesDate: "",
      });
    }
    console.log("hey");
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
            <button className="add-click">
              <i className="fa fa-plus-square add-notes col-lg-4" />
            </button>
          </div>
          <div className="note-lists">
            {this.state.notes.map((note, i) => {
              return (
                <NotesItem
                  key={i}
                  notesTitle={note.notesTitleText}
                  notesContent={note.notesDetailText}
                  notesDate={note.notesDateInput}
                  onNotesTitleInput={this.handleTitleInputChange}
                  onNotesDetailInput={this.handleDetailInputChange}
                  onNotesDate={this.handleDateInputChange}
                  onSaveClick={this.handleSaveClick}
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
