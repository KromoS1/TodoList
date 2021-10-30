import {TaskPriorities, TaskStateType, TaskStatuses, TodoListDomainType} from "../../redux/types/Types";
import {actionsTodoList} from "../../redux/actions/Actions";
import {TaskReducer} from "../../redux/reducers/TaskReducer";
import {TodoListReducers} from "../../redux/reducers/TodoListReducers";


let startTodolistState: TodoListDomainType[] = [];
beforeEach(() => {
    startTodolistState = [
        {id: "todolistId1", title: "What to learn", filter: "all", order:0,addedDate:'',disable:true},
        {id: "todolistId2", title: "What to buy", filter: "all",order:1,addedDate:'',disable:false},
    ]
})

let startTaskState: TaskStateType = {};
beforeEach(() => {
    startTaskState = {
        "todolistId1": [
            {
                id: "1",
                todoListId: "todolist1", title: "React", description: "description", status: TaskStatuses.New,
                priority: TaskPriorities.Low, order: 1, startDate: "", addedDate: "", deadline: ""
            },
            {
                id: "2",
                todoListId: "todolist1", title: "task", description: "description1", status: TaskStatuses.InProgress,
                priority: TaskPriorities.Hi, order: 2, startDate: "1", addedDate: "2", deadline: "3"
            },
        ],
        "todolistId2": [
            {
                id: "1",
                todoListId: "todolist2", title: "React", description: "description", status: TaskStatuses.New,
                priority: TaskPriorities.Low, order: 1, startDate: "", addedDate: "", deadline: ""
            },
            {
                id: "2",
                todoListId: "todolist2", title: "task", description: "description1", status: TaskStatuses.InProgress,
                priority: TaskPriorities.Hi, order: 2, startDate: "1", addedDate: "2", deadline: "3"
            },
        ]
    }
});


test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: TodoListDomainType[] = [];

    const actionTodo = actionsTodoList.addTodoList( {id: "1", title: "What to learn", filter: "all", order:0,addedDate:'',disable:true});
    const actionTask = actionsTodoList.addTasksTodoList( "1");

    const endTasksState = TaskReducer(startTasksState, actionTask);
    const endTodolistsState = TodoListReducers(startTodolistsState,actionTodo);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(actionTodo.todoList.id);
    expect(idFromTodolists).toBe(actionTask.todoListId);
});

test('remove todolist should be correct delete array task', () => {
    const action = actionsTodoList.removeTodoList("todolistId2");

    const endTasksState = TaskReducer(startTaskState,action);
    const endTodolistsState = TodoListReducers(startTodolistState,action);

    expect(endTasksState["todolistId2"]).toBe(undefined);
    expect(endTodolistsState).toEqual(
        [
            {id: "todolistId1", title: "What to learn", filter: "all", order:0,addedDate:'',disable:true},
        ]
    );
});
