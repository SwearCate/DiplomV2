import React from "react";
import "./modal.css";
import ReactDOM from "react-dom";
import {PropsWithChildren} from "react";
import {useState} from "react";
import ListItem from "./ListItem";
import {useCookies} from "react-cookie";
import {useEffect} from "react";

interface IModalProps {
    active: boolean;
    title: string;
    onSubmit: () => void;
    onClose: () => void;
}


const ModalTasks = ({active, title, onSubmit, onClose, children, task}: PropsWithChildren) => {
    const [cookies, setCookie, removeCookie] = useCookies()
    const authToken = cookies.AuthToken
    const userEmail = cookies.Email
    const [ employee, setEmployees] = useState(null)

    const getData = async () =>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/employees/${userEmail}`)
            const json = await response.json()
            setEmployees(json)
        } catch (err){
            console.error(err)
        }
    }


    useEffect(() => {
        if(authToken){
            getData()
        }
    }, []);

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
                    {sortedTasks?.map((employee) => (
                        <ListItem key={employee.id} employee={employee} getData={getData} />
                    ))}
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