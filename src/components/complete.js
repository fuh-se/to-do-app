/* 
Author : Mohd Ahmad Haque
Component : Completed Tasks
Description : Render list of completed tasks
*/

import React from 'react';
import { Checkbox, Row, Button, Col, Card } from 'antd';
import { message } from 'antd';


class CompletedTasks extends React.Component {
    
    //Initialize state object,
    state = {
        completed_task:[],
    }

    //Handler for deleting tasks
    handleDeletedTask = (e,index) => {
        e.preventDefault();
        this.props.tasks.splice(index,1);
        this.setState({
            completed_task:this.props.tasks,
        },()=> this.props.callback(this.state,()=> message.success("Task deleted from list successfully")));
    }
        
    //Render method for list of completed tasks
    RenderCompletedTasks = () => {
        if(this.props.tasks !== undefined  && this.props.tasks.length > 0){
            const taskList = this.props.tasks.map((task,index) => {
                return(
                   <Row key={index}>
                        <Checkbox key={index} defaultChecked={true}><span style={{textDecoration:'line-through'}}>{task}</span></Checkbox>
                        <Col offset={20}>
                            <Button className="todo-app-btn" 
                            size="small"
                            type="secondary"
                            icon="delete" 
                            onClick={(e) => this.handleDeletedTask(e,index)} 
                            /> 
                        </Col>
                   </Row>
                )
            });
            return taskList;
        }
        return <p>All tasks completed for today</p>;
    }

    //Component's render method
    render(){
        return(
            <Card title={this.props.header} bordered={true}>
                <this.RenderCompletedTasks />
            </Card>
        )
    }
}

export default CompletedTasks;