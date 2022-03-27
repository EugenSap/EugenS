import * as React from "react";
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import { RouteComponentProps } from 'react-router';
import * as CompaniesStore from "../../store/Companies";
import NewCompanyForm from "./NewCompanyForm";

type CompaniesProps = 
    CompaniesStore.CompaniesState &
    typeof CompaniesStore.actionCreators &
    RouteComponentProps<{}>;

let Companies = (props : CompaniesProps) => {
    props.requestCompanies();
    let onSubmit = (FormData : any) => {
        props.sendCompany(FormData.CompanyName);
    }
    var companies = props.companies.map(c =>  <li>{c}</li>)
    return(
        <div>
            <div>
                <ul>
                    {companies}
                </ul>
            </div>
            <div>
                <NewCompanyForm onSubmit = {onSubmit}/>
            </div>
        </div>
    )
        
}

export default connect(
    (state: ApplicationState) => state.companies,
    CompaniesStore.actionCreators
)(Companies as any);