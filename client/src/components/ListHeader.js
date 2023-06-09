import Modal from "./Modal";
import {useState} from "react";
import {useCookies} from "react-cookie";

const ListHeader = ({listName, getData}) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const [showModal, setShowModal] = useState(false)


    const signOut = () =>{
        removeCookie('Email')
        removeCookie('AuthToken')
        window.location.reload()
    }
    return (
        <div className="list-header">
            <div className="button-container">
                <button className="tasks" onClick={() => setShowModal(true)}></button>
                <button className="signout" onClick={signOut}></button>
            </div>
            {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData} />}
        </div>
    );
}

export default ListHeader;
