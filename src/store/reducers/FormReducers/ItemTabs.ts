import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../index";


export interface IItemTabs {
    placesAndDated: boolean,
    travelConditions: boolean,
    livingConditions: boolean,
    financing: boolean,
}

const initialStateFormStepTwo: IItemTabs = {
    placesAndDated: false,
    travelConditions: false,
    livingConditions: false,
    financing: false,
}

export const ItemTabsReducer = createSlice({
    name: 'ItemTabs',
    initialState: initialStateFormStepTwo,
    reducers: {
        setPlaceAndDateItemTabs: (state, action: PayloadAction<boolean>) => {
            state.placesAndDated = action.payload
        },
        setTravelConditionsItemTabs: (state, action: PayloadAction<boolean>) => {
            state.travelConditions = action.payload
        },
        setLivingConditionsItemTabs: (state, action: PayloadAction<boolean>) => {
            state.livingConditions = action.payload
        },
        setFinancingItemTabs: (state, action: PayloadAction<boolean>) => {
            state.financing = action.payload
        },
    }
})

export const {
    setLivingConditionsItemTabs,
    setTravelConditionsItemTabs,
    setFinancingItemTabs,
    setPlaceAndDateItemTabs
} = ItemTabsReducer.actions
export default ItemTabsReducer.reducer

//export const itemTabsReducer = (state: RootState) => state.ItemTabs