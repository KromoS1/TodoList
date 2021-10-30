import {createTaskWorker, getTasksWorker} from "../../redux/saga/taskWatcher";
import {call, put} from "redux-saga/effects";
import {actionsStatusApp, actionsTask, actionsTodoList} from "../../redux/actions/Actions";
import {APITasks} from "../../DAL/APITasks";
import {ResponseTypeGeneric, ResponseTypeGet} from "../../redux/types/TypesResponse";
import {TaskPriorities, TaskStatuses, TaskType} from "../../redux/types/Types";

const item = {
    id: "1",
    todoListId: 'idTodolist', title: "React", description: "description", status: TaskStatuses.New,
    priority: TaskPriorities.Low, order: 1, startDate: "", addedDate: "", deadline: ""
}

test('get tasks success', () => {
    const gen = getTasksWorker({type: '', idTodolist: 'idTodolist'});
    expect(gen.next().value).toEqual(put(actionsStatusApp.setStatusApp("load")));
    expect(gen.next().value).toEqual(call(APITasks.get, 'idTodolist'));

    const fakeResponse: ResponseTypeGet<TaskType[]> = {
        items: [item],
        error: null,
        totalCount: 12,
    }

    expect(gen.next(fakeResponse).value).toEqual(put(actionsTask.getTask('idTodolist', fakeResponse.items)))
    expect(gen.next().value).toEqual(put(actionsStatusApp.setStatusApp("idle")));
})

test('create task success',() => {
    const gen = createTaskWorker({type:'',title: 'title',idTodolist: 'id'})
    expect(gen.next().value).toEqual(put(actionsStatusApp.setStatusApp("load")));
    expect(gen.next().value).toEqual(put(actionsTodoList.isDisable(true,'id')));
    expect(gen.next().value).toEqual(call(APITasks.create,'id', 'title'));
    const fakeResponse : ResponseTypeGeneric<{ item: TaskType }> = {
        data:{item},
        resultCode:0,
        fieldsErrors:[],
        messages:['']
    }
    expect(gen.next(fakeResponse).value).toEqual(put(actionsTask.addTask(item)));
    expect(gen.next().value).toEqual(put(actionsStatusApp.setStatusApp("succeeded")));
    expect(gen.next().value).toEqual(put(actionsStatusApp.setMessageStatus("Task created succeeded.")));
    expect(gen.next().value).toEqual(put(actionsTodoList.isDisable(false,'id')));
})

test('create task error server',() => {
    const gen = createTaskWorker({type:'',title: 'title2',idTodolist: 'id'})
    expect(gen.next().value).toEqual(put(actionsStatusApp.setStatusApp("load")));
    expect(gen.next().value).toEqual(put(actionsTodoList.isDisable(true,'id')));
    expect(gen.next().value).toEqual(call(APITasks.create,'id', 'title2'));
    const fakeResponse : ResponseTypeGeneric<{ item: TaskType }> = {
        data:{item},
        resultCode:1,
        fieldsErrors:[],
        messages:['error']
    }
    expect(gen.next(fakeResponse).value).toEqual(put(actionsStatusApp.setMessageStatus(fakeResponse.messages[0])));
    put(actionsStatusApp.setStatusApp("failed"));
})

test('create task error network',() => {
    const gen = createTaskWorker({type:'',title: 'title1',idTodolist: 'id'})
    expect(gen.next().value).toEqual(put(actionsStatusApp.setStatusApp("load")));
    expect(gen.next().value).toEqual(put(actionsTodoList.isDisable(true,'id')));
    expect(gen.next().value).toEqual(call(APITasks.create,'id', 'title1'));
    expect(gen.throw({message:'error'}).value).toEqual(put(actionsStatusApp.setMessageStatus('error')));
    expect(gen.next().value).toEqual(put(actionsStatusApp.setStatusApp('failed')));
})
