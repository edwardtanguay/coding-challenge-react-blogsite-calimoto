/* eslint-disable no-case-declarations */
import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../appContext";
import * as tools from "../tools";
import { FormInfo } from "../types";
import { FormManager } from "../classes/FormManager";

const characterLimitforOneLineTagEntry = 30;

export const PageCreateEntry = () => {
	const { handleSaveNewBlogEntry, allTags } = useContext(AppContext);
	const navigate = useNavigate();
	const [formInfo, setFormInfo] = useState<FormInfo>(
		FormManager.getBlankFormInfo()
	);

	const tagsInputRef = useRef<HTMLInputElement>(null);
	const tagsTextareaRef = useRef<HTMLTextAreaElement>(null);

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

	const handleTagSelectionClick = (tag: string): void => {
		const _tags = `${formInfo.tags.value.trim()} ${tag}`.trim();
		handleFormChange("tags", _tags);
	};

	const handleFormChange = (field: string, value: string) => {
		switch (field) {
			case "date":
			case "title":
			case "body":
				formInfo[field].value = value;
				break;
			case "tags":
				const currentValue = formInfo.tags.value;
				const newValue = value;

				// user is typing past the limit so switch from input to textarea and maintain focus
				if (
					currentValue.length > characterLimitforOneLineTagEntry &&
					newValue.length >= characterLimitforOneLineTagEntry
				) {
					setTimeout(() => {
						if (tagsInputRef.current) {
							tagsInputRef.current.focus();
						}
					}, 0);
				}

				// user is backspacing back under the limit so switch from textarea back to input and maintain focus
				if (
					currentValue.length <= characterLimitforOneLineTagEntry &&
					newValue.length > characterLimitforOneLineTagEntry
				) {
					setTimeout(() => {
						if (tagsTextareaRef.current) {
							tagsTextareaRef.current.focus();
						}
					}, 100);
				}

				formInfo.tags.value = newValue;
				break;
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
									<span className="message">
										{formInfo.date.message}
									</span>
									<span className="error">
										{formInfo.date.error}
									</span>
								</div>
							</div>
							<input
								type="text"
								value={formInfo.date.value}
								name="date"
								id="date"
								onChange={(e) =>
									handleFormChange("date", e.target.value)
								}
							/>
						</div>

						<div className="row">
							<div className="rowHeader">
								<label htmlFor="title">Title</label>
								<div>
									<span className="message">
										{formInfo.title.message}
									</span>
									<span className="error">
										{formInfo.title.error}
									</span>
								</div>
							</div>
							<input
								type="text"
								value={formInfo.title.value}
								name="title"
								id="title"
								onChange={(e) =>
									handleFormChange("title", e.target.value)
								}
							/>
						</div>

						<div className="row">
							<div className="rowHeader">
								<label htmlFor="tags">Tags</label>
								<div>
									<span className="message">
										{formInfo.tags.message}
									</span>
									<span className="error">
										{formInfo.tags.error}
									</span>
								</div>
							</div>
							<input
								type="text"
								hidden={
									formInfo.tags.value.length >
									characterLimitforOneLineTagEntry
								}
								ref={tagsInputRef}
								value={formInfo.tags.value}
								name="tags"
								id="tags"
								onChange={(e) =>
									handleFormChange("tags", e.target.value)
								}
							/>
							<textarea
								spellCheck={false}
								hidden={
									formInfo.tags.value.length <=
									characterLimitforOneLineTagEntry
								}
								ref={tagsTextareaRef}
								value={formInfo.tags.value}
								className="tagsExpanded"
								onChange={(e) =>
									handleFormChange("tags", e.target.value)
								}
							></textarea>
							<div className="availableTags">
								{allTags.map((tag, index) => {
									return (
										<span
											onClick={() =>
												handleTagSelectionClick(tag)
											}
											key={index}
										>
											{tag}
										</span>
									);
								})}
							</div>
						</div>

						<div className="row">
							<div className="rowHeader">
								<label htmlFor="body">Body</label>
								<div>
									<span className="message">
										{formInfo.body.message}
									</span>
									<span className="error">
										{formInfo.body.error}
									</span>
								</div>
							</div>
							<textarea
								spellCheck={false}
								value={formInfo.body.value}
								className="body"
								onChange={(e) =>
									handleFormChange("body", e.target.value)
								}
							></textarea>
						</div>

						<div className="buttonRow">
							<button onClick={(e) => handleCancelForm(e)}>
								Cancel
							</button>
							<button
								disabled={!formInfo.formIsValid}
								onClick={(e) => handleSaveForm(e)}
							>
								Save
							</button>
						</div>
					</div>
				</fieldset>
			</form>
		</>
	);
};
