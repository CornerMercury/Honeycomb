import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import AssignmentListScreen from "../screens/AssignmentListScreen";
import AssignmentDetailScreen from "../screens/AssignmentDetailScreen";
import FilterScreen from "../screens/FilterScreen";
import { Provider as FilterProvider } from "../context/FilterContext";
import { Provider as AssignmentProvider } from "../context/AssignmentContext";
import { Context as ThemeContext } from "../context/ThemeContext";

const AssignmentStack = createNativeStackNavigator();

const AssignmentFlow = ({ navigation }) => {
	const {
		state: { theme },
	} = useContext(ThemeContext);

	return (
		<FilterProvider>
			<AssignmentProvider>
				<AssignmentStack.Navigator
					screenOptions={{
						headerStyle: { backgroundColor: theme.colors.header },
						headerTitleStyle: { color: theme.colors.text },
						headerTintColor: theme.colors.text,
						animation: "fade",
					}}
				>
					<AssignmentStack.Screen
						name={"AssignmentList"}
						component={AssignmentListScreen}
						options={{
							title: "Assignments",
							headerRight: () => (
								<TouchableOpacity onPress={() => navigation.navigate("Filter")}>
									<Ionicons
										name="settings-sharp"
										style={{ fontSize: 35, marginRight: 15 }}
										color={theme.colors.text}
									/>
								</TouchableOpacity>
							),
						}}
					/>
					<AssignmentStack.Screen
						name={"AssignmentDetail"}
						component={AssignmentDetailScreen}
						options={{ title: "Assignment" }}
					/>
					<AssignmentStack.Screen
						name={"Filter"}
						component={FilterScreen}
						options={{ title: "Filter" }}
					/>
				</AssignmentStack.Navigator>
			</AssignmentProvider>
		</FilterProvider>
	);
};

export default AssignmentFlow;
