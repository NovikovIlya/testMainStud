import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type fileInfo = { file: string; filename: string; fileType: string }

const initialState: fileInfo = { file: '', filename: '', fileType: '' }

const experienceFileSlice = createSlice({
	name: 'experienceFileSlice',
	initialState,
	reducers: {
		setFile: (state, action: PayloadAction<fileInfo>) => {
			state.file = action.payload.file
			state.filename = action.payload.filename
			state.fileType = action.payload.fileType
		},
		nullifyFile: state => {
			state.file = ''
			state.filename = ''
			state.fileType = ''
		}
	}
})

export const { setFile, nullifyFile } = experienceFileSlice.actions

export default experienceFileSlice.reducer
