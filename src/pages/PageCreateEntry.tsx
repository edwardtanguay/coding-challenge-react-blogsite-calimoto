import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../appContext";
import * as tools from "../tools";
import { FormInfo } from "../types";
import { FormManager } from "../classes/FormManager";

export const PageCreateEntry = () => {
	const { handleSaveNewBlogEntry } = useContext(AppContext);
	const navigate = useNavigate();
	const [formInfo, setFormInfo] = useState<FormInfo>(FormManager.getBlankFormInfo());

	const handleCancelForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		navigate("/blog");
	};

	const handleSaveForm = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		const formManager = new FormManager(formInfo);
		handleSaveNewBlogEntry(formManager.getBlogEntry());
		navigate("/blog");
	};

	const handleFormChange = (
		field: string,
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const value = e.target.value;
		switch (field) {
			case "date":
			case "title":
			case "body":
				formInfo[field].value = value;
				break;
			case "tags":
				formInfo.tags.value = value.split(" ");
				break;
			default:
				console.log(
					`BAD FIELD: "${tools.stripTextOfDangerousContent(field)}"`
				);
		}
		const formManager = new FormManager(formInfo);
		setFormInfo(structuredClone(formManager.getFormInfo()));
	};

	return (
		<>
			<form className="createBlogEntry">
				<fieldset>
					<legend>Create New Blog Entry</legend>

					<div className="rows">
						<div className="row">
							<div className="rowHeader">
								<label htmlFor="date">Date</label>
								<div>
									<span className="info">iii</span>
									<span className="error">eee</span>
								</div>
							</div>
							<input
								type="text"
								value={formInfo.date.value}
								name="date"
								id="date"
								onChange={(e) => handleFormChange("date", e)}
							/>
						</div>

						<div className="row">
							<div className="rowHeader">
								<label htmlFor="title">Title</label>
								<div>
									<span className="info">iii</span>
									<span className="error">eee</span>
								</div>
							</div>
							<input
								type="text"
								value={formInfo.title.value}
								name="title"
								id="title"
								onChange={(e) => handleFormChange("title", e)}
							/>
						</div>

						<div className="row">
							<div className="rowHeader">
								<label htmlFor="tags">Tags</label>
								<div>
									<span className="info">iii</span>
									<span className="error">eee</span>
								</div>
							</div>
							<input
								type="text"
								value={formInfo.tags.value.join(" ")}
								name="tags"
								id="tags"
								onChange={(e) => handleFormChange("tags", e)}
							/>
						</div>

						<div className="row">
							<div className="rowHeader">
								<label htmlFor="body">Body</label>
								<div>
									<span className="info">iii</span>
									<span className="error">eee</span>
								</div>
							</div>
							<textarea
								spellCheck={false}
								value={formInfo.body.value}
								className="body"
								onChange={(e) => handleFormChange("body", e)}
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
