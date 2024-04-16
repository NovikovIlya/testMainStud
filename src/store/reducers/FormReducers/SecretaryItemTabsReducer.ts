import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface IItemTabs {
    staffDate: boolean
    placesAndDated: boolean,
    travelConditions: boolean,
    livingConditions: boolean,
    financing: boolean,
}

const initialStateFormStepTwo: IItemTabs = {
    staffDate: false,
    placesAndDated: false,
    travelConditions: false,
    livingConditions: false,
    financing: false,
}

export const SecretaryItemTabsReducer = createSlice({
    name: 'ItemTabs',
    initialState: initialStateFormStepTwo,
    reducers: {
        setSecretaryStaffDateItemTabs: (state, action: PayloadAction<boolean>) => {
            state.staffDate = action.payload
        },
        setSecretaryPlaceAndDateItemTabs: (state, action: PayloadAction<boolean>) => {
            state.placesAndDated = action.payload
        },
        setSecretaryTravelConditionsItemTabs: (state, action: PayloadAction<boolean>) => {
            state.travelConditions = action.payload
        },
        setSecretaryLivingConditionsItemTabs: (state, action: PayloadAction<boolean>) => {
            state.livingConditions = action.payload
        },
        setSecretaryFinancingItemTabs: (state, action: PayloadAction<boolean>) => {
            state.financing = action.payload
        },
    }
})

export const {
    setSecretaryPlaceAndDateItemTabs,
    setSecretaryLivingConditionsItemTabs,
    setSecretaryTravelConditionsItemTabs,
    setSecretaryFinancingItemTabs,
    setSecretaryStaffDateItemTabs,
} = SecretaryItemTabsReducer.actions
export default SecretaryItemTabsReducer.reducer

