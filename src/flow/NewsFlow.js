import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Context as ThemeContext } from "../context/ThemeContext";
import NewsScreen from "../screens/NewsScreen";

const NewsStack = createNativeStackNavigator();

const NewsFlow = () => {
	const {
		state: { theme },
	} = useContext(ThemeContext);

	return (
		<NewsStack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: theme.colors.header },
				headerTitleStyle: { color: theme.colors.text },
				headerTintColor: theme.colors.text,
				animation: "fade",
			}}
		>
			<NewsStack.Screen
				name={"News"}
				component={NewsScreen}
				options={{ title: "News" }}
			/>
		</NewsStack.Navigator>
	);
};

export default NewsFlow;
