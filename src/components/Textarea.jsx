import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Textarea extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  state = {
    text: "",
  }

  constructor(props) {
    super(props);
    this.addNote = props.onAdd;
  }
  
  handleChange = ({target}) => {
    this.setState(prevForm => ({...prevForm, [target.name]: target.value}));
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.addNote(this.state);
  }

  render() {
    return (
      <form>

        <textarea 
          className="input-field"
          name="text"
          cols="40"
          rows="8"
          value={this.state.text}
          onChange={this.handleChange}
        >
        </textarea>

        <button
          className="submit-button"
          type="submit"
          onClick={this.handleSubmit}
        >
          Добавить напоминание
        </button>

			</form>
    )
  }
}
