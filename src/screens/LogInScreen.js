import React, { useState, useContext, useEffect } from "react";
import {
	Text,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	TextInput,
} from "react-native";
import AuthInput from "../components/AuthInput";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as ThemeContext } from "../context/ThemeContext";

const LogInScreen = ({ navigation }) => {
	const {
		state: authState,
		login,
		clearErrorMessage,
	} = useContext(AuthContext);
	const {
		state: { theme },
	} = useContext(ThemeContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [styles, setStyles] = useState({});

	useEffect(() => {
		setStyles(getStyles(theme));
	}, [theme]);

	useEffect(() => {
		const resetState = navigation.addListener("blur", clearErrorMessage);
		return resetState;
	}, [navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.titleText}>Welcome!</Text>
			<Text style={styles.infoText}>Enter details to login</Text>
			<AuthInput
				username={username}
				password={password}
				setUsername={setUsername}
				setPassword={setPassword}
				theme={theme}
			/>
			{authState.errorMessage ? (
				<Text style={styles.errorMessage}>{authState.errorMessage}</Text>
			) : null}
			<TouchableOpacity
				style={styles.button}
				onPress={() => login({ username, password })}
			>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const getStyles = ({ colors }) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
		titleText: {
			color: colors.text,
			fontWeight: "600",
			fontSize: 40,
			marginTop: 20,
		},
		button: {
			backgroundColor: colors.secondary,
			padding: "3%",
			borderRadius: 5,
			width: 200,
			alignItems: "center",
			marginTop: 40,
			marginBottom: "15%",
		},
		input: {
			borderColor: colors.text,
			borderWidth: 1,
			padding: 10,
			width: "80%",
			fontSize: 20,
			borderRadius: 10,
			margin: 10,
			fontWeight: "bold",
		},
		buttonText: {
			fontSize: 20,
			fontWeight: "bold",
			color: colors.text,
		},
		errorMessage: {
			fontSize: 16,
			color: "red",
		},
		infoText: {
			color: colors.smallText,
			fontSize: 16,
			marginBottom: 40,
		},
	});

export default LogInScreen;
