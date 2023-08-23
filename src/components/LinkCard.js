import React, { useEffect, useState } from "react";
import {
	TouchableOpacity,
	Text,
	Linking,
	StyleSheet,
	View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";

const LinkCard = ({ url, title = null, description = null, theme }) => {
	const [styles, setStyles] = useState({});
	useEffect(() => {
		setStyles(getStyles(theme));
	}, []);

	// The api has a typo in it for the T-levels URL
	url = url.trim();
	return (
		<TouchableOpacity
			style={styles.resourceView}
			onPress={() => Linking.openURL(url)}
		>
			<MaterialCommunityIcons
				name="link-variant"
				style={styles.resourceIcon}
				color={theme.colors.text}
			/>
			<View>
				<Text style={styles.title}>{title !== null ? title : url}</Text>
				{description !== null ? (
					<Text style={styles.description}>{description}</Text>
				) : null}
			</View>
		</TouchableOpacity>
	);
};

const getStyles = ({ colors }) =>
	StyleSheet.create({
		resourceIcon: {
			fontSize: 16,
			marginRight: 5,
			marginTop: 2,
		},
		resourceView: {
			padding: 3,
			backgroundColor: colors.secondary,
			borderRadius: 3,
			marginVertical: 5,
			flexDirection: "row",
			alignItems: "center",
			paddingRight: 20,
			paddingLeft: 5,
		},
		title: {
			color: colors.text,
			fontSize: 14,
		},
		description: {
			color: colors.smallText,
			fontSize: 10,
		},
	});

export default LinkCard;
