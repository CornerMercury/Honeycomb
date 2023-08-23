import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import getFileBlob from "../api/getFileBlob";

// const downloadAndroid = async (fileUri) => {
// 	await ImagePicker.requestMediaLibraryPermissionsAsync();
// 	try {
// 		const asset = await MediaLibrary.createAssetAsync(fileUri);
// 		const album = await MediaLibrary.getAlbumAsync("Download");
// 		if (album == null) {
// 			await MediaLibrary.createAlbumAsync("Download", asset, false);
// 		} else {
// 			await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
// 		}
// 	} catch (err) {
// 		console.log(`downloadAndroid err - ${err}`);
// 	}
// };

// const downloadIOS = (fileUri) => {
// 	const UTI = "public.item";
// 	Sharing.shareAsync(fileUri, { UTI });
// };

const downloadFile = async (authState, filename, fileId) => {
	const blob = await getFileBlob(authState, fileId);
	const fr = new FileReader();
	// Runs whenever file is loaded
	fr.onload = () => {
		const fileUri = `${FileSystem.documentDirectory}/${filename}`;
		// Convert binary file to base64
		FileSystem.writeAsStringAsync(fileUri, fr.result.split(",")[1], {
			encoding: FileSystem.EncodingType.Base64,
		});
		// Platform.OS === "android" ? downloadAndroid(fileUri) : downloadIOS(fileUri);
		// I give up just share it instead
		Sharing.shareAsync(fileUri);
	};

	fr.readAsDataURL(blob);
};

export default downloadFile;
