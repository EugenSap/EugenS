import axios from "axios";
const instance = () => axios.create()

const _getPossibleVariants = () => {
    return instance().get(`/api/BullsAndCows`).then(response => response.data);
}

const _postData = (value : string, bulls: number, cows: number) => {
    return instance().post(`/api/BullsAndCows?value=${value}&bulls=${bulls}&cows=${cows}`);
}

const _deleteData = () => {
    return instance().delete(`/api/BullsAndCows`);
}

const _getCompanies = () => {
    return instance().get(`/api/Companies`).then(response => response.data);
}

const _postCompany = (company : string) => {
    return instance().post(`/api/Companies?ComapanyName=${company}`);
}

export const API = {
    getPossibleVariants: _getPossibleVariants,
    postData: _postData,
    deleteData: _deleteData,
    getCompanies: _getCompanies,
    postCompany: _postCompany
}