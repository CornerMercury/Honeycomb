import createDataContext from "./createDataContext";

const assignmentReducer = (state, action) => {
	switch (action.type) {
		case "blacklist":
			return {
				...state,
				blacklisted_ids: [...state.blacklisted_ids, action.payload],
			};
		default:
			return state;
	}
};

const blacklist_id = (dispatch) => async (id) => {
	dispatch({ type: "blacklist", payload: id });
};

export const { Provider, Context } = createDataContext(
	assignmentReducer,
	{ blacklist_id },
	{ blacklisted_ids: [] }
);
