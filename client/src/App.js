import ListHeader from "./components/ListHeader";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import MyMap from "./components/MyMap";
import Header from "./components/Header";
import ModalTasks from "./components/ModalTasks";
import List from "./components/List"
import TaskList from "./components/TaskList";





const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const authToken = cookies.AuthToken;
    const userEmail = cookies.Email;
    const [tasks, setTasks] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [employees, setEmployees] = useState(null);
    const [mode, setMode] = useState('employees'); // add state variable for mode

    const closeModal = () => {
        setShowModal(false);
    };

    const getData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
            const json = await response.json();
            setTasks(json);
        } catch (err) {
            console.error(err);
        }
    };

    const handleClick = () => {
        setShowModal(true)
        setMode('employees')
        console.log('click')
    };


    useEffect(() => {
        if (authToken) {
            getData();
        }
    }, []);

    console.log(tasks);

    // сортировка
    const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="app">
            {!authToken && <Auth />}
            {authToken && (
                <>
                    <MyMap></MyMap>
                    <button
                        onClick={handleClick}
                        className="employees-button"
                        />
                    <ListHeader listName={"Задания"} getData={getData} />
                    <p>Welcome Привет! {userEmail}</p>
                    <ModalTasks mode={mode} title="Удаление" active={showModal} onClose={closeModal}>
                        <div></div>
                    </ModalTasks>
                </>
            )}
        </div>
    );

};

export default App;

