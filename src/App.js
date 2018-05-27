import React from 'react';
import './App.css';
import TodoList from './TodoList';
import { ApolloProvider, Query, Mutation } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

export const TODOS = gql`
    {
        todoes {
            id
            value
        }
    }
`;

const CREATE_TODO = gql`
    mutation CreateTodo($todo: TodoCreateInput!){
        createTodo(data: $todo){
            id
            value
        }
    }
`;


const client = new ApolloClient({
  uri: "https://us1.prisma.sh/miguel-almonte/todo-backend/dev"
});
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todos: []
        }
    }
    addTodo(value){
        this.setState({
            todos: [...this.state.todos, value]
        });

    }
    render() {
        return (<ApolloProvider client={client}>
            <h1>Todo App</h1>
            <Mutation mutation={CREATE_TODO} >
            {createTodo => (
            <input
                type="text"
                placeholder="Agregar todo..."
                onKeyPress={
                    event => {
                        if(event.key === "Enter"){
                            createTodo({
                                variables: {
                                    todo: {
                                        value: event.target.value
                                    }
                                },
                                refetchQueries: [{query: TODOS}]
                            });
                            event.target.value = "";
                        }
                    }
                }
            />)}
                </Mutation>

                <Query query={TODOS}>
                    {({loading, error, data}) => {
                        if (error) {
                        return <div>ERROR</div>
                        }
                        if(loading) {
                        return <div> Loading... </div>
                        }
                    return (
                    <TodoList
                        todos={data.todoes}
                    />
                        );
                    }}
                </Query>
            </ApolloProvider>);
    }
}


export default App;
