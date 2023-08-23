import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Context as ThemeContext } from "../context/ThemeContext";
import AccountScreen from "../screens/AccountScreen";
import LinkScreen from "../screens/LinkScreen";
import TimetableScreen from "../screens/TimetableScreen";
import SettingsScreen from "../screens/SettingsScreen";

const AccountStack = createNativeStackNavigator();

const AccountFlow = () => {
	const {
		state: { theme },
	} = useContext(ThemeContext);

	return (
		<AccountStack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: theme.colors.header },
				headerTitleStyle: { color: theme.colors.text },
				headerTintColor: theme.colors.text,
				animation: "fade",
			}}
		>
			<AccountStack.Screen
				name={"Account"}
				component={AccountScreen}
				options={{ title: "Account" }}
			/>
			<AccountStack.Screen
				name={"Link"}
				component={LinkScreen}
				options={{ title: "Links" }}
			/>
			<AccountStack.Screen
				name={"Timetable"}
				component={TimetableScreen}
				options={{ title: "Timetable" }}
			/>
			<AccountStack.Screen
				name={"Settings"}
				component={SettingsScreen}
				options={{ title: "Settings" }}
			/>
		</AccountStack.Navigator>
	);
};

export default AccountFlow;
