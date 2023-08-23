import BASE_URL from "./BASE_URL";

const getAssignmentInfo = async (authState, id) => {
	try {
		const assignmentInfoResponse = await fetch(
			`${BASE_URL}/planner/users/${authState.userId}/assignments/${id}`,
			{
				headers: new Headers({
					authorization: `Bearer ${authState.accessToken}`,
				}),
			}
		);
		return await assignmentInfoResponse.json();
	} catch (err) {
		console.log(`AssignmentInfo Err - ${err}`);
	}
};

export default getAssignmentInfo;
