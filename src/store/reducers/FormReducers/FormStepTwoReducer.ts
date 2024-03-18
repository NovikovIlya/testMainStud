import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IDataFormStepTwo {
    // atRussia: string,
    address: string,
    inn: string
    organization: string
    startDate: string,
    endDate: string,
    rangeDate: string
}

const initialStateFormStepTwo: IDataFormStepTwo = {
    // atRussia: '',
    address: '',
    inn: '',
    organization: '',
    startDate: '',
    endDate: '',
    rangeDate: ''
}

export const FormStepTwoReducer = createSlice({
    name: 'FormStepTwo',
    initialState: initialStateFormStepTwo,
    reducers: {
        // setAtRussia: (state, action: PayloadAction<string>) => {
        //     state.atRussia = action.payload
        // },
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload
        },
        setInn: (state, action: PayloadAction<string>) => {
            state.inn = action.payload
        },
        setOrganisation: (state, action: PayloadAction<string>) => {
            state.organization = action.payload
        },
        setStartDateAction: (state, action: PayloadAction<string>) => {
            state.startDate = action.payload
        },
        setEndDateAction: (state, action: PayloadAction<string>) => {
            state.endDate = action.payload
        },
        setRangeDate: (state, action: PayloadAction<string>) => {
            state.rangeDate = action.payload
        }
    }
})

export const {
    setRangeDate,
    setAddress,
    setEndDateAction,
    setStartDateAction,
    setOrganisation,
    setInn,
    // setAtRussia
} = FormStepTwoReducer.actions
export default FormStepTwoReducer.reducer