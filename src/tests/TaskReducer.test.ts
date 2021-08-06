// import {actionsTasks, TaskReducer} from './TaskReducer';
// import {TaskStateType, TaskStatuses} from '../redux/Types';
// import {actionsTodoList} from './TodoListReducers';
//
// let startState: TaskStateType = {};
// beforeEach(() => {
//     startState = {
//         "todolistId1": [
//             {id: "1", title: "CSS",order:0,addedDate:'',status: TaskStatuses.New,todoListId},
//             {id: "2", title: "JS", isDone: true},
//             {id: "3", title: "React", isDone: false}
//         ],
//         "todolistId2": [
//             {id: "1", title: "bread", isDone: false},
//             {id: "2", title: "milk", isDone: true},
//             {id: "3", title: "tea", isDone: false}
//         ]
//     }
// });
//
//
// test('correct task should be deleted from correct array', () => {
//    const endState = TaskReducer(startState,actionsTasks.removeTaskAC("2","todolistId2"))
//
//     expect(endState).toEqual({
//         "todolistId1": [
//             { id: "1", title: "CSS", isDone: false },
//             { id: "2", title: "JS", isDone: true },
//             { id: "3", title: "React", isDone: false }
//         ],
//         "todolistId2": [
//             { id: "1", title: "bread", isDone: false },
//             { id: "3", title: "tea", isDone: false }
//         ]
//     });
//
// });
//
//
// test('correct task should be added to correct array', () => {
//     const endState = TaskReducer(startState,actionsTasks.addTaskAC("juce","todolistId2"));
//
//     expect(endState["todolistId1"].length).toBe(3);
//     expect(endState["todolistId2"].length).toBe(4);
//     expect(endState["todolistId2"][0].id).toBeDefined();
//     expect(endState["todolistId2"][0].title).toBe("juce");
//     expect(endState["todolistId2"][0].isDone).toBe(false);
// })
//
// test('status of specified task should be changed', () => {
//     const endStart = TaskReducer(startState,actionsTasks.changeTaskStatusAC("2",false,"todolistId2"));
//
//
//     expect(endStart["todolistId2"][1].isDone).toBe(false);
//     expect(endStart["todolistId2"].length).toBe(3);
// });
//
// test('title of specified task should be changed', () => {
//     const endState = TaskReducer(startState,actionsTasks.changeTaskTitleAC("2","Redux","todolistId2"));
//
//
//     expect(endState["todolistId2"][1].title).toBe("Redux");
//     expect(endState["todolistId2"].length).toBe(3);
// });
//
//
// test('new array should be added when new todolist is added', () => {
//     const endState = TaskReducer(startState,  actionsTodoList.addTodoListAC("new todolist"))
//
//     const keys = Object.keys(endState);
//     const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
//     if (!newKey) {
//         throw Error("new key should be added")
//     }
//
//     expect(keys.length).toBe(3);
//     expect(endState[newKey]).toEqual([]);
// });
//
//
//
//