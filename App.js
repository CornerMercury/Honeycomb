import React, { useContext, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as NavigationBar from "expo-navigation-bar";

import {
	Provider as AuthProvider,
	Context as AuthContext,
} from "./src/context/AuthContext";
import {
	Provider as ThemeProvider,
	Context as ThemeContext,
} from "./src/context/ThemeContext";

import LogInScreen from "./src/screens/LogInScreen";
import MainFlow from "./src/flow/MainFlow";

const Stack = createNativeStackNavigator();

const App = () => {
	const { state: authState, tryLocalLogIn } = useContext(AuthContext);
	const {
		state: { theme, hasAttemptedLocalTheme },
		tryLocalTheme,
	} = useContext(ThemeContext);

	DefaultTheme.colors.background = theme.colors.background;
	NavigationBar.setBackgroundColorAsync(theme.colors.header);
	NavigationBar.setButtonStyleAsync(theme.colors.navBarButton);

	useEffect(() => {
		tryLocalLogIn();
		tryLocalTheme();
	}, []);

	if (!(authState.hasAttemptedLocalLogin && hasAttemptedLocalTheme)) {
		return null;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: { backgroundColor: theme.colors.header },
					headerTitleStyle: { color: theme.colors.text },
					statusBarColor: theme.colors.header,
					headerBackVisible: false,
				}}
			>
				{!authState.isSignedIn ? (
					<Stack.Screen
						name="Login"
						component={LogInScreen}
						options={{
							title: "Login",
						}}
					/>
				) : (
					<Stack.Screen
						name="MainFlow"
						component={MainFlow}
						options={{ headerShown: false }}
					/>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default () => {
	return (
		<AuthProvider>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</AuthProvider>
	);
};
