import {initializeAppWorker} from "../../redux/saga/statusAppWatcher";
import {call, put} from "redux-saga/effects";
import {APIAuthMe} from "../../DAL/APIAuthMe";
import {AuthMeType} from "../../redux/types/Types";
import {ResponseTypeGeneric} from "../../redux/types/TypesResponse";
import {actionsIsAuth, actionsStatusApp} from "../../redux/actions/Actions";

let meResponse: ResponseTypeGeneric<AuthMeType>;

beforeEach(() =>
    meResponse = {
        resultCode: 0,
        messages: [''],
        data: {
            id: 12,
            email: '1@m.ru',
            login: 'roma'
        },
        fieldsErrors: []
    }
)

test('initializeAppWorker login success', () => {
    const gen = initializeAppWorker();
    expect(gen.next().value).toEqual(call(APIAuthMe.me));
    expect(gen.next(meResponse).value).toEqual(put(actionsIsAuth.setMeData(meResponse.data, true)));
    expect(gen.next().value).toEqual(put(actionsStatusApp.setAppInitialized(true)));
})

test('initializeAppWorker login unsuccess', () => {
    const gen = initializeAppWorker();
    expect(gen.next().value).toEqual(call(APIAuthMe.me));
    meResponse.resultCode = 1;
    expect(gen.next(meResponse).value).toEqual(put(actionsStatusApp.setAppInitialized(true)));
})

