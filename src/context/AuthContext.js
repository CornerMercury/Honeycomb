import createDataContext from "./createDataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "../tools/jwtDecoder";

const getUserId = (accessToken) => {
	return accessToken != null ? jwtDecode(accessToken).id : null;
};

const authReducer = (state, action) => {
	switch (action.type) {
		case "login":
			return {
				...state,
				accessToken: action.payload,
				userId: getUserId(action.payload),
				errorMessage: "",
				isSignedIn: true,
			};
		case "set_error_message":
			return { ...state, errorMessage: action.payload };
		case "signout":
			return {
				...state,
				token: null,
				userId: null,
				errorMessage: "",
				isSignedIn: false,
			};
		case "attempted_local":
			return { ...state, hasAttemptedLocalLogin: true };
		default:
			return state;
	}
};

// Error messages suck so this converts some that I've worked out
const convertErrorDescription = (username, description) => {
	switch (description) {
		case `The user with username '${username}' is not an active user.`:
			return "You are trying too often, try again later.";
		default:
			return description;
	}
};

const login =
	(dispatch) =>
	async ({ username, password }) => {
		try {
			tokenResponse = await (
				await fetch("https://beehiveapi.lionhearttrust.org.uk/token", {
					method: "POST",
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					body: `grant_type=password&username=${username}&password=${password}&client_id=mobile`,
				})
			).json();
			if (tokenResponse.hasOwnProperty("access_token")) {
				AsyncStorage.setItem("accessToken", tokenResponse.access_token);
				dispatch({ type: "login", payload: tokenResponse.access_token });
			} else {
				// Error sent back as response
				throw tokenResponse;
			}
		} catch (err) {
			console.log(err);
			err.hasOwnProperty("error_description")
				? dispatch({
						type: "set_error_message",
						payload: convertErrorDescription(username, err.error_description),
				  })
				: dispatch({
						type: "set_error_message",
						payload:
							"Something went wrong with log in (possibly a network issue).",
				  });
		}
	};

const signout = (dispatch) => async () => {
	await AsyncStorage.removeItem("accessToken");
	dispatch({ type: "signout" });
};

const clearErrorMessage = (dispatch) => () => {
	dispatch({ type: "set_error_message", payload: "" });
};

const tryLocalLogIn = (dispatch) => async () => {
	const accessToken = await AsyncStorage.getItem("accessToken");
	if (accessToken) {
		dispatch({ type: "login", payload: accessToken });
	}

	dispatch({ type: "attempted_local" });
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ login, signout, clearErrorMessage, tryLocalLogIn },
	{
		accessToken: null,
		userId: null,
		errorMessage: "",
		hasAttemptedLocalLogin: false,
		isSignedIn: false,
	}
);
