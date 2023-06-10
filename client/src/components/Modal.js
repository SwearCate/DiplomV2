import React, { useEffect, useState } from 'react';
import {useCookies} from "react-cookie";
import ListItem from "./ListItem";
import TaskList from "./TaskList";

const Modal = ({mode, task, getData}) => {
    const [showModal, setShowModal] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const userEmail = cookies.Email;
    const [tasks, setTasks] = useState([]);
    const editMode = mode === "edit" ? true : false
    const [data, setData] = useState({
        user_email: editMode ? task.user_email : cookies.Email,
        title: editMode ? task.title : "",
        progress: editMode ? task.progress : 50,
        date: editMode ? task.date : new Date()
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/123@gg.com`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data); // Check the data in the console
                    setTasks(data);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchData();
    }, []);

    const postData = async () => {
        try{
           const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/`,{
                method: "POST",
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify(data)

            })
            if (response.status === 200) {
                console.log("Работает")
                setShowModal(false)
                setTasks(response.data)  // Update the tasks state with the received data
                getData()  // Call the getData function to refresh the tasks list
            }
        } catch(err){
            console.error(err)
        }
    }

    const editData = async (e) =>{
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
                method: "PUT",
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify(data)
            })
            if(response.status === 200){
                setShowModal(false)
                getData()
            }
        } catch (err){
            console.error(err)
        }
    }

    const deleteItem = async () =>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{

                method: 'DELETE'
            })
            if(response.status === 200){
                getData()
            }
        }catch (err){
            console.error(err)
        }
    }



    const handleChange = (e) =>{
        const {name, value} = e.target

        setData(data => ({
            ...data,
            [name] : value
        }))

        console.log(data)

    }
    const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (

        <div className="overlay">
            <div className="modal">
                <div className="form-title-container">
                    <h3>Let's {mode} your task</h3>
                    <button onClick={() => setShowModal(false)}>X</button>
                </div>

                <form>
                    <input
                     required
                     maxLength={30}
                     placeholder="Your task goes here"
                     name="title"
                     value={data.title}
                     onChange={handleChange}
                    />
                    <br/>
                    <label htmlFor="range">Drag to select your current progress</label>
                    <input
                     required
                     type="range"
                     id="range"
                     min="0"
                     max="100"
                     name="progress"
                     value={data.progress}
                     onChange={handleChange}
                    />
                    <input className={mode} type='submit' onClick={editMode ? editData : postData}/>
                </form>
                <h2>Tasks:</h2>
                <TaskList userEmail={userEmail} />
            </div>
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task}/>}
        </div>
    );
}

export default Modal;
