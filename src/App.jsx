import React, { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";

function App() {
    const [tasks, setTasks] = useState([]);
    const [darkTheme, setDarkTheme] = useState(false);

    const addTask = (title) => {
        const newTask = { id: Date.now(), title, completed: false };
        setTasks([...tasks, newTask]);
    };

    const editTask = (id, title) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, title } : task)));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const toggleCompleted = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const clearTasks = () => {
        setTasks([]);
    };

    const getCompletedTasks = () => tasks.filter((task) => task.completed);
    const getRemainingTasks = () => tasks.filter((task) => !task.completed);

    const toggleTheme = () => {
        setDarkTheme((prevTheme) => !prevTheme);
    };

    return (
        <div
            className={`hero ${
                darkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
            } h-screen flex flex-col items-center justify-center transition-all duration-500`}
        >
            <div className="w-full max-w-md p-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-500">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-semibold tracking-wide text-black">Task Mate</h1>
                    <label className="switch">
                        <input type="checkbox" checked={darkTheme} onChange={toggleTheme} />
                        <span className="slider round"></span>
                    </label>
                </div>
                <AddTaskForm darkTheme={darkTheme} onAddTask={addTask} />
                <div
                    className={`scroll ${
                        darkTheme ? "bg-gray-700" : "bg-gray-100"
                    } p-4 rounded-lg shadow-lg h-96 overflow-y-scroll transition-all duration-500`}
                >
                    <div className="sticky top-0 bg-opacity-80 flex justify-between items-center py-2 border-b">
                        <p>{getRemainingTasks().length} tasks left</p>
                        <button onClick={clearTasks}>Clear all tasks</button>
                    </div>
                    {tasks.length ? (
                        <TaskList
                            tasks={tasks}
                            onEditTask={editTask}
                            onDeleteTask={deleteTask}
                            onToggleCompleted={toggleCompleted}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">No tasks available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
