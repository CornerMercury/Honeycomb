import BASE_URL from "./BASE_URL";

const submitAssignment = (authState, id) => {
	const response = fetch(
		`${BASE_URL}/planner/students/${authState.userId}/assignments/${id}/submit`,
		{
			method: "POST",
			headers: new Headers({
				authorization: `Bearer ${authState.accessToken}`,
				"Content-Type": "application/json",
			}),
			body: JSON.stringify({
				difficulty: null,
				timescale: null,
				comments: null,
				requireAssistance: null,
				understoodRequirements: null,
				studentId: authState.userId,
				assignmentId: id,
			}),
		}
	).catch((err) => console.log(`Submit err - ${err}`));
};

export default submitAssignment;
