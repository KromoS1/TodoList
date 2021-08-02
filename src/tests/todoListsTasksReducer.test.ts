
// import {actionsTasks, TaskReducer} from "./TaskReducer";
// import {actionsTodoList, TodoListReducers} from "./TodoListReducers";
// import {v1} from "uuid";
// import {TaskStateType, TodoListType} from "../AppWithRedux";
//
// test('ids should be equals', () => {
//     const startTasksState: TaskStateType = {};
//     const startTodolistsState: TodoListType[] = [];
//
//     const action = actionsTodoList.addTodoListAC("new todolist");
//     const endTasksState = TaskReducer(startTasksState, action)
//     const endTodolistsState = TodoListReducers(startTodolistsState,action)
//
//     const keys = Object.keys(endTasksState);
//     const idFromTasks = keys[0];
//     const idFromTodolists = endTodolistsState[0].id;
//
//     expect(idFromTasks).toBe(action.idTodoList);
//     expect(idFromTodolists).toBe(action.idTodoList);
// });
//
// test('remove todolist should be correct delete array task', () => {
//     let todolistId1 = "todolistId1";
//     let todolistId2 = "todolistId2";
//     const startStateTodoList: Array<TodoListType> = [
//         {id: todolistId1, title: "What to learn", filter: "all"},
//         {id: todolistId2, title: "What to buy", filter: "all"}
//     ]
//     const startStateTask: TaskStateType = {
//         "todolistId1": [
//             { id: "1", title: "CSS", isDone: false },
//             { id: "2", title: "JS", isDone: true },
//             { id: "3", title: "React", isDone: false }
//         ],
//         "todolistId2": [
//             { id: "1", title: "bread", isDone: false },
//             { id: "2", title: "milk", isDone: true },
//             { id: "3", title: "tea", isDone: false }
//         ]
//     };
//
//     const endTasksState = TaskReducer(startStateTask,actionsTasks.removeTodoListAC(todolistId2))
//     const endTodolistsState = TodoListReducers(startStateTodoList,actionsTodoList.removeTodoListAC(todolistId2))
//
//     expect(endTasksState["todolistId2"]).toBe(undefined);
//     expect(endTodolistsState.length).toBe(1);
// });
