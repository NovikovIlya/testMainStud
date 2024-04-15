import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const secretaryKeysTabsBusinessTrip = {
    staffDate: 'StaffDate',
    placesAndDated: 'PlacesAndDated',
    travelConditions: 'TravelConditions',
    livingConditions: 'LivingConditions',
    financing: 'Financing',
    result: 'Result'
}

export interface ISecretaryStepFormBusinessTrip {
    step: string
}

const initialStateFormStepTwo: ISecretaryStepFormBusinessTrip = {
    step: 'StaffDate'
}

export const SecretaryStepFormBusinessTrip = createSlice({
    name: 'SecretaryStepFormBusinessTrip',
    initialState: initialStateFormStepTwo,
    reducers: {
        setSecretaryCondition: (state, action: PayloadAction<string>) => {
            state.step = action.payload
        },

    }
})

export const {
    setSecretaryCondition,
} = SecretaryStepFormBusinessTrip.actions
export default SecretaryStepFormBusinessTrip.reducer

//export const staffStepFormBusinessTrip = (state: RootState) => state.StaffStepFormBusinessTrip