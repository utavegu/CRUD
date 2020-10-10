import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Note extends Component {
  static propTypes = {
    onRemove: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.handleRemove = props.onRemove;
  }

  render() {
    return (
      <div className="memo">
        {this.props.memo.content}
        <button onClick={() => this.handleRemove(this.props.memo.id)}>Удалить</button>
      </div>
    )
  }
}
