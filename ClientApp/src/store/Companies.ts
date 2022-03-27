import {Action, Reducer} from "redux";
import {AppThunkAction} from "./index";
import {API} from "../api/api";

export interface CompaniesState {
    companies: Array<string>,
}

const unloadedState: CompaniesState = { companies: ["test1", "test2"]};

interface RequestCompanies {
    type: 'REQUEST_COMPANIES';
    companies: Array<string>
}

type KnownAction = RequestCompanies;
export const reducer: Reducer<CompaniesState> = (state: CompaniesState | undefined, incomingAction: Action): CompaniesState => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_COMPANIES':
            return {...state,
                companies: action.companies,
            };
    }
    return state;
};

export const actionCreators = {
    requestCompanies: (): AppThunkAction<KnownAction> => async (dispatch) => {
        let response = await API.getCompanies();
        dispatch({ type: 'REQUEST_COMPANIES', companies: response as Array<string>})
    },
    sendCompany: (company: string): AppThunkAction<KnownAction> => async (dispatch) => {
        await API.postCompany(company);
        let response = await API.getCompanies();
        dispatch({ type: 'REQUEST_COMPANIES', companies: response as Array<string>})
    }
};