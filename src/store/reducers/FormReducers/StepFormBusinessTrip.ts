import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../index";

export const keysTabsBusinessTrip = {
    placesAndDated: 'PlacesAndDated',
    travelConditions: 'TravelConditions',
    livingConditions: 'LivingConditions',
    financing: 'Financing',
}

export interface IStepFormBusinessTrip {
    step: string
}

const initialStateFormStepTwo: IStepFormBusinessTrip = {
    step: 'PlacesAndDated'
}

export const StepFormBusinessTrip = createSlice({
    name: 'StepFormBusinessTrip',
    initialState: initialStateFormStepTwo,
    reducers: {
        setCondition: (state, action: PayloadAction<string>) => {
            state.step = action.payload
        },

    }
})

export const {
    setCondition,
} = StepFormBusinessTrip.actions
export default StepFormBusinessTrip.reducer

export const stepFormBusinessTrip = (state: RootState) => state.StepFormBusinessTrip