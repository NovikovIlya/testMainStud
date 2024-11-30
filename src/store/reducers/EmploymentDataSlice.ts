import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { EmploymentDataType } from './type'

const initialState: { empData: EmploymentDataType } = {
	empData: {
		id: 0,
		status: 'FILLING',
		stages: []
	}
}

const EmploymentDataSlice = createSlice({
	name: 'employmentData',
	initialState,
	reducers: {
		setAllData: (state, action: PayloadAction<EmploymentDataType>) => {
			state.empData = action.payload
		},
		setHasRequisites: (state, action: PayloadAction<string>) => {
			state.empData.stages = state.empData.stages.map(stage => {
				return stage.type === action.payload
					? { ...stage, hasRequisites: !stage.hasRequisites }
					: stage
			})
		},
		setBank: (
			state,
			action: PayloadAction<{ stage: string; bank: 'SBER' | 'VTB' | undefined }>
		) => {
			state.empData.stages = state.empData.stages.map(stage => {
				return stage.type === action.payload.stage
					? { ...stage, bank: action.payload.bank }
					: stage
			})
		},
		setPartialData: (
			state,
			action: PayloadAction<{
				stageName: string
				docType: string
				id: number
				name: string
				size: number
			}>
		) => {
			state.empData.stages.find(
				stage => stage.type === action.payload.stageName
			)!.documents = [
				...state.empData.stages.find(
					stage => stage.type === action.payload.stageName
				)!.documents,
				{
					docType: action.payload.docType,
					id: action.payload.id,
					status: 'ATTACHED',
					name: action.payload.name,
					size: action.payload.size
				}
			]
		},
		removePartialData: (
			state,
			action: PayloadAction<{ stageName: string; docId: number }>
		) => {
			state.empData.stages.find(
				stage => stage.type === action.payload.stageName
			)!.documents = state.empData.stages
				.find(stage => stage.type === action.payload.stageName)!
				.documents.filter(doc => doc.id !== action.payload.docId)
		}
	}
})

export const {
	setAllData,
	setHasRequisites,
	setBank,
	setPartialData,
	removePartialData
} = EmploymentDataSlice.actions

export default EmploymentDataSlice.reducer
