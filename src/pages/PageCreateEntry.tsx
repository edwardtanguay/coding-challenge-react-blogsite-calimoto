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
							<label htmlFor="date">Date:</label>
							<input type="text" name="date" id="date" />
						</div>

						<div className="row">
							<label htmlFor="title">Title:</label>
							<input type="text" name="title" id="title" />
						</div>

						<div className="row">
							<label htmlFor="tags">Tags:</label>
							<input type="text" name="tags" id="tags" />
						</div>

						<div className="row">
							<label htmlFor="body">Body:</label>
							<textarea spellCheck={false} className="body"></textarea>
						</div>
					</div>
				</fieldset>
			</form>
		</>
	);
};
