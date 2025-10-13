import axios from "axios";
import {useEffect, useReducer} from "react";
import { useParams, useNavigate } from "react-router-dom";

type State = {
    description: string;
    status: string;
    message: string;
    error: boolean;
};

type Action =
    | { type: "SET_DESCRIPTION"; payload: string }
    | { type: "SET_STATUS"; payload: string }
    | { type: "SET_MESSAGE"; payload: string; error?: boolean }
    | { type: "RESET" };

export default function EditToDo() {
    const { id } = useParams();
    const navigate = useNavigate();

    const initialState = {
        description: "",
        status: "",
        message: "",
        error: false
    };

    function reducer(state: State, action: Action) {
        switch (action.type) {
            case "SET_DESCRIPTION":
                return { ...state, description: action.payload };
            case "SET_STATUS":
                return { ...state, status: action.payload };
            case "SET_MESSAGE":
                return {
                    ...state,
                    message: action.payload,
                    error: action.error ?? false, // ← safer than || false
                };
            case "RESET":
                return initialState;

        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios.get(`/api/todo/${id}`)
            .then(res => {
                dispatch({ type: "SET_DESCRIPTION", payload: res.data.description });
                dispatch({ type: "SET_STATUS", payload: res.data.status })
            })
            .catch(err => console.error(err));
    }, [id]);

    function updateToDo(e: React.FormEvent) {
        e.preventDefault();
        axios.put(`/api/todo/${id}`, {
            description: state.description,
            status: state.status
        })
          .then(() => {
            dispatch({ type: "SET_MESSAGE", payload: "ToDo erfolgreich aktualisiert" })
            setTimeout(() => navigate("/todo"), 1500); // zurück zur Liste
        })
            .catch(() =>  dispatch({ type: "SET_MESSAGE", payload: "Fehler beim Aktualisieren" }))
    }


    return (
        <div className="container">
            <h2>Edit ToDo</h2>
            <form onSubmit={updateToDo}>
                <label>Description
                    <input value={state.description} onChange={(e) => dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })} />
                </label>
                <label>Status
                    <select value={state.status} onChange={(e) => dispatch({ type: "SET_STATUS", payload: e.target.value })}>
                        <option value="">-- Select --</option>
                        <option value="OPEN">OPEN</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="DONE">DONE</option>
                    </select>
                </label>
                <button>Save Changes</button>
            </form>
            {state.message && <p>{state.message}</p>}
        </div>
    );
}
