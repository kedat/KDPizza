import { useTheme } from "next-themes";
import { UilSun, UilMoon } from "@iconscout/react-unicons";

const SetTheme = () => {
	const { theme, setTheme } = useTheme();

	return (
		<div>
			{theme === "dark" ? (
				<button button onClick={() => setTheme("light")}>
					<UilSun />
				</button>
			) : (
				<button onClick={() => setTheme("dark")}>
					<UilMoon />
				</button>
			)}
		</div>
	);
};
export default SetTheme;
