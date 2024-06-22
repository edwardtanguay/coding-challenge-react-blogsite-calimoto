import { NavLink } from "react-router-dom";

export const Page404 = () => {
	return (
		<div>
			<p>404</p>
			<p>
				Please <NavLink to="/">return to the site</NavLink>.
			</p>
		</div>
	);
};
