import {useState} from "react";
import {useCookies} from "react-cookie";
import ModalTasks from "./ModalTasks";

const Header = (task, getData) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    // modal create task
    const [modalActive, setModalActive] = useState(true)
    // modal tasks
    const [showModal, setShowModal] = useState(true);

    const signOut = () =>{
        removeCookie('Email')
        removeCookie('AuthToken')
        window.location.reload()
    }

    return (
        <div>
            <div className="header-button-container">
                <button className="tasks" onClick={() => setShowModal(true)}></button>
                <button className="signout" onClick={signOut}></button>

            </div>
        </div>
    );
}
export default Header;
