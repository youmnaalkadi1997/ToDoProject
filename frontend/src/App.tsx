import './App.css'
import GetAllToDoReq from "./GetAllToDoReq.tsx";
import NavBar from "./NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import AddToDo from "./AddToDo.tsx";
import EditToDo from "./EditToDo.tsx";
import DeleteToDo from "./DeleteToDo.tsx";
import Login from "./Login.tsx";
import ProtectedRout from "./ProtectedRout.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [user, setUser] = useState<string | undefined | null>(undefined);

    useEffect(() => {
        axios.get('/api/auth/me', { withCredentials: true })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                setUser(null);
                console.log("Not authenticated", error);
            });
    }, []);

    return (
        <>
            <Routes>
                <Route path={"/"} element={<Login />}></Route>
                <Route element={<ProtectedRout user={user}/>}>
                    <Route path={"/myapp"} element={<NavBar/>}></Route>
                </Route>
                <Route path={"/todo"} element={<GetAllToDoReq/>}></Route>
                <Route path={"/add"} element={<AddToDo/>}></Route>
                <Route path="/edit/:id" element={<EditToDo />} />
                <Route path="/delete/:id" element={<DeleteToDo />} />

            </Routes>
        </>
    )
}

export default App
