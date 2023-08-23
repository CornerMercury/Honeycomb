import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "../theme/themes";
import { Appearance } from "react-native";

const themeReducer = (state, action) => {
	switch (action.type) {
		case "change_theme":
			return { ...state, theme: action.payload };
		case "attempted_local":
			return { ...state, hasAttemptedLocalTheme: true };
		default:
			return state;
	}
};

const themeNameToData = (themeName) => {
	switch (themeName) {
		case "lightTheme":
			return lightTheme;
		case "darkTheme":
			return darkTheme;
		default:
			return lightTheme;
	}
};

const setTheme = (dispatch) => async (themeName) => {
	dispatch({ type: "change_theme", payload: themeNameToData(themeName) });
	AsyncStorage.setItem("themeName", themeName);
};

const tryLocalTheme = (dispatch) => async () => {
	let themeName = await AsyncStorage.getItem("themeName");
	if (themeName === null) {
		const colorScheme = Appearance.getColorScheme();
		if (colorScheme === "light") {
			themeName = "lightTheme";
		} else if (colorScheme === "dark") {
			themeName = "darkTheme";
		} else {
			themeName = "lightTheme";
		}
	}

	dispatch({ type: "change_theme", payload: themeNameToData(themeName) });
	dispatch({ type: "attempted_local" });
};

export const { Provider, Context } = createDataContext(
	themeReducer,
	{ setTheme, tryLocalTheme },
	{ theme: lightTheme, hasAttemptedLocalTheme: false }
);
