import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import Loader from "../components/Loader";
import NoData from "../components/NoData";

const PaginatedFlatList = ({
	getItems,
	renderItem,
	keyExtractor,
	orderItems = (items) => items,
	refreshState = undefined,
	refreshCondition = true,
	showsVerticalScrollIndicator = true,
	onEndReachedThreshold = 0,
}) => {
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(0);
	const [isRefreshing, setIsRefreshing] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [onEndReachedHasMomentum, setOnEndReachedHasMomentum] = useState(false);

	useEffect(() => {
		refreshCondition ? handleRefresh() : null;
	}, [refreshState]);

	useEffect(() => {
		isRefreshing || isLoading ? loadMoreItems() : null;
	}, [isRefreshing, isLoading]);

	const handleLoadMore = () => {
		if (!onEndReachedHasMomentum) {
			setOnEndReachedHasMomentum(false);
			setPage(page + 1);
			setIsLoading(true);
		}
	};

	const handleRefresh = () => {
		setPage(0);
		setIsRefreshing(true);
	};

	const loadMoreItems = async () => {
		const itemsResponse = await getItems(page);
		itemsResponse !== undefined
			? isRefreshing
				? setItems(orderItems(itemsResponse))
				: setItems(orderItems([...items, ...itemsResponse]))
			: handleRefresh();
		setIsRefreshing(false);
		setIsLoading(false);
	};

	return (
		<>
			{!isRefreshing ? (
				<FlatList
					data={items}
					keyExtractor={keyExtractor}
					onEndReachedThreshold={onEndReachedThreshold}
					onEndReached={handleLoadMore}
					onMomentumScrollBegin={() => setOnEndReachedHasMomentum(true)}
					refreshing={isRefreshing}
					onRefresh={handleRefresh}
					showsVerticalScrollIndicator={showsVerticalScrollIndicator}
					renderItem={renderItem}
					ListEmptyComponent={<NoData />}
					contentContainerStyle={{ flexGrow: 1 }}
				/>
			) : (
				<Loader />
			)}
		</>
	);
};

export default PaginatedFlatList;
