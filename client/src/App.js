import ListHeader from "./components/ListHeader";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import MyMap from "./components/MyMap";



const App = () => {
    const [cookies, setCookie, removeCookie] = useCookies()
    const authToken = cookies.AuthToken
    const userEmail = cookies.Email
    const [ tasks, setTasks] = useState(null)


    const getData = async () =>{
        try{
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
            const json = await response.json()
            setTasks(json)
        } catch (err){
            console.error(err)
        }
    }

    useEffect(() => {
        if(authToken){
            getData()
        }
    }, []);


    console.log(tasks)

    // сортировка
    const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

    return (
        <div className="app">
            {!authToken && <Auth/>}
            {authToken && (
                <>
                    <MyMap>

                    </MyMap>
                    <ListHeader listName={"Holiday Tick List"} getData={getData} />
                    {sortedTasks?.map((task) => (
                        <ListItem key={task.id} task={task} getData={getData} />
                    ))}
                </>
            )}

        </div>
    );

}

export default App;
