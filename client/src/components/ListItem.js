import { useState } from "react";
import TickIcon from "./TickIcon";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import {useCookies} from "react-cookie";


const ListItem = ({ task, employee, getData }) => {
    const [showModal, setShowModal] = useState(false)
    const [tasks, setTasks] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies();
    const authToken = cookies.AuthToken;
    const userEmail = cookies.Email;


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
    console.log(task)
    return (
        <li className='list-item'>

            <div className='info-container'>
                <TickIcon/>
                <p className='task-title'>{task.title}</p>
            <ProgressBar/>
            </div>

            <div className='button-container'>
                <button className='edit' onClick={() => setShowModal(true)}>Edit</button>
                <button className='delete' onClick={deleteItem}>DELETE</button>
            </div>
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task}/>}
        </li>
    );
}

export default ListItem;
