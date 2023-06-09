
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";
import {PropsWithChildren} from "react";
import TickIcon from "./TickIcon";
import ProgressBar from "./ProgressBar";




const List = ({ mode, active, onClose, children, task }: PropsWithChildren) => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const authToken = cookies.AuthToken;
    const userEmail = cookies.Email;
    const [employee, setEmployees] = useState(null);
    const [tasks, setTasks] = useState(null);

    const [data, setData] = useState(null);

    const getData = async () => {
        console.log('fetchData called');
        try {
            let response;
            if (mode === 'tasks') {
                response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
            } else if (mode === 'employees') {
                response = await fetch(`${process.env.REACT_APP_SERVERURL}/employees/${userEmail}`);
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


    return (
        <div className="list-item">
            <ul>
                {data?.map((item) => (
                    <li key={item.id}>{item.name || item.title}</li>
                ))}
            </ul>
            <div className='info-container'>
                <TickIcon/>
                <p className='task-title'>{employee?.name}</p>
                <ProgressBar/>
            </div>
        </div>
    );
};

export default List;

