import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EmploymentSeekerState {
	currentEmploymentSeekerName: string;
	currentEmploymentSeekerVacancy: string;
}

const initialState: EmploymentSeekerState = {
	currentEmploymentSeekerName: '',
	currentEmploymentSeekerVacancy: ''
};

const employmentSeekerSlice = createSlice({
	name: 'employmentSeeker',
	initialState,
	reducers: {
		setCurrentEmploymentSeekerName: (state, action: PayloadAction<string>) => {
			state.currentEmploymentSeekerName = action.payload;
		},
		setCurrentEmploymentSeekerVacancy: (state, action: PayloadAction<string>) => {
			state.currentEmploymentSeekerVacancy = action.payload;
		}
	}
});

export const { setCurrentEmploymentSeekerName, setCurrentEmploymentSeekerVacancy } = employmentSeekerSlice.actions;
export default employmentSeekerSlice.reducer;