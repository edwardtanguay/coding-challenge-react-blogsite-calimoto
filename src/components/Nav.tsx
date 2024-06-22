import { NavLink } from "react-router-dom";

export const Nav = () => {
	return <nav>
		<ul>
			<li><NavLink to="/welcome">Welcome</NavLink></li>
			<li><NavLink to="/info">Info</NavLink></li>
			<li><NavLink to="/about">About</NavLink></li>
		</ul>
	</nav>;
};