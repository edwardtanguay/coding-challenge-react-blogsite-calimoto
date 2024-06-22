import { NavLink } from "react-router-dom";

export const Page404 = () => {
	return (
		<div className="page404">
			<section>404</section>
			<p>
				Please <NavLink to="/">return to the site</NavLink>.
			</p>
		</div>
	);
};
