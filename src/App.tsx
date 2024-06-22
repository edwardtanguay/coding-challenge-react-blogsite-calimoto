import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

function App() {
	return (
		<section className="siteContent">
			<Header />
			<main>
				<Outlet />
			</main>
		</section>
	);
}

export default App;
