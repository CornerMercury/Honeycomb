import BASE_URL from "./BASE_URL";

const getLinks = async (authState) => {
	try {
		const linksResponse = await fetch(`${BASE_URL}/planner/links`, {
			headers: new Headers({
				authorization: `Bearer ${authState.accessToken}`,
			}),
		});
		return await linksResponse.json();
	} catch (err) {
		console.log(`getLinks err - ${err}`);
	}
};

export default getLinks;
