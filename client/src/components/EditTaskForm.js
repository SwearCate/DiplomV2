import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const EditTaskForm = ({ task, onSave }) => {
    const [title, setTitle] = useState(task.title || '');
    const [progress, setProgress] = useState(task.progress);
    const [date, setDate] = useState(task.date);
    const [cookies] = useCookies(['Email']); // Specify the cookie name 'Email' in the useCookies hook

    const userEmail = cookies.Email;

    const handleSave = (e) => {
        e.preventDefault();
        const updatedTask = {
            id: task.id,
            title,
            progress,
            date : date,
            user_email: userEmail,
        };
        onSave(updatedTask);
    };


    return (
        <form onSubmit={handleSave}>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                Progress:
                <input
                    required
                    type="range"
                    id="range"
                    min="0"
                    max="100"
                    name="progress"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                />
            </label>
            <button className="modal-save" type="submit">Save</button>
        </form>
    );
};

export default EditTaskForm;
