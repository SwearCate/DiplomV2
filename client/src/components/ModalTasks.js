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
    const [employees] = useState([]);
    const [tasks, setTasks] = useState(null);
    const [data, setData] = useState(null);
    const [name, setName] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [editingEmployeeId, setEditingEmployeeId] = useState(null);



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

    const postData = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVERURL}/employees/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_email: userEmail,
                        employee_email: employeeEmail,
                        name: name,
                        phone: phone,
                        location: location,
                    }),
                }
            );

            if (response.status === 200) {
                console.log("Сотрудник успешно добавлен");
                onSubmit();
                await getData();
            } else {
                console.error("Ошибка добавления сотрудника");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const updateEmployee = async (employeeId) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVERURL}/employees/${employeeId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        phone: phone,
                        location: location,
                    }),
                }
            );

            if (response.status === 200) {
                console.log("Данные сотрудника успешно обновлены");
                onSubmit();
                await getData();
            } else {
                console.error("Ошибка обновления данных сотрудника");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const startEditing = (employeeId) => {
        const employee = data.find((emp) => emp.id === employeeId);
        setName(employee.name);
        setPhone(employee.phone);
        setLocation(employee.location);
        setEditingEmployeeId(employeeId);
    };


    const cancelEditing = () => {
        setName("");
        setPhone("");
        setLocation("");
        setEditingEmployeeId(null);
    };

    const deleteEmployee = async (employeeId) => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVERURL}/employees/${employeeId}`,
                {
                    method: "DELETE",
                }
            );

            if (response.status === 200) {
                console.log("Сотрудник успешно удален");
                await getData();
            } else {
                console.error("Ошибка удаления сотрудника");
            }
        } catch (err) {
            console.error(err);
        }
    };


    const [startIndex, setStartIndex] = useState(0);

    const handleNextClick = () => {
        setStartIndex((startIndex + 3) % data.length);
        const listElement = document.querySelector('.modal-body');
        listElement.classList.add('animate');
        listElement.addEventListener('animationend', () => {
            listElement.classList.remove('animate');
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateEmployee(editingEmployeeId);
        setName("");
        setPhone("");
        setLocation("");
        setEditingEmployeeId(null);
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
                    <div className="modal-title">
                        <button onClick={onClose} className="back-button"></button>
                        <span className="modal-hud">
                            <p>Сотрудники</p></span>
                    </div>
                </div>
                <button onClick={handleNextClick} className="next-button"></button>
                <div className="modal-body">{children}
                    {data.slice(startIndex, startIndex + 3).map((item) => (
                        <div key={item.id} className="modal-employee">
                            <br></br>
                            {editingEmployeeId === item.id ? (
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        Имя:
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </label>
                                    <label>
                                        Телефон:
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </label>
                                    <label>
                                        Место:
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </label>

                                    <button className="saveButton" type="submit"></button>
                                </form>

                            ) : (
                                <>
                                    <p>Имя: {item.name}</p>
                                    <p>Телефон: {item.phone}</p>
                                    <p>Место: {item.location}</p>
                                    <button className="editButton" onClick={() => startEditing(item.id)}/>
                                    <button className="deleteButton" onClick={() => deleteEmployee(item.id)}>
                                    </button>
                                </>
                            )}
                        </div>
                    ))}

                </div>
                <div className="modal-footer">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            postData();
                        }}
                    >
                        <label>
                            Имя:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label>
                                Почта
                                <input
                                    type="email"
                                    value={employeeEmail}
                                    onChange={(e) => setEmployeeEmail(e.target.value)}/>
                            </label>
                        </label>
                        <label>
                            Телефон:
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </label>
                        <label>
                            Место:
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </label>
                        <button type="submit">Добавить сотрудника</button>

                    </form>
                </div>
            </div>

        </div>
    ), document.getElementById('root'));
};

export default ModalTasks