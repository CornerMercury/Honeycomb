import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { Context as AuthContext } from "../context/AuthContext";
import { Context as ThemeContext } from "../context/ThemeContext";
import getTimetable from "../api/getTimetable";
import Loader from "../components/Loader";

const TimetableScreen = () => {
	const { state: authState } = useContext(AuthContext);
	const {
		state: { theme },
	} = useContext(ThemeContext);
	const [styles, setStyles] = useState({});
	const [timetable, setTimetable] = useState([]);
	const [timetableColors, setTimetableColors] = useState([]);

	useEffect(() => {
		setStyles(getStyles(theme));
	}, [theme]);

	useEffect(() => {
		updateTimetable();
	}, []);

	const updateTimetable = async () => {
		const timetable = (await getTimetable(authState)).schools[0].cycles[0].days;
		setTimetable(timetable);
		// get unique subjects
		const sortedDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
		timetable.sort(
			(a, b) => sortedDays.indexOf(a.day) - sortedDays.indexOf(b.day)
		);
		const subjectArray = [];
		for (let i = 0; i < timetable.length; i++) {
			const lessons = timetable[i].lessons;
			for (let j = 0; j < lessons.length; j++) {
				const subjectName = lessons[j].subject;
				if (
					!subjectArray.includes(subjectName) &&
					subjectName !== "Self Study"
				) {
					subjectArray.push(subjectName);
				}
			}
		}
		// assign each subject a color
		const timetableColorsTemp = {};
		subjectArray.forEach((subjectName, index) => {
			timetableColorsTemp[subjectName] = theme.colors.timetableColors[index];
		});
		setTimetableColors(timetableColorsTemp);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{timetable.length !== 0 ? (
				<View style={styles.timetableView}>
					<View style={styles.periodsView}>
						<View
							style={{ height: "3%", backgroundColor: theme.colors.primary }}
						/>
						<View>
							{[1, 2, 3, 4, 5, 6, 7].map((period) => (
								<View key={period} style={styles.periodView}>
									<Text style={styles.titleText}>{period}</Text>
								</View>
							))}
						</View>
					</View>
					{timetable.map((day) => (
						<View key={day.day} style={styles.dayView}>
							<View style={styles.dayTitleView}>
								<Text style={styles.dayText}>{day.day}</Text>
							</View>
							<View>
								{day.lessons
									.sort((a, b) => a.period - b.period)
									.map((lesson) =>
										lesson.subject !== "Self Study" ? (
											<View
												key={lesson.period}
												style={[
													styles.lessonView,
													{
														backgroundColor:
															lesson.subject === "Self Study"
																? theme.colors.tertiary
																: timetableColors[lesson.subject],
													},
												]}
											>
												<Text style={styles.titleText}>{lesson.subject}</Text>
												<Text style={styles.infoText}>{lesson.teacher}</Text>
												{lesson.room !== null ? (
													<Text style={styles.infoText}>
														Room {lesson.room}
													</Text>
												) : null}
											</View>
										) : (
											<View
												key={lesson.period}
												style={[
													styles.lessonView,
													{
														backgroundColor: theme.colors.tertiary,
													},
												]}
											/>
										)
									)}
							</View>
						</View>
					))}
				</View>
			) : (
				<Loader />
			)}
		</SafeAreaView>
	);
};

export default TimetableScreen;

const getStyles = ({ colors }) =>
	StyleSheet.create({
		timetableView: {
			flexDirection: "row",
			height: "100%",
		},
		dayView: {
			width: "19%",
		},
		dayTitleView: {
			backgroundColor: colors.primary,
			height: "3%",
		},
		lessonView: {
			height: "14.07%",
			padding: 2,
		},
		periodsView: {
			width: "5%",
		},
		periodView: {
			height: "14.07%",
			alignItems: "center",
			paddingVertical: 2,
		},
		titleText: {
			fontSize: 10,
			fontWeight: "600",
			color: colors.text,
		},
		infoText: {
			fontSize: 9,
			color: colors.smallText,
		},
		dayText: {
			fontSize: 12,
			fontWeight: "bold",
			color: colors.text,
		},
	});
