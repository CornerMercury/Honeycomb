import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import downloadFile from "../tools/downloadFile";

const FileCard = ({
	filename,
	description = null,
	fileId,
	authState,
	theme,
}) => {
	const [styles, setStyles] = useState({});

	useEffect(() => {
		setStyles(getStyles(theme));
	}, []);

	return (
		<TouchableOpacity
			style={styles.resourceView}
			onPress={() => downloadFile(authState, filename, fileId)}
		>
			<FontAwesome
				name="file-pdf-o"
				style={styles.resourceIcon}
				color={theme.colors.text}
			/>
			<View>
				<Text style={styles.title}>{filename}</Text>
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

export default FileCard;
