import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DeleteToDo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.delete(`/api/todo/${id}`)
            .then(() => {
                setMessage("ToDo gelöscht");
                setTimeout(() => navigate("/todo"), 2000);
            })
            .catch(() => {
                setMessage("Fehler beim Löschen");
            });
    }, [id, navigate]);

    return (
        <div className="container">
            <h2>Deleting ToDo...</h2>
            <p>{message}</p>
        </div>
    );
}
