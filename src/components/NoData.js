import { View, Text, StyleSheet } from "react-native";

const NoData = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>no data :(</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 20,
		fontWeight: "600",
		color: "red",
	},
});

export default NoData;
