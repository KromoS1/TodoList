import {TodoListReducers} from '../redux/reducers/TodoListReducers';
import {v1} from 'uuid';
import {FilterValuesType, TodoListDomainType} from '../redux/types/Types';
import {actionsStatusApp, actionsTodoList} from "../redux/actions/Actions";

const actions = {
    ...actionsTodoList,
    ...actionsStatusApp,
}

let todoListId1: string;
let todoListId2: string;
let startState: TodoListDomainType[] = [];

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();
    startState = [
        {id: todoListId1, title: "What to learn", filter: "all", order:0,addedDate:'',disable:true},
        {id: todoListId2, title: "What to buy", filter: "all",order:1,addedDate:'',disable:false},
    ]
})

test("todolist should be set to the state", () =>{

    const endState = TodoListReducers([],actions.getTodoLists(startState));

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("What to buy");
    expect(endState[0].disable).toBe(true);
    expect(endState[1].order).toBe(1);
})


test('correct todolist should be added', () => {

    const newTodoList:TodoListDomainType = {
        id:v1(),
        title:"new title",
        addedDate: new Date()+"",
        order:2,
        disable:false,
        filter:"all",
    }

    const endState = TodoListReducers(startState, actions.addTodoList(newTodoList))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("new title");
    expect(endState[2].order).toBe(2);
});

test('correct todolist should be removed', () => {

    const endState = TodoListReducers(startState,actions.removeTodoList(todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});


test('correct todolist should change its name', () => {
    let newTodolistTitle = "New change Todolist";

    const endState = TodoListReducers(startState, actions.changeTodoListTitle(todoListId2,newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const endState = TodoListReducers(startState, actions.changeTodoListFilter(todoListId2,newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct disable in todolist', () => {

    const endState = TodoListReducers(startState, actions.isDisable(true,todoListId2));

    expect(endState[1].disable).toBe(true);
});






