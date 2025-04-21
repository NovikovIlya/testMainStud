import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type fileInfo = { file: string; filename: string; fileType: string; fileSize: number }

const initialState: fileInfo = { file: '', filename: '', fileType: '', fileSize: 0 }

const experienceFileSlice = createSlice({
	name: 'experienceFileSlice',
	initialState,
	reducers: {
		setFile: (state, action: PayloadAction<fileInfo>) => {
			state.file = action.payload.file
			state.filename = action.payload.filename
			state.fileType = action.payload.fileType
			state.fileSize = action.payload.fileSize
		},
		nullifyFile: state => {
			state.file = ''
			state.filename = ''
			state.fileType = ''
			state.fileSize = 0
		}
	}
})

export const { setFile, nullifyFile } = experienceFileSlice.actions

export default experienceFileSlice.reducer
