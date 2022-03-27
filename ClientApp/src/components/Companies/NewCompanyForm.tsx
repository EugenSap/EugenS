import {Field, reduxForm} from "redux-form";
import * as React from "react";

const Company = (props : any) => {
    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit} onReset={reset}>
            <div>
                <div>
                    <Field name="CompanyName"
                           component="input"
                           type="text"
                           placeholder="Название компании"/>
                </div>
            </div>
            <button type="submit">отправить</button>
        </form>
    )
}

export default reduxForm({
    form: 'NewCompanyForm',
})(Company)