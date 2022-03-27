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

export const API = {
    getPossibleVariants: _getPossibleVariants,
    postData: _postData,
    deleteData: _deleteData
}