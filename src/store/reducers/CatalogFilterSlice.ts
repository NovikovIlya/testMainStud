import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type filterType = {
	category: string
	subcategory: string
	type: 'DIRECTORY' | 'SUBDIVISION'
}

const initialState: filterType = {
	category: 'АУП',
	subcategory: 'Все',
	type: 'DIRECTORY'
}

const CatalogFilterSlice = createSlice({
	name: 'catalogFilter',
	initialState,
	reducers: {
		keepFilterCategory: (state, action: PayloadAction<string>) => {
			state.category = action.payload
		},
		keepFilterSubCategory: (state, action: PayloadAction<string>) => {
			state.subcategory = action.payload
		},
		keepFilterType: (
			state,
			action: PayloadAction<'DIRECTORY' | 'SUBDIVISION'>
		) => {
			state.type = action.payload
		}
	}
})

export const { keepFilterCategory, keepFilterSubCategory, keepFilterType } =
	CatalogFilterSlice.actions

export default CatalogFilterSlice.reducer
