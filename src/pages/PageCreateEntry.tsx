import React from "react";
import { useNavigate } from "react-router-dom";

export const PageCreateEntry = () => {
	const navigate = useNavigate();

	const handleCancelForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		navigate('/blog');
	};

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
							<button onClick={(e) => handleCancelForm(e)}>
								Cancel
							</button>
							<button>Save</button>
						</div>
					</div>
				</fieldset>
			</form>
		</>
	);
};
