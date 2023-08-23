import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const filterReducer = (state, action) => {
	switch (action.type) {
		case "update_state":
			return {
				...state,
				pageSize: action.payload.pageSize,
				filterCompleted: action.payload.filterCompleted,
				sortBy: action.payload.sortBy,
				showLate: action.payload.showLate,
			};
		case "set_page_size":
			return { ...state, pageSize: action.payload };
		case "set_filter_completed":
			return { ...state, filterCompleted: action.payload };
		case "set_sort_by":
			return { ...state, sortBy: action.payload };
		case "set_show_late":
			return { ...state, showLate: action.payload };
		case "finished_local":
			return { ...state, fetchedLocal: true };
		case "start_refresh":
			return { ...state, refreshBuffer: !state.refreshBuffer };
		default:
			return state;
	}
};

const updateState =
	(dispatch) =>
	({ pageSize, filterCompleted, sortBy, showLate }) => {
		AsyncStorage.setItem("pageSize", pageSize.toString());
		AsyncStorage.setItem("filterCompleted", filterCompleted.toString());
		AsyncStorage.setItem("sortBy", sortBy);
		AsyncStorage.setItem("showLate", showLate.toString());
		dispatch({
			type: "update_state",
			payload: { pageSize, filterCompleted, sortBy, showLate },
		});
	};

const tryGetLocalFilters = (dispatch) => async () => {
	await AsyncStorage.getItem("pageSize")
		.then((res) =>
			res !== null
				? dispatch({
						type: "set_page_size",
						payload: parseInt(res, 10),
				  })
				: null
		)
		.catch((err) => {
			console.log(`AsyncStorage get pageSize - ${err}`);
		});
	await AsyncStorage.getItem("filterCompleted")
		.then((res) =>
			res !== null
				? dispatch({
						type: "set_filter_completed",
						payload: parseInt(res, 10),
				  })
				: null
		)
		.catch((err) => {
			console.log(`AsyncStorage get filterCompleted - ${err}`);
		});
	await AsyncStorage.getItem("sortBy")
		.then((res) =>
			res !== null
				? dispatch({
						type: "set_sort_by",
						payload: res,
				  })
				: null
		)
		.catch((err) => {
			console.log(`AsyncStorage get sortBy - ${err}`);
		});
	await AsyncStorage.getItem("showLate")
		.then((res) =>
			res !== null
				? dispatch({
						type: "set_show_late",
						payload: res === "true",
				  })
				: null
		)
		.catch((err) => {
			console.log(`AsyncStorage get showLate - ${err}`);
		});
	dispatch({ type: "finished_local" });
};

const refresh = (dispatch) => async () => {
	dispatch({ type: "start_refresh" });
};

export const { Provider, Context } = createDataContext(
	filterReducer,
	{ tryGetLocalFilters, updateState, refresh },
	{
		pageSize: 20,
		filterCompleted: 0,
		sortBy: "deadline",
		fetchedLocal: false,
		showLate: true,
		refreshBuffer: false,
	}
);
