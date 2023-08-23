import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as ThemeContext } from "../context/ThemeContext";
import getActivity from "../api/getActivity";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import PaginatedFlatList from "../components/PaginatedFlatList";
import SelectList from "react-native-dropdown-select-list";
import B from "../components/B";
import { format } from "date-fns";
import StatsCardView from "../components/StatsCardView";

const timeFormat = "EEEE, do LLLL uuuu, p";

const typeData = [
	{ key: "null", value: "All Types" },
	{ key: "1", value: "Quiz" },
	{ key: "2", value: "Awards" },
	{ key: "3", value: "Behaviours" },
	{ key: "4", value: "Rewards" },
	{ key: "5", value: "Smart Tasks" },
	{ key: "6", value: "On Call Requests" },
];
const timescaleData = [
	{ key: "null", value: "All Timescales" },
	{ key: "1", value: "Today" },
	{ key: "2", value: "Yesterday" },
	{ key: "3", value: "This Week" },
];

const StatsScreen = () => {
	const { state: authState } = useContext(AuthContext);
	const {
		state: { theme },
	} = useContext(ThemeContext);
	const [type, setType] = useState("null");
	const [timescale, setTimescale] = useState("null");
	const [styles, setStyles] = useState({});

	useEffect(() => {
		setStyles(getStyles(theme));
	}, [theme]);

	const getActivityFromWithinChild = async (page) => {
		return await getActivity(authState, page, type, timescale);
	};

	const ActivityIconView = ({ id, displayName }) => {
		let iconName;
		let IconType;
		let color;
		switch (id) {
			case 1:
				iconName = "chat-question";
				IconType = MaterialCommunityIcons;
				color = theme.colors.secondary;
				break;
			case 2:
				iconName = "award";
				IconType = FontAwesome5;
				color = "#ffd700";
				break;
			case 3:
				iconName = "thumb-down";
				IconType = MaterialCommunityIcons;
				color = "#dd0000";
				break;
			case 4:
				iconName = "thumb-up";
				IconType = MaterialCommunityIcons;
				color = "#00bb00";
				break;
			case 5:
				iconName = "award";
				IconType = FontAwesome5;
				color = "#ffd700";
				break;
			case 6:
				iconName = "call-made";
				IconType = MaterialCommunityIcons;
				color = theme.colors.secondary;
				break;
			default:
				iconName = "question";
				IconType = FontAwesome5;
				color = "#dd0000";
		}
		return (
			<View style={styles.leftView}>
				<IconType name={iconName} size={30} style={{ color }} />
				{displayName !== null ? (
					<View
						style={[styles.iconDisplayNameView, { backgroundColor: color }]}
					>
						<Text style={styles.displayNameText}>{displayName}</Text>
					</View>
				) : null}
			</View>
		);
	};

	const renderFeedItem = ({ item }) => {
		return (
			<View style={styles.item}>
				<ActivityIconView
					id={item.feedTypeId}
					displayName={item.codeDisplayName}
				/>
				<View style={styles.rightView}>
					<Text style={styles.infoText}>
						{format(new Date(item.createdDate), timeFormat)}
					</Text>
					<Text style={styles.bigInfoText}>
						<B>{item.categoryName}</B>
						{item.createdBy !== null ? (
							<Text>
								{" "}
								given by{" "}
								<B>
									{item.createdBy.title} {item.createdBy.lastName}
								</B>
							</Text>
						) : null}
					</Text>
				</View>
			</View>
		);
	};

	return (
		<SafeAreaView style={{ flexDirection: "column", height: "100%" }}>
			<View
				style={[
					styles.splitView,
					{
						justifyContent: "space-evenly",
						borderBottomWidth: 1,
						borderColor: theme.colors.primaryBorder,
					},
				]}
			>
				<StatsCardView styles={styles} authState={authState} />
			</View>
			<View style={styles.splitView}>
				<View style={[styles.item, { marginHorizontal: 3 }]}>
					<View style={{ flex: 1, marginRight: 5 }}>
						<SelectList
							setSelected={setType}
							data={typeData}
							search={false}
							placeholder={typeData[0].value}
							maxHeight={120}
							boxStyles={styles.selectBox}
							inputStyles={styles.input}
							dropdownStyles={styles.selectBox}
							dropdownTextStyles={styles.infoText}
						/>
					</View>
					<View style={{ flex: 1 }}>
						<SelectList
							setSelected={setTimescale}
							data={timescaleData}
							search={false}
							placeholder={timescaleData[0].value}
							maxHeight={120}
							boxStyles={styles.selectBox}
							inputStyles={styles.input}
							dropdownStyles={styles.selectBox}
							dropdownTextStyles={styles.infoText}
						/>
					</View>
				</View>
				<PaginatedFlatList
					getItems={getActivityFromWithinChild}
					keyExtractor={(item) => item.itemId}
					renderItem={renderFeedItem}
					showsVerticalScrollIndicator={false}
					onEndReachedThreshold={2}
					refreshState={[type, timescale]}
				/>
			</View>
		</SafeAreaView>
	);
};

const getStyles = ({ colors }) =>
	StyleSheet.create({
		splitView: {
			flex: 1,
		},
		rowContainer: {
			flexDirection: "row",
			justifyContent: "space-evenly",
		},
		boldText: {
			fontWeight: "bold",
			fontSize: 18,
			color: colors.text,
		},
		titleContainer: {
			backgroundColor: colors.primary,
			paddingHorizontal: 10,
			paddingVertical: 3,
			borderRadius: 5,
			borderWidth: 1,
			borderColor: colors.primaryBorder,
			justifyContent: "center",
			alignItems: "center",
		},
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
		leftView: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		rightView: {
			flex: 5,
			justifyContent: "center",
		},
		iconDisplayNameView: {
			paddingVertical: 1,
			paddingHorizontal: 4,
			borderRadius: 5,
		},
		displayNameText: {
			color: "white",
			fontSize: 12,
		},
		infoText: {
			color: colors.smallText,
			fontSize: 12,
		},
		bigInfoText: {
			color: colors.text,
			fontSize: 14,
		},
		selectBox: {
			borderColor: colors.verySmallText,
			borderRadius: 5,
		},
		input: {
			color: colors.smallText,
			fontSize: 16,
			fontWeight: "500",
		},
	});

export default StatsScreen;
