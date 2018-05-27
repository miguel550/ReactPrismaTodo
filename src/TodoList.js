import React, {Component} from  'react';
import TodoItem from './TodoItem';
import gql from "graphql-tag";
import { TODOS } from './App';
import {graphql} from 'react-apollo';

const DELETE_TODO = gql`
    mutation DeleteTodo($todo: TodoWhereUniqueInput!){
        deleteTodo(where: $todo){
            id
        }
    }
    
`;
class TodoList extends Component {

    render(){
        return <ul>
            {this.props.todos.map((item) => (
                <TodoItem
                    key={item.id}
                    todo={item.value}
                    delete={this.props.mutate.bind(null, {
                        variables: {
                            todo: {
                                id: item.id
                            }
                        },
                        refetchQueries: [{query: TODOS}]
                    })}
                />
            ))}
        </ul>
    }
}
const TodoListWithMutation = graphql(DELETE_TODO)(TodoList);

export default TodoListWithMutation;