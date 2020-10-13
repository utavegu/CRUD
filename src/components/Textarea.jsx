import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Textarea extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  state = {
    text: "",
  }
  
  handleChange = ({target}) => {
    this.setState(prevForm => ({...prevForm, [target.name]: target.value}));
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onAdd(this.state);
    this.setState({text: ""});
  }

  render() {
    return (
      <form>

        <textarea 
          className="input-field"
          name="text"
          cols="40"
          rows="8"
          autoFocus
          value={this.state.text}
          onChange={this.handleChange}
        >
        </textarea>

        <button
          className="button submit-button"
          type="submit"
          onClick={this.handleSubmit}
        >
          <span className="visually-hidden">Добавить напоминание</span>
        </button>

			</form>
    )
  }
}
