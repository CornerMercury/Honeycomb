import BASE_URL from "./BASE_URL";

const getAssignments = async (authState, page, filterState) => {
	try {
		const assignmentsResponse = await fetch(
			`${BASE_URL}/planner/students/${authState.userId}/assignmentstiny?pageIndex=${page}&filter=${filterState.filterCompleted}&pageSize=${filterState.pageSize}`,
			{
				headers: new Headers({
					authorization: `Bearer ${authState.accessToken}`,
				}),
			}
		);
		return (await assignmentsResponse.json()).items;
	} catch (err) {
		console.log(`Assignments Err - ${err}`);
	}
};

export default getAssignments;
