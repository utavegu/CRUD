import React, { Component } from 'react'
import Note from './Note';
import Textarea from './Textarea';

const NOTES_LINK = 'http://localhost:7777/notes';
// const NOTES_LINK = process.env.REACT_APP_NOTES_URL; // Не работает...

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
	}

	removeNote = () => {
    return fetch(`${NOTES_LINK}/5`, {
        method: 'DELETE'
    });
	};
	
	addNote(data) {
		return fetch(NOTES_LINK, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({"content": `${data.text}` })
		});
	}


	componentDidMount() {
		this.loadActualNotes();
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('Предыдущее состояние:')
		console.log(prevState.memoes);
		console.log('Текущее состояние:')
		console.log(this.state.memoes);
		if (this.state.memoes !== prevState.memoes) {
			// this.loadActualNotes();
			/*
			ВОПРОС
			Вот тут я что-то заглох и вынужден просить подсказку... Не смотря на то, что вроде по инструкции всё делаю. 
			Если я расскоментирую this.loadActualNotes(), то он всё равно уходит в бесконечный цикл запроса актуальных данных на сервер. Вместо того, чтобы проверить, что текущее и предыдущее состояние не совпадают и обновить данные (то поведение, которое я ожидаю)
			*/
		}
	}

	
	handleRemove = id => {
		return fetch(`${NOTES_LINK}/${id}`, {
			method: 'delete'
	})
  }

	render() {
		return (
			<React.Fragment>
				<h2>Notes</h2>
				<button onClick={this.loadActualNotes}>Обновить</button>
				<div className="board">
					{this.state.memoes.map((memo) => <Note memo={memo} onRemove={this.handleRemove} key={memo.id} />)}
					<Textarea onAdd={this.addNote} />
				</div>
			</React.Fragment>
		);
	}
}
