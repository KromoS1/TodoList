import {actionsIsAuth} from "../../redux/actions/Actions";
import {IsAuthReducer} from "../../redux/reducers/IsAuthReducer";
import {MeProfileType} from "../../redux/types/Types";

let startState:MeProfileType;
beforeEach(() => {
    startState = {
        id: 0,
        login: "",
        email: "",
        password: "",
        rememberMe: false,
        captcha: false,
        isAuth: false,
    }
});

test("setting state auth me should be correct", () => {

    const meData = {
        id: 1,
        login: "Roman",
        email: "roma@mail.ru",
    }

    const endState = IsAuthReducer(startState, actionsIsAuth.setMeData(meData, true));

    expect(endState.id).toBe(1);
    expect(endState.login).toBe("Roman");
    expect(endState.email).toBe("roma@mail.ru");
    expect(endState.isAuth).toBe(true);

});

test("correct logout", () => {

    const state: MeProfileType = {
        id: 1,
        login: "roma",
        email: "roma@mail.ru",
        password: "roma",
        rememberMe: true,
        captcha: false,
        isAuth: true,
    }

    const endState = IsAuthReducer(state, actionsIsAuth.logOut());

    expect(endState).toEqual(startState);
});





