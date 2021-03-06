import { reducer as reduxFormReducer } from 'redux-form';
import * as BullsAndCows from './BullsAndCows';
import * as Companies from './Companies';
// The top-level state object
export interface ApplicationState {
    bullsAndCows: BullsAndCows.BullsAndCowsState | undefined;
    companies: Companies.CompaniesState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    bullsAndCows: BullsAndCows.reducer,
    companies: Companies.reducer,
    form: reduxFormReducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
