import { NavLink } from "react-router-dom";
import { Nav } from "./Nav";

export const Header = () => {
	return (
		<div>
			<div className="pageHeader">
				<h1>My Writings</h1>
				<NavLink to="/making-of">making of</NavLink>
			</div>
			<Nav />
		</div>
	);
};
