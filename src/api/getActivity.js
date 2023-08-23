import BASE_URL from "./BASE_URL";

const getActivity = async (authState, page, type, timescale) => {
	try {
		const activityResponse = await fetch(
			`${BASE_URL}/planner/students/${authState.userId}/feed?PageIndex=${page}&pageSize=20&FeedType=${type}&CreatedDate=${timescale}`,
			{
				headers: new Headers({
					authorization: `Bearer ${authState.accessToken}`,
				}),
			}
		);
		return (await activityResponse.json()).items;
	} catch (err) {
		console.log(`Activity Err - ${err}`);
	}
};

export default getActivity;
