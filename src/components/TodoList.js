import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask'
import Card from './Card';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])
console.log(taskList);
    useEffect(() => {
        // let arr = localStorage.getItem("taskList")
         axios.post('https://lomano.go.yo.fr/api/aideMemoire/get.php', "")
            .then(e => {
                console.log(e.data);
                setTaskList(e.data)
            })

        // if (arr) {
        //     let obj = JSON.parse(arr)
        //     setTaskList(obj)
        // }
    }, [])


    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }

    const get = () => {
        axios.post('https://lomano.go.yo.fr/api/aideMemoire/get.php', "")
            .then(e => console.log(e.data))
    }
    const mockedData = {
        description: "oliver2",
        nom: "jouet",
        categorie: "test@trescal.com"
    };
    const post = () => {
        axios.post('https://lomano.go.yo.fr/api/aideMemoire/post.php', mockedData)
            .then(e => console.log(e.data))

    }

    return (
        <>
            <div className="header text-center">
                <h3>Todo List</h3>
                <button className="btn btn-primary mt-2" onClick={() => setModal(true)} >Create Task</button>
            </div>
            <div className="task-container">
                {taskList && taskList.map((obj, index) => <Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />)}
            </div>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
            <button onClick={get}>click to get !</button>
            <button onClick={post}>click to post !</button>
        </>
    );
};

export default TodoList;