export const PageCreateEntry = () => {
	return (
		<>
			<form
				className="createBlogEntry"
				action="#"
				method="post"
				id="contact"
			>
				<fieldset>
					<legend>Create New Blog Entry</legend>

					<div className="rows">
						<div className="row">
							<label htmlFor="fullName">Name:</label>
							<input type="text" name="fullName" id="fullName" />
						</div>

						<div className="row">
							<label htmlFor="email">Email:</label>
							<input type="email" name="email" id="email" />
						</div>

						<div className="row">
							<label htmlFor="phone">Phone:</label>
							<input type="tel" name="phone" id="phone" />
						</div>
					</div>
				</fieldset>
			</form>
		</>
	);
};
