import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Context as ThemeContext } from "../context/ThemeContext";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import AssignmentFlow from "./AssignmentFlow";
import NewsFlow from "./NewsFlow";
import StatsFlow from "./StatsFlow";
import AccountFlow from "./AccountFlow";

const Tab = createBottomTabNavigator();

const MainFlow = () => {
	const {
		state: { theme },
	} = useContext(ThemeContext);

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarStyle: {
					backgroundColor: theme.colors.header,
					borderTopWidth: 0,
				},
				tabBarIcon: ({ color }) => {
					let iconName;
					let IconType;
					switch (route.name) {
						case "AssignmentFlow":
							iconName = "assignment";
							IconType = MaterialIcons;
							break;
						case "NewsFlow":
							iconName = "newspaper-variant";
							IconType = MaterialCommunityIcons;
							break;
						case "StatsFlow":
							iconName = "bar-chart";
							IconType = MaterialIcons;
							break;
						case "AccountFlow":
							iconName = "account-circle";
							IconType = MaterialIcons;
							break;
						default:
							iconName = "assignment";
							IconType = MaterialIcons;
					}
					return <IconType name={iconName} size={40} color={color} />;
				},
				tabBarActiveTintColor: theme.colors.secondary,
				tabBarInactiveTintColor: theme.colors.smallText,
				tabBarShowLabel: false,
			})}
		>
			<Tab.Screen name="AssignmentFlow" component={AssignmentFlow} />
			<Tab.Screen name="NewsFlow" component={NewsFlow} />
			<Tab.Screen name="StatsFlow" component={StatsFlow} />
			<Tab.Screen name="AccountFlow" component={AccountFlow} />
		</Tab.Navigator>
	);
};

export default MainFlow;
