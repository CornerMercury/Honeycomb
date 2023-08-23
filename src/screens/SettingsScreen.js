import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Switch } from "react-native";

import { Context as ThemeContext } from "../context/ThemeContext";

const SettingsScreen = () => {
	const {
		state: { theme },
		setTheme,
	} = useContext(ThemeContext);
	const [styles, setStyles] = useState({});
	const [isDarkTheme, setIsDarkTheme] = useState(theme.name === "dark");

	useEffect(() => {
		setStyles(getStyles(theme));
	}, [theme]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.outerView}>
				<View style={styles.innerView}>
					<Text style={styles.switchText}>Enable dark theme</Text>
					<Switch
						trackColor={{ false: "gray", true: "#00bb00" }}
						thumbColor={isDarkTheme ? theme.colors.secondary : "white"}
						onValueChange={() => {
							// isDarkTheme hasn't updated yet so it's inverted
							setTheme(isDarkTheme ? "lightTheme" : "darkTheme");
							setIsDarkTheme((previousState) => !previousState);
						}}
						value={isDarkTheme}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default SettingsScreen;

const getStyles = ({ colors }) =>
	StyleSheet.create({
		outerView: {
			marginHorizontal: 10,
			backgroundColor: colors.primary,
			borderRadius: 5,
			margin: 5,
			padding: 5,
			borderWidth: 1,
			borderColor: colors.primaryBorder,
		},
		innerView: {
			flexDirection: "row",
			paddingHorizontal: 5,
			paddingVertical: 1,
			alignItems: "center",
		},
		switchText: {
			fontSize: 17,
			flex: 1,
			color: colors.text,
		},
	});
