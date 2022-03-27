import {Field, reduxForm} from "redux-form";
import {useState} from "react";
import * as React from "react";

const BullandCows = (props : any) => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit} onReset={reset}>
            <div>
                <div>
                    <Field name="Value"
                           component="input"
                           type="text"
                           placeholder="значение"/>
                    <Field name="Bulls"
                           component="input"
                           type="number"
                           placeholder="значение"/>
                    <Field name="Cows"
                           component="input"
                           type="number"
                           placeholder="значение"/>
                </div>
            </div>
            <button type="submit">отправить</button>
            <button type="button" onClick={handleSubmit((values:any) => props.onSubmit({ ...values, action: 'reset'}))}>сброс</button>
        </form>
    )
}

export default reduxForm({
    form: 'BullandCows',
})(BullandCows)