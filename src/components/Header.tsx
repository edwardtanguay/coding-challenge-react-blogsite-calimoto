import { NavLink } from "react-router-dom";
import { Nav } from "./Nav";

export const Header = () => {
	return (
		<div>
			<div className="header">
				<h1>
					<NavLink to="/" className="mainHeader">
						My Rides
					</NavLink>
				</h1>
				<NavLink to="/making-of" className="makingOf">
					the making of
				</NavLink>
			</div>
			<Nav />
		</div>
	);
};
