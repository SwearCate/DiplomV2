import Modal from "./Modal";
import { useState } from "react";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName }) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState("create");
    const [task, setTasks] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/:userEmail`);
            if (response.status === 200) {
                const data = await response.json();
                setTasks(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleClickTasks = () => {
        setShowModal(true);
        setMode("create");
    };

    const signOut = () => {
        removeCookie("Email");
        removeCookie("AuthToken");
        window.location.reload();
    };

    return (
        <div className="list-header">
            <div className="button-container">
                <button className="tasks" onClick={handleClickTasks}></button>
                <button className="signout" onClick={signOut}></button>
            </div>
            {showModal && (
                <Modal mode={mode} setShowModal={setShowModal} task={task} getData={getData} />
            )}
        </div>
    );
};

export default ListHeader;
