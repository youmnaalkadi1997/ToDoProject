import { create } from 'zustand';

type ToDo = {
    id: string;
    description: string;
    status: string;
};

type ToDoStore = {
    todos: ToDo[];
    setTodos: (todos: ToDo[]) => void;
};

export const ToDoStore = create<ToDoStore>((set) => ({
    todos: [],
    setTodos: (todos) => set(() => ({ todos })),

}));
