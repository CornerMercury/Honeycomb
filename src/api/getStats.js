import BASE_URL from "./BASE_URL";

const getStats = async (authState) => {
	// help the response is 2.68MB how do I request certain fields ahhhhhhh
	try {
		const statsResponse = await fetch(
			`${BASE_URL}/planner/students/${authState.userId}`,
			{
				headers: new Headers({
					authorization: `Bearer ${authState.accessToken}`,
				}),
			}
		);
		return await statsResponse.json();
	} catch (err) {
		console.log(`Stats Err - ${err}`);
	}
};

export default getStats;
