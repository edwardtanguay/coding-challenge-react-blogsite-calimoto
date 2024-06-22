import React from "react";

export const PageCreateEntry = () => {

	const handleCancelForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		alert('222')
	}

	return (
		<>
			<form className="createBlogEntry">
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
							<textarea
								spellCheck={false}
								className="body"
							></textarea>
						</div>

						<div className="buttonRow">
							<button onClick={(e) => handleCancelForm(e)}>Cancel</button>
							<button>Save</button>
						</div>
					</div>
				</fieldset>
			</form>
		</>
	);
};
