import BASE_URL from "./BASE_URL";

const getNews = async (authState, page) => {
	try {
		const newsResponse = await fetch(
			`${BASE_URL}/feed/users/${authState.userId}?feedItemType=1&pageIndex=${page}&pageSize=5`,
			{
				headers: new Headers({
					authorization: `Bearer ${authState.accessToken}`,
				}),
			}
		);
		return (await newsResponse.json()).items;
	} catch (err) {
		console.log(`News Err - ${err}`);
	}
};

export default getNews;
