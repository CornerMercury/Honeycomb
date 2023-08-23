import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Context as ThemeContext } from "../context/ThemeContext";

const StatsCard = (props) => {
	const {
		state: { theme },
	} = useContext(ThemeContext);
	const [styles, setStyles] = useState({});

	useEffect(() => {
		setStyles(getStyles(theme));
	}, [theme]);

	return (
		<View style={styles.container}>
			<MaterialCommunityIcons name={props.iconName} style={styles.icon} />
			<Text style={styles.value}>{props.value}</Text>
			<Text style={styles.header}>{props.header}</Text>
		</View>
	);
};

const getStyles = ({ colors }) =>
	StyleSheet.create({
		container: {
			backgroundColor: colors.primary,
			padding: 5,
			borderRadius: 5,
			borderWidth: 1,
			borderColor: colors.primaryBorder,
			justifyContent: "center",
			alignItems: "center",
			width: "30%",
		},
		icon: {
			fontSize: 40,
			color: colors.secondary,
		},
		value: {
			fontSize: 25,
			fontWeight: "600",
			color: colors.verySmallText,
		},
		header: {
			fontSize: 16,
			fontWeight: "bold",
			color: colors.smallText,
		},
	});

export default StatsCard;
