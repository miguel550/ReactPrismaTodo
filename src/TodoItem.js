import React, {Component} from 'react';


class TodoItem extends Component {
    render() {
        return (
        <li>
            <span>
                {this.props.todo}
            </span>
            <button
                onClick={() => this.props.delete()}
            >
                Delete
            </button>
        </li>);
    }
}

export default TodoItem;