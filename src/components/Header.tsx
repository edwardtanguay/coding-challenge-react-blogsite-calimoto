import { NavLink } from "react-router-dom";
import { Nav } from "./Nav";

export const Header = () => {
	return (
		<div>
			<div className="header">
				<h1>My Writings</h1>
				<NavLink to="/making-of">the making of</NavLink>
			</div>
			<Nav />
		</div>
	);
};
