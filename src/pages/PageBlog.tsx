import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { AppContext } from "../appContext";
import * as tools from "../tools";

export const PageBlog = () => {
	const {
		blogEntries,
		handleDeleteBlogEntry,
		allTags,
		handleMainTagClick,
		selectedMainTag,
	} = useContext(AppContext);

	return (
		<>
			<section className="tagsArea">
				<>
					{allTags.map((tag, index) => {
						return (
							<button
								className={
									selectedMainTag === tag
										? "selected"
										: "notSelected"
								}
								onClick={() => handleMainTagClick(tag)}
								key={index}
							>
								{tag}
							</button>
						);
					})}
					<button
						className={
							selectedMainTag === "" ? "selected" : "notSelected"
						}
						onClick={() => handleMainTagClick("")}
					>
						show all tags
					</button>
				</>
			</section>
			{blogEntries.map((blogEntry, index) => {
				return (
					<div key={index} className="blogEntry">
						<div className="blogEntryHeader">
							<div className="date">
								{tools.getAmericanLongDate(blogEntry.date)}
							</div>
							<div className="deleteIcon">
								<FaTrashAlt
									onClick={() =>
										handleDeleteBlogEntry(blogEntry)
									}
								/>
							</div>
						</div>
						<div className="title">{blogEntry.title}</div>
						<div className="tags">
							{blogEntry.tags.map((tag, index) => {
								return (
									<button
										className={
											selectedMainTag === tag
												? "selected"
												: "notSelected"
										}
										key={index}
									>
										{tag}
									</button>
								);
							})}
						</div>
						<div className="body">{blogEntry.body}</div>
					</div>
				);
			})}
		</>
	);
};
