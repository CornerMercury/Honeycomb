import React, { useContext, useState, useEffect } from "react";
import {
	View,
	SafeAreaView,
	Text,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as FilterContext } from "../context/FilterContext";
import { Context as ThemeContext } from "../context/ThemeContext";
import { Context as AssignmentContext } from "../context/AssignmentContext";
import getAssignments from "../api/getAssignments";
import PaginatedFlatList from "../components/PaginatedFlatList";
import { format } from "date-fns";

const AssignmentListScreen = ({ navigation }) => {
	const { state: authState } = useContext(AuthContext);
	const { state: filterState, tryGetLocalFilters } = useContext(FilterContext);
	const { state: assignmentState } = useContext(AssignmentContext);
	const {
		state: { theme },
	} = useContext(ThemeContext);
	const [styles, setStyles] = useState({});

	useEffect(() => {
		setStyles(getStyles(theme));
	}, [theme]);

	useEffect(() => {
		tryGetLocalFilters();
	}, []);

	const getAssignmentsFromWithinChild = async (page) => {
		return (await getAssignments(authState, page, filterState)).filter(
			(assignment) => !assignmentState.blacklisted_ids.includes(assignment.id)
		);
	};

	const filterItems = (item) => {
		return filterState.showLate ? true : !item.isOverdue;
	};

	const orderAssignments = (items) => {
		return items
			.filter(filterItems)
			.sort(
				(a, b) =>
					new Date(b[filterState.sortBy]) - new Date(a[filterState.sortBy])
			);
	};

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => navigation.navigate("AssignmentDetail", { id: item.id })}
				style={styles.item}
			>
				<View style={styles.infoView}>
					<Text style={styles.titleText}>{item.title}</Text>
					<Text style={styles.infoText}>
						{item.setBy.title} {item.setBy.lastName}{" "}
					</Text>
				</View>
				{/* displays complete, late or the date due in */}
				<View style={styles.timeView}>
					{item.isComplete ? (
						<View
							style={[styles.completeStateView, { backgroundColor: "#339900" }]}
						>
							<Text style={styles.timeText}>Complete</Text>
						</View>
					) : item.isOverdue ? (
						<View
							style={[styles.completeStateView, { backgroundColor: "#BB0000" }]}
						>
							<Text style={styles.timeText}>Late</Text>
						</View>
					) : (
						<View style={{ flexDirection: "row" }}>
							<View style={[styles.deadlineView, { marginRight: 5 }]}>
								<AntDesign name="clockcircle" style={styles.clockIcon} />
								<MaterialCommunityIcons
									name="timer-sand"
									style={styles.clockIcon}
								/>
							</View>
							<View style={styles.deadlineView}>
								<Text style={styles.infoText}>
									{format(new Date(item.deadline), "dd/MM/yyyy")}
								</Text>
								<Text style={styles.infoText}>
									{"< "}
									{Math.ceil(
										(new Date(item.deadline) - new Date().getTime()) /
											(1000 * 3600 * 24)
									)}{" "}
									days
								</Text>
							</View>
						</View>
					)}
				</View>
			</TouchableOpacity>
		);
	};

	return filterState.fetchedLocal ? (
		<SafeAreaView style={{ flex: 1 }}>
			<PaginatedFlatList
				getItems={getAssignmentsFromWithinChild}
				keyExtractor={(assignment) => assignment.id}
				orderItems={orderAssignments}
				renderItem={renderItem}
				refreshState={[filterState, assignmentState.blacklisted_ids]}
				refreshCondition={filterState.fetchedLocal}
				showsVerticalScrollIndicator={false}
				onEndReachedThreshold={2}
			/>
		</SafeAreaView>
	) : null;
};

const getStyles = ({ colors }) =>
	StyleSheet.create({
		item: {
			backgroundColor: colors.primary,
			borderRadius: 5,
			marginHorizontal: 10,
			margin: 5,
			padding: 5,
			flexDirection: "row",
			borderWidth: 1,
			borderColor: colors.primaryBorder,
		},
		infoView: {
			flexDirection: "column",
			flex: 3,
			marginHorizontal: 3,
		},
		timeView: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			padding: 3,
		},
		completeStateView: {
			paddingVertical: 1,
			paddingHorizontal: 4,
			borderRadius: 5,
		},
		titleText: {
			fontWeight: "bold",
			fontSize: 16,
			color: colors.text,
		},
		timeText: {
			color: "white",
			fontWeight: "bold",
			fontSize: 16,
		},
		infoText: {
			color: colors.smallText,
			fontSize: 12,
		},
		clockIcon: {
			fontSize: 15,
			color: colors.smallText,
		},
		deadlineView: {
			justifyContent: "space-evenly",
			flexDirection: "column",
		},
	});

export default AssignmentListScreen;
