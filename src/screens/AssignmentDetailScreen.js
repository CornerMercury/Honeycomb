import React, { useState, useContext, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TouchableOpacity,
	Alert,
	useWindowDimensions,
} from "react-native";
import { format } from "date-fns";
import RenderHtml from "react-native-render-html";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as ThemeContext } from "../context/ThemeContext";
import { Context as AssignmentContext } from "../context/AssignmentContext";
import Loader from "../components/Loader";
import LinkCard from "../components/LinkCard";
import FileCard from "../components/FileCard";
import getAssignmentInfo from "../api/getAssignmentInfo";
import submitAssignment from "../api/submitAssignment";

const timeFormat = "EEEE, do LLLL uuuu";

const AssignmentDetailScreen = ({ navigation, route }) => {
	const { state: authState } = useContext(AuthContext);
	const {
		state: { theme },
	} = useContext(ThemeContext);
	const { blacklist_id } = useContext(AssignmentContext);
	const { id } = route.params;
	const [assignmentInfo, setAssignmentInfo] = useState({});
	const { width } = useWindowDimensions();
	const [styles, setStyles] = useState({});

	useEffect(() => {
		setStyles(getStyles(theme));
	}, [theme]);

	useEffect(() => {
		updateAssignmentInfo();
	}, []);

	const updateAssignmentInfo = async () => {
		setAssignmentInfo(await getAssignmentInfo(authState, id));
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{Object.keys(assignmentInfo).length !== 0 ? (
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.outerView}>
						<Text style={styles.mainTitle}>{assignmentInfo.title}</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text style={{ color: theme.colors.text }}>
								{assignmentInfo.groups[0].friendlyName}
							</Text>
							{assignmentInfo.isComplete === false &&
							assignmentInfo.isOverdue === false ? (
								<View
									style={{
										flex: 1,
										flexDirection: "row-reverse",
										alignItems: "center",
									}}
								>
									<Text style={styles.timeText}>
										{"< "}
										{Math.ceil(
											(new Date(assignmentInfo.deadline) -
												new Date().getTime()) /
												(1000 * 3600 * 24)
										)}{" "}
										days
									</Text>
									<MaterialCommunityIcons
										name="timer-sand"
										size={17}
										style={styles.timeText}
									/>
								</View>
							) : null}
						</View>
					</View>
					<View style={styles.outerView}>
						<View style={styles.innerView}>
							<Text style={styles.leftTitle}>Deadline</Text>
							<Text style={styles.rightInfo}>
								{format(new Date(assignmentInfo.deadline), timeFormat)}
							</Text>
						</View>
						<View style={styles.halfMargin}></View>
						<View style={styles.innerView}>
							<Text style={styles.leftTitle}>Set By</Text>
							<View style={styles.rightInfo}>
								<Text style={styles.rightText}>
									{assignmentInfo.setBy.title} {assignmentInfo.setBy.lastName}
								</Text>
								<Text style={styles.rightText}>
									{format(new Date(assignmentInfo.setOn), timeFormat)}
								</Text>
							</View>
						</View>
					</View>
					<View style={styles.outerView}>
						<View style={styles.innerView}>
							<Text style={styles.leftTitle}>Details</Text>
							<View style={styles.rightInfo}>
								<RenderHtml
									source={{
										html: assignmentInfo.details,
									}}
									tagsStyles={{
										p: styles.rightText,
										ul: styles.rightText,
										li: styles.rightText,
									}}
									contentWidth={width}
								/>
							</View>
						</View>
					</View>
					{/* files */}
					{assignmentInfo.files.length !== 0 ? (
						<View style={styles.outerView}>
							<View style={styles.innerView}>
								<Text style={styles.leftTitle}>Attachments</Text>
								<View style={styles.rightInfo}>
									{assignmentInfo.files.map(({ filename, id, description }) => {
										return (
											<FileCard
												filename={filename}
												fileId={id}
												description={description}
												key={id}
												authState={authState}
												theme={theme}
											/>
										);
									})}
								</View>
							</View>
						</View>
					) : null}
					{/* links */}
					{assignmentInfo.links.length !== 0 ? (
						<View style={styles.outerView}>
							<View style={styles.innerView}>
								<Text style={styles.leftTitle}>Links</Text>
								<View style={styles.rightInfo}>
									{assignmentInfo.links.map(
										({ url, title, description, id }) => {
											return (
												<LinkCard
													url={url}
													title={title}
													description={description}
													authState={authState}
													key={id}
													theme={theme}
												/>
											);
										}
									)}
								</View>
							</View>
						</View>
					) : null}
					{/* submit section */}
					{assignmentInfo.isComplete ? (
						<View style={[styles.submitView, { backgroundColor: "#339900" }]}>
							<Text style={[styles.submitText, { color: "white" }]}>
								Submitted already
							</Text>
						</View>
					) : (
						<TouchableOpacity
							onPress={() => {
								Alert.alert(
									"Confirm submission",
									"Are you sure you want to submit? This action is irreversible!",
									[
										{
											text: "No",
											style: "cancel",
										},
										{
											text: "Yes",
											onPress: async () => {
												submitAssignment(authState, id);
												setAssignmentInfo({
													...assignmentInfo,
													isComplete: true,
												});
												blacklist_id(assignmentInfo.id);
											},
										},
									]
								);
							}}
							style={[
								styles.submitView,
								{ backgroundColor: theme.colors.secondary },
							]}
						>
							<Text style={styles.submitText}>Submit Assignment</Text>
						</TouchableOpacity>
					)}
				</ScrollView>
			) : (
				<Loader />
			)}
		</SafeAreaView>
	);
};

const getStyles = ({ colors }) =>
	StyleSheet.create({
		outerView: {
			margin: 10,
			padding: 10,
			backgroundColor: colors.primary,
			borderRadius: 3,
			borderWidth: 1,
			borderColor: colors.primaryBorder,
			flexDirection: "column",
		},
		innerView: {
			flexDirection: "row",
		},
		leftTitle: {
			flex: 1,
			fontWeight: "bold",
			fontSize: 16,
			color: colors.text,
		},
		rightInfo: {
			flex: 2,
			color: colors.smallText,
		},
		rightText: {
			color: colors.smallText,
		},
		resourceView: {
			padding: 3,
			backgroundColor: colors.primaryBorder,
			borderRadius: 3,
			marginVertical: 5,
			flexDirection: "row",
		},
		mainTitle: {
			fontWeight: "bold",
			fontSize: 20,
			color: colors.text,
		},
		halfMargin: {
			height: 1,
			backgroundColor: colors.primaryBorder,
			marginVertical: 5,
		},
		submitView: {
			alignSelf: "center",
			paddingHorizontal: 10,
			paddingVertical: 5,
			borderRadius: 5,
			marginBottom: 10,
		},
		submitText: {
			fontWeight: "bold",
			fontSize: 26,
			color: colors.text,
		},
		resourceIcon: {
			fontSize: 16,
			marginRight: 5,
			marginTop: 2,
		},
		timeText: {
			alignSelf: "flex-end",
			color: colors.smallText,
		},
	});

export default AssignmentDetailScreen;
