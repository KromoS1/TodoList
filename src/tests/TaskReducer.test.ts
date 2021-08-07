import {TaskPriorities, TaskStateType, TaskStatuses, TaskType} from "../redux/types/Types";
import {actionsTask, actionsTodoList} from "../redux/actions/Actions";
import {TaskReducer} from "../redux/reducers/TaskReducer";


let startState: TaskStateType = {};
beforeEach(() => {
    startState = {
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

test("todolist should be set to the state", () => {

    const key = Object.keys(startState);

    const tasks1 = TaskReducer({}, actionsTask.getTask("todolistId1", startState[key[0]]));
    const tasks2 = TaskReducer({}, actionsTask.getTask("todolistId2", startState[key[1]]));

    expect(tasks1).toEqual({
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
    });
    expect(tasks2).toEqual({
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
    });
})

test('correct task should be deleted from correct array', () => {
    const endState = TaskReducer(startState, actionsTask.removeTask("2", "todolistId1"))

    const key = Object.keys(startState);

    expect(endState[key[0]]).toEqual([
            {
                id: "1",
                todoListId: "todolist1", title: "React", description: "description", status: TaskStatuses.New,
                priority: TaskPriorities.Low, order: 1, startDate: "", addedDate: "", deadline: ""
            },
        ]
    );
});


test('correct task should be added to correct array', () => {
    const newTask: TaskType = {
        id: "3", todoListId: "todolistId2", title: "juce", description: "description", status: TaskStatuses.New,
        priority: TaskPriorities.Middle, order: 0, startDate: "", addedDate: "", deadline: "",
    }

    const endState = TaskReducer(startState, actionsTask.addTask(newTask));

    expect(endState["todolistId1"].length).toBe(2);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].id).toBe("3");
})

test('task should be changed', () => {
    const task = {
        id: "1",
        todoListId: "todolist1", title: "Redux", description: "description1", status: TaskStatuses.InProgress,
        priority: TaskPriorities.Hi, order: 1, startDate: "", addedDate: "", deadline: ""
    }

    const endStart = TaskReducer(startState, actionsTask.changeTask("todolistId1", "1",task ));

    expect(endStart["todolistId1"][0]).toEqual(task);

});

test('new array should be added when new todolist is added', () => {

    const endState = TaskReducer(startState, actionsTodoList.addTasksTodoList("todolistId3"));

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});




