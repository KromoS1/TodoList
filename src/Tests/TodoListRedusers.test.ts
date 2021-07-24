import {actionsTodoList, TodoListReducers} from './TodoListReducers';
// import {v1} from 'uuid';
// import {FilterValuesType, TodoListType} from "../AppWithRedux";
//
// let todoListId1: string;
// let todoListId2: string;
// let startState: TodoListType[] = [];
//
// beforeEach(() => {
//     todoListId1 = v1();
//     todoListId2 = v1();
//     startState = [
//         {id: todoListId1, title: "What to learn", filter: "all"},
//         {id: todoListId2, title: "What to buy", filter: "all"},
//     ]
// })
//
// test('correct todolist should be removed', () => {
//     const endState = TodoListReducers(startState,actionsTodoList.removeTodoListAC(todoListId1));
//
//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todoListId2);
// });
//
//
// test('correct todolist should be added', () => {
//     let newTodolistTitle = "New Todolist";
//
//     const endState = TodoListReducers(startState, actionsTodoList.addTodoListAC(newTodolistTitle))
//
//     expect(endState.length).toBe(3);
//     expect(endState[2].title).toBe(newTodolistTitle);
// });
//
// test('correct todolist should change its name', () => {
//     let newTodolistTitle = "New Todolist";
//
//     const endState = TodoListReducers(startState, actionsTodoList.changeTodoListTitleAC(todoListId2,"New Todolist"));
//
//     expect(endState[0].title).toBe("What to learn");
//     expect(endState[1].title).toBe(newTodolistTitle);
// });
//
//
// test('correct filter of todolist should be changed', () => {
//     let newFilter: FilterValuesType = "completed";
//
//     const endState = TodoListReducers(startState, actionsTodoList.changeTodoListFilterAC(todoListId2,newFilter));
//
//     expect(endState[0].filter).toBe("all");
//     expect(endState[1].filter).toBe(newFilter);
// });
//
//
//
//
//
//
