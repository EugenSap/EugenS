import {Action, Reducer} from "redux";
import {AppThunkAction} from "./index";
import {API} from "../api/api";

export interface BullsAndCowsState {
    variants: Array<string>,
    nums: number
}

const unloadedState: BullsAndCowsState = { variants: [], nums: 0 };
interface RequestPossibleVariants {
    type: 'REQUEST_VARIANTS';
    variants: Array<string>
}

type KnownAction = RequestPossibleVariants;
export const reducer: Reducer<BullsAndCowsState> = (state: BullsAndCowsState | undefined, incomingAction: Action): BullsAndCowsState => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_VARIANTS':
            return {...state,
                variants: action.variants,
                nums: action.variants.length
            };
    }
    return state;
};

export const actionCreators = {
    requestVariants: (): AppThunkAction<KnownAction> => async (dispatch) => {
        let response = await API.getPossibleVariants();
        dispatch({ type: 'REQUEST_VARIANTS', variants: response as Array<string>})
    },
    sendData: (value: string, bulls: number, cows: number): AppThunkAction<KnownAction> => async (dispatch) => {
        await API.postData(value, bulls, cows);
        let response = await API.getPossibleVariants();
        dispatch({ type: 'REQUEST_VARIANTS', variants: response as Array<string>})
    },
    clearData: (): AppThunkAction<KnownAction> => async (dispatch) => {
        await API.deleteData();
        let response = await API.getPossibleVariants();
        dispatch({ type: 'REQUEST_VARIANTS', variants: response as Array<string>})
    },
};