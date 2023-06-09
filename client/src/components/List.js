
import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";




const List = ({ mode }) => {
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
    }, []);

    return (
        <div className="testList">
            <ul>
                {data?.map((item) => (
                    <li key={item.id}>{item.name || item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default List;

