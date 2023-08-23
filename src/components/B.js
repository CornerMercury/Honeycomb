import { Text } from "react-native";

// bold component
export default ({ children }) => (
	<Text
		style={{
			fontWeight: "bold",
		}}
	>
		{children}
	</Text>
);
