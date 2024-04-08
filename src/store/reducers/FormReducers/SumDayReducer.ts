import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ISumDay {
    sumDay: number
}

const initialStateSumDay: ISumDay = {
    sumDay: 0,
}

export const SumDayReducer = createSlice({
    name: 'sumDay',
    initialState: initialStateSumDay,
    reducers: {
        setNewSumDay: (state, action: PayloadAction<number>) => {
            state.sumDay = action.payload
        },
    }
})

export const {
    setNewSumDay,
} = SumDayReducer.actions

export default SumDayReducer.reducer
