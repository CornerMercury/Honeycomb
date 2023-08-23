import React, { useEffect, useState } from "react";
import { TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AuthInput = ({ username, setUsername, password, setPassword, theme }) => {
	const [styles, setStyles] = useState(getStyles(theme));
	const [isSecurePassword, setIsSecurePassword] = useState(true);
	const [passwordIcon, setPasswordIcon] = useState("eye");

	useEffect(() => {
		setStyles(getStyles(theme));
	}, [theme]);

	const handleShowPassword = () => {
		setIsSecurePassword(!isSecurePassword);
		passwordIcon === "eye"
			? setPasswordIcon("eye-off")
			: setPasswordIcon("eye");
	};

	return (
		<>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.inputField}
					autoCapitalize="none"
					autoCorrect={false}
					textContentType="username"
					placeholder="Username"
					placeholderTextColor={theme.colors.smallText}
					value={username}
					onChangeText={setUsername}
					maxLength={25}
				/>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					secureTextEntry={isSecurePassword}
					style={styles.inputField}
					autoCapitalize="none"
					autoCorrect={false}
					textContentType="password"
					placeholder="Password"
					placeholderTextColor={theme.colors.smallText}
					value={password}
					onChangeText={setPassword}
					maxLength={25}
				/>
				<TouchableOpacity onPress={handleShowPassword}>
					<Ionicons
						name={passwordIcon}
						size={25}
						color={theme.colors.smallText}
					/>
				</TouchableOpacity>
			</View>
		</>
	);
};

const getStyles = ({ colors }) =>
	StyleSheet.create({
		inputContainer: {
			overflow: "hidden", // Somehow fixes borderRadius issue???
			backgroundColor: colors.tertiary,
			width: "80%",
			borderRadius: 20,
			flexDirection: "row",
			alignItems: "center",
			marginVertical: 8,
			paddingHorizontal: 10,
		},
		inputField: {
			paddingVertical: 15,
			paddingHorizontal: 10,
			fontSize: 20,
			fontWeight: "600",
			color: colors.smallText,
			width: "90%",
		},
	});

export default AuthInput;
