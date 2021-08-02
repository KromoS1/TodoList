// import {TodoListReducers} from '../redux/reducers/TodoListReducers';
// import {v1} from 'uuid';
// import {FilterValuesType, TodoListDomainType} from '../redux/types/Types';
// import {actions} from '../redux/actions/Actions';
//
// let todoListId1: string;
// let todoListId2: string;
// let startState: TodoListDomainType[] = [];
//
// beforeEach(() => {
//     todoListId1 = v1();
//     todoListId2 = v1();
//     startState = [
//         {id: todoListId1, title: "What to learn", filter: "all", order:0,addedDate:''},
//         {id: todoListId2, title: "What to buy", filter: "all",order:0,addedDate:''},
//     ]
// })
//
// test('correct todolist should be removed', () => {
//     const endState = TodoListReducers(startState,actions.removeTodoListAC(todoListId1));
//
//     expect(endState.length).toBe(1);
//     expect(endState[0].id).toBe(todoListId2);
// });
//
//
// test('correct todolist should be added', () => {
//     let newTodolistTitle = "New Todolist";
//     let todolistID = v1();
//     let addedDate = new Date()+"";
//     let order = 0
//
//     const endState = TodoListReducers(startState, actions.addTodoListAC(newTodolistTitle,todolistID,addedDate,order))
//
//     expect(endState.length).toBe(3);
//     expect(endState[2].title).toBe(newTodolistTitle);
// });
//
// test('correct todolist should change its name', () => {
//     let newTodolistTitle = "New Todolist";
//
//     const endState = TodoListReducers(startState, actions.changeTodoListTitleAC(todoListId2,"New Todolist"));
//
//     expect(endState[0].title).toBe("What to learn");
//     expect(endState[1].title).toBe(newTodolistTitle);
// });
//
//
// test('correct filter of todolist should be changed', () => {
//     let newFilter: FilterValuesType = "completed";
//
//     const endState = TodoListReducers(startState, actions.changeTodoListFilterAC(todoListId2,newFilter));
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
