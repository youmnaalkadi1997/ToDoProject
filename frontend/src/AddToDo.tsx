import axios from "axios";
import {type FormEvent, useReducer} from "react";
import './App.css'
import {useNavigate} from "react-router-dom";

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

export default function AddToDo(){

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
    const navigate = useNavigate();

    function addTodo (e: FormEvent<HTMLFormElement> ) {
        e.preventDefault();
        if (!state.description || !state.status) {
            dispatch({ type: "SET_MESSAGE", payload: "Please fill out all fields" , error : true })
            return;
        }
        axios.post("/api/todo" ,{description : state.description, status : state.status})
            .then(r => {
                console.log(r.data);
                dispatch({ type: "SET_MESSAGE", payload: "ToDo has benn added successfully" , error : false})
                setTimeout(() => navigate("/todo"), 2000);
                dispatch({ type: "RESET" })
                }
            )
            .catch(e => {
                console.log(e);
                dispatch({ type: "SET_MESSAGE", payload: "Error, please try again" , error : true})
            })
    }

    return (
        <div className="container">
            <form onSubmit={addTodo}>
                <label> Description
                    <input
                        placeholder="Add Description"
                        value={state.description}
                        onChange={(e) => dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })}
                    />
                </label>
                <label> Status
                    <select value={state.status} onChange={(e) => dispatch({ type: "SET_STATUS", payload: e.target.value })}>
                        <option value="">-- Select status --</option>
                        <option value="OPEN">OPEN</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="DONE">DONE</option>
                    </select>
                </label>
                <button>Submit</button>
            </form>

            {state.message && (
                <p className="message" style={{ color: state.error ? "red" : "lightgreen" }}>
                    {state.message}
                </p>
            )}
        </div>
    )
}