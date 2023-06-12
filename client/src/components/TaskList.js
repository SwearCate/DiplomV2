import React, { useEffect, useState } from 'react';
import EditTaskForm from "./EditTaskForm";

const TaskList = ({ userEmail }) => {
    const [tasks, setTasks] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleEdit = async (taskId, updatedTask, updatedData) => {
        console.log(updatedTask)
        console.log(updatedData)
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${taskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask),
            });
            if (response.ok) {
                const updatedTaskWithUserEmail = { ...updatedTask, userEmail }; // Add userEmail to the updated task
                const updatedTasks = tasks.map((task) => {
                    if (task.id === taskId) {
                        return updatedTaskWithUserEmail;
                    }
                    return task;
                });
                setTasks(updatedTasks);
            }
        } catch (error) {
            console.error('Error editing task:', error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${taskId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchData(); // Refresh tasks after deletion
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>Progress: {task.progress}</p>
                        <p>Date: {task.date}</p>
                        <EditTaskForm task={task} onSave={(updatedTask) => handleEdit(task.id, updatedTask)} userEmail={userEmail} />
                        <button className="modal-delete" onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
