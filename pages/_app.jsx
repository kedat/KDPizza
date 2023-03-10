import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<ThemeProvider attribute="class" enableSystem={true}>
				<Component {...pageProps} />
			</ThemeProvider>
		</Provider>
	);
}

export default MyApp;
