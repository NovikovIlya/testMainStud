import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RequisiteSeekerState {
	currentRequisiteSeekerName: string;
	currentRequisiteSeekerVacancy: string;
}

const initialState: RequisiteSeekerState = {
	currentRequisiteSeekerName: '',
	currentRequisiteSeekerVacancy: ''
};

const requisiteSeekerSlice = createSlice({
	name: 'requisiteSeeker',
	initialState,
	reducers: {
		setCurrentRequisiteSeekerName: (state, action: PayloadAction<string>) => {
			state.currentRequisiteSeekerName = action.payload;
		},
		setCurrentRequisiteSeekerVacancy: (state, action: PayloadAction<string>) => {
			state.currentRequisiteSeekerVacancy = action.payload;
		}
	}
});

export const { setCurrentRequisiteSeekerName, setCurrentRequisiteSeekerVacancy } = requisiteSeekerSlice.actions;
export default requisiteSeekerSlice.reducer;