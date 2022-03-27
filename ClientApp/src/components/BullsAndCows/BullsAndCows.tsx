import * as React from "react";
import BullsAndCowsForm from "./BullsAndCowsForm";
import { RouteComponentProps } from 'react-router';
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import * as BullsAndCowsStore from "../../store/BullsAndCows";

type BullsAndCowsProps =
    BullsAndCowsStore.BullsAndCowsState &
    typeof BullsAndCowsStore.actionCreators &
    RouteComponentProps<{}>;
let BullsAndCows = (props : BullsAndCowsProps) => {
    let onSubmit = (FormData : any) => {
        if (FormData.action === "reset")
        {
            props.clearData();
            return;
        }
        props.sendData(FormData.Value, FormData.Bulls, FormData.Cows);
    }
    return (
        <div>
            <textarea value={props.variants} readOnly placeholder="Возможные варианты"/>
            <textarea value={props.nums} readOnly placeholder="Количество возможных вариантов"/>
        <div>
            <BullsAndCowsForm onSubmit = {onSubmit}/>
        </div>
        </div>
    )
}

export default connect(
    (state: ApplicationState) => state.bullsAndCows,
    BullsAndCowsStore.actionCreators
)(BullsAndCows as any);
