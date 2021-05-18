import React, {useState} from 'react';
import './App.css';
import TodoList from "./Components/TodoList";
import {v1} from "uuid";
import {
    AppBar,
    Button,
    Container, createStyles,
    Grid,
    IconButton,
    makeStyles,
    MenuItem,
    Paper, Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddItemForm} from "./Components/AddItemForm";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
};
type TaskStateType = {
    [key: string]: TaskType[]
}
export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
};

function App() {
    const todoListId_1 = v1();
    const todoListId_2 = v1();
    const [todoList, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ]);
    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest APi", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Cheese", isDone: false}
        ]
    });

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
        const newTask = {id: v1(), title: title, isDone: false}
        tasks[todoListID] = [newTask, ...tasks[todoListID]];
        setTasks({...tasks});
    };
    const removeTask = (id: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== id)});
    };
    const changeTaskStatus = (id: string, isDone: boolean, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === id ? {...t, isDone: isDone} : t)
        setTasks({...tasks});
    };
    const changeTaskTitle = (id: string, newTitle: string, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === id ? {...t, title: newTitle} : t)
        });
    };

    //todolist
    const changeTaskFilter = (value: FilterValuesType, todoListID: string) => {
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl));
    };
    const changeTodoListTitle = (todoListID: string, title: string) => {
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, title: title} : tl));
    }
    const addTodoList = (title: string) => {
        const newTodoList: TodoListType = {id: v1(), title: title, filter: "all"};
        setTodoList([...todoList, newTodoList]);
        setTasks({...tasks, [newTodoList.id]: []})
    };
    const removeTodoList = (todoListID: string) => {
        setTodoList(todoList.filter(tl => tl.id !== todoListID));
        delete tasks[todoListID];
    };


    const todoListsComponent = todoList.map(tl => {
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

export default App;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            overflow: 'hidden',
            padding: theme.spacing(0, 3),
        },
        paper: {
            maxWidth: 400,
            margin: `${theme.spacing(1)}px auto`,
            padding: theme.spacing(2),
        },
    }),
);

