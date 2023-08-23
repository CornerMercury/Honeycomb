import BASE_URL from "./BASE_URL";

const getFileBlob = async (authState, fileId) => {
	try {
		const fileResponse = await fetch(`${BASE_URL}/files/download/${fileId}`, {
			headers: new Headers({
				authorization: `Bearer ${authState.accessToken}`,
			}),
		});
		return await fileResponse.blob();
	} catch (err) {
		console.log(`getFileBlob err - ${err}`);
	}
};

export default getFileBlob;
