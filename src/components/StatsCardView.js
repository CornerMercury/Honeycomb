import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import Loader from "../components/Loader";
import getStats from "../api/getStats";
import StatsCard from "../components/StatsCard";

const StatsCardView = ({ styles, authState }) => {
	const [stats, setStats] = useState({});

	useEffect(() => {
		updateStats();
	}, []);

	const updateStats = async () => {
		setStats(await getStats(authState));
	};

	return Object.keys(stats).length !== 0 ? (
		<>
			<View style={{ alignItems: "center" }}>
				<View style={styles.titleContainer}>
					<Text style={styles.boldText}>
						{stats.firstName} {stats.lastName} - {stats.tutorGroup.friendlyName}
					</Text>
				</View>
			</View>
			<View style={styles.rowContainer}>
				<StatsCard
					iconName="clipboard-check"
					value={`${stats.pastoral.attendance.toFixed(2)}%`}
					header="Attendance"
				/>
				<StatsCard
					iconName="clipboard-clock"
					value={stats.pastoral.lates}
					header={stats.pastoral.lates !== 1 ? "Lates" : "Late"}
				/>
				<StatsCard
					iconName="clipboard-alert"
					value={stats.pastoral.absences}
					header={stats.pastoral.absences !== 1 ? "Absences" : "Absence"}
				/>
			</View>
			<View style={styles.rowContainer}>
				<StatsCard
					iconName="thumb-up"
					value={stats.pastoral.rewardPoints}
					header={stats.pastoral.rewardPoints !== 1 ? "Rewards" : "Reward"}
				/>
				<StatsCard
					iconName="thumb-down"
					value={stats.pastoral.behaviourPoints}
					header={
						stats.pastoral.behaviourPoints !== 1 ? "Behaviours" : "Behaviour"
					}
				/>
			</View>
		</>
	) : (
		<Loader />
	);
};

export default StatsCardView;
