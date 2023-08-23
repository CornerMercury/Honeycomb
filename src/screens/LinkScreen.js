import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as ThemeContext } from "../context/ThemeContext";
import Loader from "../components/Loader";
import getLinks from "../api/getLinks";
import LinkCard from "../components/LinkCard";

const LinkScreen = () => {
	const { state: authState } = useContext(AuthContext);
	const {
		state: { theme },
	} = useContext(ThemeContext);
	const [links, setLinks] = useState([]);
	const [styles, setStyles] = useState({});

	useEffect(() => {
		setStyles(getStyles(theme));
	}, [theme]);

	useEffect(() => {
		updateLinks();
	}, []);

	const updateLinks = async () => {
		setLinks(await getLinks(authState));
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			{links.length !== 0 ? (
				<ScrollView showsVerticalScrollIndicator={false}>
					{links.map((item) => {
						return (
							<View style={styles.item} key={item.name}>
								<Text style={styles.titleText}>{item.name}</Text>
								{item.links.map(({ id, url, title, description }) => {
									return (
										<LinkCard
											key={id}
											url={url}
											title={title}
											description={description}
											theme={theme}
										/>
									);
								})}
							</View>
						);
					})}
				</ScrollView>
			) : (
				<Loader />
			)}
		</SafeAreaView>
	);
};

const getStyles = ({ colors }) =>
	StyleSheet.create({
		item: {
			backgroundColor: colors.primary,
			borderRadius: 5,
			marginHorizontal: 10,
			marginVertical: 10,
			padding: 5,
			borderWidth: 1,
			borderColor: colors.primaryBorder,
		},
		titleText: {
			fontWeight: "bold",
			fontSize: 16,
			color: colors.text,
		},
	});

export default LinkScreen;
