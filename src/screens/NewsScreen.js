import React, { useContext, useEffect, useState } from "react";
import {
	SafeAreaView,
	View,
	StyleSheet,
	Text,
	useWindowDimensions,
} from "react-native";
import getNews from "../api/getNews";
import PaginatedFlatList from "../components/PaginatedFlatList";
import LinkCard from "../components/LinkCard";
import FileCard from "../components/FileCard";
import RenderHtml from "react-native-render-html";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as ThemeContext } from "../context/ThemeContext";
import B from "../components/B";
import { format } from "date-fns";

const timeFormat = "EEEE, do LLLL uuuu, p";
const imageExtensions = [".jpg", ".png"];

const NewsScreen = () => {
	const { state: authState } = useContext(AuthContext);
	const {
		state: { theme },
	} = useContext(ThemeContext);
	const { width } = useWindowDimensions();
	const [styles, setStyles] = useState({});

	useEffect(() => {
		setStyles(getStyles(theme));
	}, [theme]);

	const getNewsFromWithinChild = async (page) => {
		return await getNews(authState, page);
	};

	const constructGroupList = ({ groups }) => {
		const groupsLength = groups.length;
		let stringList = "";
		groups.forEach((group, i) => {
			if (i < groupsLength - 3) {
				stringList += group.name + ", ";
			} else if (i == groupsLength - 2) {
				stringList += group.name + " and ";
			} else {
				stringList += group.name;
			}
		});
		return stringList;
	};

	const filterNonImage = (file) => {
		return !imageExtensions.includes(file.extension);
	};

	const renderItem = ({ item }) => {
		return (
			<View style={styles.item}>
				<View
					style={{
						borderBottomWidth: 1,
						borderColor: theme.colors.primaryBorder,
						paddingBottom: 5,
						marginBottom: 10,
					}}
				>
					<Text style={styles.bigInfoText}>
						<B>
							{item.createdBy.title} {item.createdBy.lastName}
						</B>{" "}
						posted an article in <B>{item.category.name}</B>
						{item.groups.length !== 0 ? (
							<Text>
								{" "}
								for <B>{constructGroupList(item)}</B>
							</Text>
						) : null}
					</Text>
					<Text style={styles.infoText}>
						{format(new Date(item.publishedDate), timeFormat)}
					</Text>
				</View>
				<Text style={styles.titleText}>{item.title}</Text>
				<RenderHtml
					source={{ html: item.content }}
					tagsStyles={{
						p: styles.infoText,
						ul: styles.infoText,
						li: styles.infoText,
					}}
					contentWidth={width}
				/>
				{item.files.filter(filterNonImage).length !== 0 ? (
					<>
						<Text style={styles.bigInfoText}>
							<B>Files</B>
						</Text>
						{item.files
							.filter(filterNonImage)
							.map(({ filename, description, id }) => {
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
					</>
				) : null}
				{item.links.length !== 0 ? (
					<>
						<Text style={styles.bigInfoText}>
							<B>Links</B>
						</Text>
						{item.links.map(({ url, title, description, id }) => {
							return (
								<LinkCard
									url={url}
									title={title}
									description={description}
									key={id}
									theme={theme}
								/>
							);
						})}
					</>
				) : null}
			</View>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<PaginatedFlatList
				getItems={getNewsFromWithinChild}
				keyExtractor={(news) => news.id}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				onEndReachedThreshold={2}
			/>
		</SafeAreaView>
	);
};

const getStyles = ({ colors }) =>
	StyleSheet.create({
		item: {
			backgroundColor: colors.primary,
			borderRadius: 5,
			marginHorizontal: 10,
			margin: 5,
			padding: 5,
			borderWidth: 1,
			borderColor: colors.primaryBorder,
		},
		infoText: {
			color: colors.smallText,
			fontSize: 12,
		},
		bigInfoText: {
			color: colors.text,
			fontSize: 14,
		},
		titleText: {
			color: colors.text,
			fontSize: 16,
			fontWeight: "bold",
		},
	});

export default NewsScreen;
