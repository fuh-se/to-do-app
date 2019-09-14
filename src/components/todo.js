/* 
Author : Mohd Ahmad Haque
Component : TodoApp
Description : Render user-interface for todoapp
*/

import React from 'react';
import IncompleteTasks from './incomplete';
import CompletedTasks from './complete';
import { Card, Input, Row, Col, Button, message, Divider } from 'antd';
import 'antd/dist/antd.css'; 
import '../App.css';

class TodoApp extends React.Component{

    //Initialize state object
    state = {
        completed_task:["Listen to 'The Wall' from Pink Floyd","Do some coding"],
        pending_task:["Drink atleast three bottles for water","Listen to some cool music"],
        new_task:'',
    }

    //Use callback to manipulate state for this component
    stateHandler = (state,fn) => {
        this.setState({
            ...state,
        },()=> fn())
    }

    //Lifecycle method
    componentDidMount(){
        //Do something on component mount
    }

    //Handler for adding new task
    handleNewTask = (e) => {
        const { new_task } = this.state;
        this.setState((prevState) => ({
            pending_task:[
                ...prevState.pending_task,
                new_task,
            ] 
        }), () =>  message.success("New Task added!"))
       
    } 

    //Handler for setting state for task input
    handleNewTaskInput = (e) => {
        const task = e.target.value;
        this.setState({
            new_task:task,
        });
    }

    //Component's render method
    render(){
        const { completed_task, pending_task } = this.state;
        return(
            <Card className="todo-app" title="Todo List">
                <Row className="task-list" xs={{span:24}} lg={{span:16}} xl={{span:8}}>
                    <IncompleteTasks 
                        header={"Incomplete Tasks"} tasks={completed_task} pendingTasks={pending_task} callback={this.stateHandler} 
                    />
                    <Divider />
                    <CompletedTasks header={"Completed Tasks"}  tasks={completed_task} callback={this.stateHandler} />
                </Row>
                <Divider />
                <Row>
                    <Col className="task-input" lg={{span:20}}>
                        <Input className="add-new-task-input" onChange={this.handleNewTaskInput} />
                    </Col>
                    <Col lg={{span:4}}>
                        <Button 
                            className="todo-app-btn" type="primary"
                            placeholder="Write here to add task" 
                            onClick={this.handleNewTask}
                        >
                            Add Task
                        </Button>
                    </Col>
                </Row>
            </Card>
        )
    }

}

export default TodoApp;