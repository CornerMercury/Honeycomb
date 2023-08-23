import React, { useState, useContext, useEffect } from "react";
import {
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	View,
} from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as ThemeContext } from "../context/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const iconSize = 50;

const AccountScreen = ({ navigation }) => {
	const { signout } = useContext(AuthContext);
	const {
		state: { theme },
	} = useContext(ThemeContext);
	const [styles, setStyles] = useState({});

	useEffect(() => {
		setStyles(getStyles(theme));
	}, [theme]);

	return (
		<SafeAreaView>
			<TouchableOpacity
				style={styles.navigateButton}
				onPress={() => navigation.navigate("Link")}
			>
				<View style={styles.iconView}>
					<MaterialCommunityIcons
						name="link-variant"
						size={iconSize}
						color={theme.colors.smallText}
					/>
				</View>
				<View style={styles.textView}>
					<Text style={styles.navigateText}>Personal Links</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.navigateButton}
				onPress={() => navigation.navigate("Timetable")}
			>
				<View style={styles.iconView}>
					<MaterialCommunityIcons
						name="timetable"
						size={iconSize}
						color={theme.colors.smallText}
					/>
				</View>
				<View style={styles.textView}>
					<Text style={styles.navigateText}>Timetable</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.navigateButton}
				onPress={() => navigation.navigate("Settings")}
			>
				<View style={styles.iconView}>
					<MaterialCommunityIcons
						name="cog"
						size={iconSize}
						color={theme.colors.smallText}
					/>
				</View>
				<View style={styles.textView}>
					<Text style={styles.navigateText}>Settings</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={signout}>
				<Text style={styles.buttonText}>Sign out</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const getStyles = ({ colors }) =>
	StyleSheet.create({
		button: {
			alignSelf: "center",
			paddingHorizontal: 10,
			paddingVertical: 5,
			borderRadius: 5,
			marginVertical: 30,
			backgroundColor: colors.secondary,
		},
		buttonText: {
			fontWeight: "bold",
			fontSize: 26,
			color: colors.text,
		},
		navigateButton: {
			flexDirection: "row",
			paddingVertical: 5,
			backgroundColor: colors.tertiary,
		},
		iconView: {
			flex: 1,
			alignItems: "center",
		},
		textView: {
			flex: 4,
			justifyContent: "center",
			borderLeftWidth: 2,
			borderColor: colors.primaryBorder,
			paddingLeft: 20,
		},
		navigateText: {
			fontSize: 24,
			color: colors.smallText,
			fontWeight: "500",
		},
	});

export default AccountScreen;
