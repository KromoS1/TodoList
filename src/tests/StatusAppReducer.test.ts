import {actionsStatusApp} from "../redux/actions/Actions";
import {StatusAppReducer, StatusAppType} from "../redux/reducers/StatusAppReducer";

let startState:StatusAppType;
beforeEach(() => {
    startState = {
        message: "",
        status: "idle",
        isInitialized:false,
    }
});

test("correct set status app", () => {
    const endState = StatusAppReducer(startState, actionsStatusApp.setStatusApp("succeeded"));
    expect(endState.status).toBe("succeeded")
});

test("correct set message", () => {
    const endState = StatusAppReducer(startState, actionsStatusApp.setMessageStatus("Message about error or successfully"));
    expect(endState.message).toBe("Message about error or successfully");
});

test("correct setting of initialization status application", () => {
    const endState = StatusAppReducer(startState, actionsStatusApp.setAppInitialized(true));
    expect(endState.isInitialized).toBe(true);
});


