import { NavLink } from "react-router-dom";

export const Nav = () => {
	return <nav>
		<ul>
			<li><NavLink to="/blog">Read</NavLink></li>
			<li><NavLink to="/create-entry">Create Entry</NavLink></li>
		</ul>
	</nav>;
};