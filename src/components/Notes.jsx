import React, { Component } from 'react'
import Note from './Note';
import Textarea from './Textarea';

const NOTES_LINK = 'http://localhost:7777/notes';
// const NOTES_LINK = process.env.REACT_APP_NOTES_URL; // Не работает... (потом поразбирайся в этом)

export default class Notes extends Component {

	state = {
		memoes: [],
	}

	loadActualNotes = () => {
		fetch(NOTES_LINK)
			.then(response => response.json())
			.then(memoes => {
				this.setState({ memoes });
			})
	};

	componentDidMount() {
		this.loadActualNotes();
	};
	
	addNote = data => {
		fetch(NOTES_LINK, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({"content": `${data.text}` })
		})
		this.loadActualNotes();
	};

	removeNote = id => {
		fetch(`${NOTES_LINK}/${id}`, {
			method: 'DELETE'
		})
		this.loadActualNotes();
  };

	render() {
		return (
			<React.Fragment>
				<div className="heading-wrapper">
					<h2>Notes</h2>
					<button className="button refresh-button" onClick={this.loadActualNotes}>
						<span className="visually-hidden">Обновить</span>
					</button>
				</div>
				<div className="board">
					{this.state.memoes.map((memo) => <Note memo={memo} onRemove={this.removeNote} key={memo.id} />)}
					<Textarea onAdd={this.addNote} />
				</div>
			</React.Fragment>
		);
	}
}
