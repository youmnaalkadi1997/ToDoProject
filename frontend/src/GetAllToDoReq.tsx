import axios from "axios";
import {useEffect} from "react";
import './App.css'
import { Link } from "react-router-dom";
import { Client } from '@stomp/stompjs';
import {ToDoStore} from "./ToDoStore.ts";


export default function GetAllToDoReq(){
    const todos = ToDoStore((state) => state.todos);

    useEffect(() => {
        // تحميل أولي للبيانات
        axios.get("/api/todo")
            .then((res) => {ToDoStore.getState().setTodos(res.data);})
            .catch((err) => console.error("Fehler beim Laden:", err));

        // إنشاء اتصال WebSocket
        const client = new Client({
            brokerURL: 'ws://localhost:8080/socket.io/websocket',
            reconnectDelay: 5000, // يعيد الاتصال تلقائيًا عند الانقطاع
            onConnect: () => {
                console.log("WebSocket verbunden ✅");
                client.subscribe('/topic/todos', (message) => {
                    const todos = JSON.parse(message.body);
                    ToDoStore.getState().setTodos(todos);
                });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            }
        });

        client.activate(); // تفعيل الاتصال عند تحميل الكومبوننت

        return () => {
            client.deactivate(); // قطع الاتصال عند الخروج
        };
    }, []);

    return (
        <div className="container">
            <h1>ToDo Liste</h1>
            {todos.length === 0 ? (
                <p>Keine ToDos gefunden.</p>
            ) : (
                todos.map((char) => (
                    <div key={char.id} className="todo-item">
                        <h3>ID: {char.id}</h3>
                        <p><strong>Status:</strong> {char.status}</p>
                        <p><strong>Description:</strong> {char.description}</p>
                        <Link to={`/edit/${char.id}`}>
                            <button>Edit</button>
                        </Link>
                        <Link to={`/delete/${char.id}`}>
                            <button>Delete</button>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
}