/* 
Author : Mohd Ahmad Haque
Component : InCompleteTasks
Description : Render list of incompleted tasks
*/

import React from 'react';
import { Col, Row, Button, Card, Checkbox, message } from 'antd';


class IncompleteTasks extends React.Component {

    //Initialze state object
    state = {
        checked_tasks:[],
    }

    //Handler for checked tasks
    handleTaskCheck = (task,index,v) => {
        const { target, value } = v;
        this.setState((prevState) => ({
            [target]:value,
            pending_task:[
                ...prevState.checked_tasks,
                task,
            ]
        }), () => this.props.callback(this.state.pending_task,() => {}))
    }

    //Handler for completed tasks
    handleCompletedTask = (e,task,index) => {
        e.preventDefault();
        const completed_task = this.props.tasks.push(task);
        // const pending_task = this.props.pendingTasks.splice(index,1);
        const pending_task = this.props.pendingTasks.filter((currentTask,index) => { return currentTask !== task})
        if(this.props.pendingTasks.length > 0 && completed_task && pending_task){
            this.setState({
                completed_task:this.props.tasks,
                pending_task:pending_task,
            },() => this.props.callback(this.state,() => message.success("Task added to complete list successfully")))
        }   
    }

    //Render List of incompleted tasks
    RenderIncompletedTasks = () => {
        if(this.props.pendingTasks !== undefined && this.props.pendingTasks.length > 0){
            const taskList = this.props.pendingTasks.map((task,index) => {
                return(
                   <Row className="todo-list" key={index}>
                        <Checkbox key={index} onChange={(v) => this.handleTaskCheck(task,index,v)}><span>{task}</span></Checkbox>
                        <Col offset={20}>
                            <Button 
                            className="todo-app-btn" 
                            size="small"
                            type="secondary" 
                            icon="check-circle" 
                            onClick={(e) => this.handleCompletedTask(e,task,index)}
                            />
                        </Col>
                   </Row>
                )
            });
            return taskList;
        }
        else{
            return <p>No tasks left today :)</p>
        }
    }
 
    componentDidMount(){
       //Do something on mount
    }

    //Render method for component
    render(){
        return(
            <Card title={this.props.header} bordered={true}>
                <this.RenderIncompletedTasks />
            </Card>
        )
    }
}

export default IncompleteTasks;