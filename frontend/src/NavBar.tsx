import { useNavigate } from 'react-router-dom';
import './App.css'


export default function NavBar() {

    const nav = useNavigate();
    function getAll (){
        nav("/todo")
    }
    function AddTodo (){
        nav("/add")
    }

    function logout() {
        window.open('/logout', '_self');
    }


    return(
        <>
            <div className="container">
            <button onClick={getAll}>TODO list</button>
            <button onClick={AddTodo}>Add TODO</button>
            <button onClick={logout}>Logout</button>
            </div>
        </>
    )
}