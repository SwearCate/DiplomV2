import React from "react";
import "./modal.css";
import ReactDOM from "react-dom";
import {PropsWithChildren} from "react";
import {useState} from "react";
import ListItem from "./ListItem";
import {useCookies} from "react-cookie";
import {useEffect} from "react";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";

interface IModalProps {
    active: boolean;
    title: string;
    onSubmit: () => void;
    onClose: () => void;
}


const ModalTasks = ({ mode,active, title, onSubmit, onClose, children, task}: PropsWithChildren) => {
    const [cookies, setCookie, removeCookie] = useCookies()
    const authToken = cookies.AuthToken
    const userEmail = cookies.Email
    const [ employee, setEmployees] = useState(null)
    const [tasks, setTasks] = useState(null);
    const [data, setData] = useState(null);



    const getData = async () => {
        console.log('fetchData called, mode:', mode);
        try {
            let response;
            if (mode === 'tasks') {
                console.log('fetching tasks');
                response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
                console.log('response:', response);
            } else if (mode === 'employees') {
                console.log('fetching employees');
                response = await fetch(`${process.env.REACT_APP_SERVERURL}/employees/${userEmail}`);
                console.log('response:', response);
            }
            const json = await response.json();
            setData(json); // set data state variable with data from API
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        if (authToken) {
            getData();
        }
    }, [mode]); // add mode to dependency array

    console.log(employee)

    if (!active){
        return null;
    }




    const sortedTasks = employee?.sort((a,b) => new Date(a.date) - new Date(b.date))

    return ReactDOM.createPortal((
        <div className="modalTasks">
            <div className="modal-content">
                <div className="modal-header">
                    <div className="modal-title">{employee?.name}</div>
                </div>
                <div className="modal-body">{children}
                    {data?.map((item) => (
                        <li key={item.id}>{item.name || item.title}</li>
                    ))}
                </div>
                <div className='info-container'>
                    <TickIcon/>
                    <p className='task-title'>{employee?.name}</p>
                    <ProgressBar/>
                </div>
                <div className="modal-footer">
                    <button>Подтвердить</button>
                    <button>Отмена</button>
                    <button onClick={onClose}>Закрой</button>
                </div>
            </div>

        </div>
    ), document.getElementById('root'));
};

export default ModalTasks