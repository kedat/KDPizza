import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<div className="mx-3 md:mx-20">{children}</div>
			<Footer />
		</>
	);
};

export default Layout;
