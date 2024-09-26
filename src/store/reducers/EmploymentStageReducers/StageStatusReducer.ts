type StageStatus = 'VERIFYING' | 'REFINE' | 'COMPLETE';

interface StageState {
	stageStatus: StageStatus;
}

type StageAction =
	| { type: 'SET_VERIFYING' }
	| { type: 'SET_REFINE' }
	| { type: 'SET_COMPLETE' }

export const initialState: StageState = {
	stageStatus: 'VERIFYING',
};

export const stageReducer = (state: StageState, action: StageAction): StageState => {
	switch (action.type) {
		case 'SET_VERIFYING':
			return { ...state, stageStatus: 'VERIFYING' };
		case 'SET_REFINE':
			return { ...state, stageStatus: 'REFINE' };
		case 'SET_COMPLETE':
			return { ...state, stageStatus: 'COMPLETE' };
		default:
			return state;
	}
};