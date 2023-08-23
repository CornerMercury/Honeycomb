import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Context as ThemeContext } from "../context/ThemeContext";
import StatsScreen from "../screens/StatsScreen";

const StatsStack = createNativeStackNavigator();

const StatsFlow = () => {
	const {
		state: { theme },
	} = useContext(ThemeContext);

	return (
		<StatsStack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: theme.colors.header },
				headerTitleStyle: { color: theme.colors.text },
				headerTintColor: theme.colors.text,
				animation: "fade",
			}}
		>
			<StatsStack.Screen
				name={"Stats"}
				component={StatsScreen}
				options={{ title: "Stats" }}
			/>
		</StatsStack.Navigator>
	);
};

export default StatsFlow;
