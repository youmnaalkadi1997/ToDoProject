import './App.css'
import GetAllToDoReq from "./GetAllToDoReq.tsx";
import NavBar from "./NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import AddToDo from "./AddToDo.tsx";
import EditToDo from "./EditToDo.tsx";
import DeleteToDo from "./DeleteToDo.tsx";

function App() {

    return (
        <>
            <Routes>
                <Route path={"/todo"} element={<GetAllToDoReq/>}></Route>
                <Route path={"/add"} element={<AddToDo/>}></Route>
                <Route path={"/"} element={<NavBar/>}></Route>
                <Route path="/edit/:id" element={<EditToDo />} />
                <Route path="/delete/:id" element={<DeleteToDo />} />
            </Routes>
        </>
    )
}

export default App
