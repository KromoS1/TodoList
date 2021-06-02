import React from 'react';
import './App.css';
import TodoList from "./Components/TodoList";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddItemForm} from "./Components/AddItemForm";
import {actionsTodoList} from "./Tests/TodoListReducers";
import {actionsTasks} from "./Tests/TaskReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
};
export type TaskStateType = {
    [key: string]: TaskType[]
}
export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
};

export function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType,TodoListType[]>(state=> state.todoLists);
    const tasks = useSelector<AppRootStateType,TaskStateType>(state=> state.tasks);
    const dispatch = useDispatch();

    // const todoListId_1 = v1();
    // const todoListId_2 = v1();
    // const [todoList, dispatchToTodoList] = useReducer(TodoListReducers,[
    //     {id: todoListId_1, title: "What to learn", filter: "all"},
    //     {id: todoListId_2, title: "What to buy", filter: "all"}
    // ]);
    // const [tasks, dispatchToTask] = useReducer(TaskReducer,{
    //     [todoListId_1]: [{id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest APi", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false}
    //     ],
    //     [todoListId_2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "Meat", isDone: true},
    //         {id: v1(), title: "Beer", isDone: false},
    //         {id: v1(), title: "Cheese", isDone: false}
    //     ]
    // });

    const getTaskForTodoList = (todoList: TodoListType) => { // UI
        switch (todoList.filter) {
            case "active" :
                return tasks[todoList.id].filter(t => !t.isDone);
            case "completed" :
                return tasks[todoList.id].filter(t => t.isDone);
            default:
                return tasks[todoList.id]
        }
    };

    const addTask = (title: string, todoListID: string) => {
        dispatch(actionsTasks.addTaskAC(title,todoListID));
    };
    const removeTask = (id: string, todoListID: string) => {
        dispatch(actionsTasks.removeTaskAC(id,todoListID));
    };
    const changeTaskStatus = (id: string, isDone: boolean, todoListID: string) => {
        dispatch(actionsTasks.changeTaskStatusAC(id,isDone,todoListID));
    };
    const changeTaskTitle = (id: string, newTitle: string, todoListID: string) => {
        dispatch(actionsTasks.changeTaskTitleAC(id,newTitle,todoListID));
    };

    //todolist
    const changeTaskFilter = (value: FilterValuesType, todoListID: string) => {
        dispatch(actionsTodoList.changeTodoListFilterAC(todoListID,value));
    };
    const changeTodoListTitle = (todoListID: string, title: string) => {
        dispatch(actionsTodoList.changeTodoListTitleAC(todoListID,title));
    }
    const addTodoList = (title: string) => {
        const action = actionsTodoList.addTodoListAC(title);
        dispatch(action);
    };
    const removeTodoList = (todoListID: string) => {
        dispatch(actionsTodoList.removeTodoListAC(todoListID));
    };

    const todoListsComponent = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={5} className={"paper_style"}>
                    <TodoList title={tl.title}
                              todoListID={tl.id}
                              tasks={getTaskForTodoList(tl)}
                              filter={tl.filter}
                              removeTask={removeTask}
                              changeFilter={changeTaskFilter}
                              addTask={addTask}
                              changeCheckboxStatus={changeTaskStatus}
                              removeTodoList={removeTodoList}
                              changeTaskTitle={changeTaskTitle}
                              changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div>
            <AppBar position="static">
                <Toolbar style={{justifyContent:"space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListsComponent}
                </Grid>
            </Container>
        </div>
    );
}