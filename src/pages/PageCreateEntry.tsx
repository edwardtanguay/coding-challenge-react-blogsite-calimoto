import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogEntry } from "../types";
import { AppContext } from "../appContext";
import * as tools from "../tools";

export const PageCreateEntry = () => {
	const { handleSaveNewBlogEntry } = useContext(AppContext);
	const navigate = useNavigate();
	const [blogEntry, setBlogEntry] = useState<BlogEntry>(
		tools.getBlankBlogEntry()
	);

	const handleCancelForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		navigate("/blog");
	};

	const handleSaveForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		handleSaveNewBlogEntry(blogEntry);
		navigate("/blog");
	};

	return (
		<>
			<form className="createBlogEntry">
				<fieldset>
					<legend>Create New Blog Entry</legend>

					<div className="rows">
						<div className="row">
							<label htmlFor="date">Date:</label>
							<input
								type="text"
								value={blogEntry.date}
								name="date"
								id="date"
							/>
						</div>

						<div className="row">
							<label htmlFor="title">Title:</label>
							<input
								type="text"
								value={blogEntry.title}
								name="title"
								id="title"
							/>
						</div>

						<div className="row">
							<label htmlFor="tags">Tags:</label>
							<input
								type="text"
								value={blogEntry.tags.join(" ")}
								name="tags"
								id="tags"
							/>
						</div>

						<div className="row">
							<label htmlFor="body">Body:</label>
							<textarea
								spellCheck={false}
								value={blogEntry.body}
								className="body"
							></textarea>
						</div>

						<div className="buttonRow">
							<button onClick={(e) => handleCancelForm(e)}>
								Cancel
							</button>
							<button onClick={(e) => handleSaveForm(e)}>
								Save
							</button>
						</div>
					</div>
				</fieldset>
			</form>
		</>
	);
};
