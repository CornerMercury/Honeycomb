import BASE_URL from "./BASE_URL";

const getTimetable = async (authState) => {
	try {
		const timetableResponse = await fetch(
			`${BASE_URL}/planner/users/${authState.userId}/timetable`,
			{
				headers: new Headers({
					authorization: `Bearer ${authState.accessToken}`,
				}),
			}
		);
		return await timetableResponse.json();
	} catch (err) {
		console.log(`Timetable Err - ${err}`);
	}
};

export default getTimetable;
