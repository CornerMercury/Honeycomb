import React, { useState, useContext, useEffect } from "react";
import {
	Text,
	StyleSheet,
	SafeAreaView,
	View,
	ScrollView,
	TouchableOpacity,
	Switch,
} from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { Context as FilterContext } from "../context/FilterContext";
import { Context as ThemeContext } from "../context/ThemeContext";

const FilterScreen = ({ navigation }) => {
	const { state: filterState, updateState } = useContext(FilterContext);
	const {
		state: { theme },
	} = useContext(ThemeContext);
	const [tempPageSize, setTempPageSize] = useState(filterState.pageSize);
	const [tempFilterCompleted, setTempFilterCompleted] = useState(
		filterState.filterCompleted === 0
	);
	const [tempShowLate, setTempShowLate] = useState(filterState.showLate);
	const [tempSortBy, setTempSortBy] = useState(
		filterState.sortBy === "deadline"
	);
	const [styles, setStyles] = useState({});

	useEffect(() => {
		setStyles(getStyles(theme));
	}, [theme]);

	const B = ({ children, condition }) => (
		<Text
			style={{
				fontWeight: "bold",
				color: condition ? "#00bb00" : theme.colors.text,
			}}
		>
			{children}
		</Text>
	);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.outerView}>
					<View style={styles.innerView}>
						<Text style={styles.switchText}>Show completed assignments</Text>
						<Switch
							trackColor={{
								false: "gray",
								true: "#00bb00",
							}}
							thumbColor={
								tempFilterCompleted ? theme.colors.secondary : "white"
							}
							onValueChange={() =>
								setTempFilterCompleted((previousState) => !previousState)
							}
							value={tempFilterCompleted}
						/>
					</View>
					<View style={styles.innerView}>
						<Text style={styles.switchText}>Show late assignments</Text>
						<Switch
							trackColor={{
								false: "gray",
								true: "#00bb00",
							}}
							thumbColor={tempShowLate ? theme.colors.secondary : "white"}
							onValueChange={() =>
								setTempShowLate((previousState) => !previousState)
							}
							value={tempShowLate}
						/>
					</View>
					<View style={styles.innerView}>
						<Text style={styles.switchText}>
							Sort by <B condition={tempSortBy === false}>date set</B> or{" "}
							<B condition={tempSortBy === true}>deadline</B>
						</Text>
						<Switch
							trackColor={{ false: "gray", true: "#00bb00" }}
							thumbColor={tempSortBy ? theme.colors.secondary : "white"}
							onValueChange={() =>
								setTempSortBy((previousState) => !previousState)
							}
							value={tempSortBy}
						/>
					</View>
				</View>
				<View style={styles.outerView}>
					<Text style={styles.titleText}>Assignments per fetch</Text>
					<Text style={styles.infoText}>
						The number of assignments that are fetched when more assignments are
						loaded.{"\n\n"}Larger numbers mean longer loading times.{"\n"}
					</Text>
					<Text style={styles.valueText}>{tempPageSize} assignments</Text>
					<Slider
						minimumValue={10}
						maximumValue={100}
						minimumTrackTintColor={"#00bb00"}
						maximumTrackTintColor="#808080"
						thumbTintColor={theme.colors.secondary}
						trackClickable={true}
						onValueChange={(valueArr) => setTempPageSize(valueArr[0])}
						step={1}
						value={tempPageSize}
					/>
				</View>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						updateState({
							pageSize: tempPageSize,
							filterCompleted: tempFilterCompleted ? 0 : 1,
							showLate: tempShowLate,
							sortBy: tempSortBy ? "deadline" : "setOn",
						});
						navigation.pop();
					}}
				>
					<Text style={styles.buttonText}>Apply Filters</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

const getStyles = ({ colors }) =>
	StyleSheet.create({
		container: {
			flex: 1,
			marginHorizontal: 5,
		},
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
		titleText: {
			fontWeight: "bold",
			fontSize: 22,
			marginBottom: 5,
			color: colors.text,
		},
		infoText: {
			color: colors.smallText,
			fontSize: 14,
			alignSelf: "center",
		},
		valueText: {
			fontSize: 20,
			fontWeight: "500",
			alignSelf: "center",
			marginTop: 5,
			color: colors.text,
		},
		button: {
			alignSelf: "center",
			paddingHorizontal: 10,
			paddingVertical: 5,
			borderRadius: 5,
			margin: 5,
			backgroundColor: colors.secondary,
		},
		buttonText: {
			fontWeight: "bold",
			fontSize: 26,
			color: colors.text,
		},
		switchText: {
			fontSize: 17,
			flex: 1,
			color: colors.text,
		},
	});

export default FilterScreen;
