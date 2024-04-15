import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const keysTabsBusinessTrip = {
    placesAndDated: 'PlacesAndDated',
    travelConditions: 'TravelConditions',
    livingConditions: 'LivingConditions',
    financing: 'Financing',
    result: 'Result'
}

export interface IStepFormBusinessTrip {
    step: string
}

const initialStateFormStepTwo: IStepFormBusinessTrip = {
    step: 'PlacesAndDated'
}

export const StaffStepFormBusinessTrip = createSlice({
    name: 'StaffStepFormBusinessTrip',
    initialState: initialStateFormStepTwo,
    reducers: {
        setCondition: (state, action: PayloadAction<string>) => {
            state.step = action.payload
        },

    }
})

export const {
    setCondition,
} = StaffStepFormBusinessTrip.actions
export default StaffStepFormBusinessTrip.reducer

//export const staffStepFormBusinessTrip = (state: RootState) => state.StaffStepFormBusinessTrip