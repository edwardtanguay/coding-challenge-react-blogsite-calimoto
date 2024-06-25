import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { AppContext } from "../appContext";

export const PageBlog = () => {
	const { blogEntries, handleDeleteBlogEntry } = useContext(AppContext);

	return (
		<>
			{blogEntries.map((blogEntry, index) => {
				return (
					<div key={index} className="blogEntry">
						<div className="blogEntryHeader">
							<div className="date">{blogEntry.date} - ({blogEntry.id})</div>
							<div className="deleteIcon">
								<FaTrashAlt
									onClick={() =>
										handleDeleteBlogEntry(blogEntry)
									}
								/>
							</div>
						</div>
						<div className="title">{blogEntry.title}</div>
						<div className="tags">{blogEntry.tags.join(" ")}</div>
						<div className="body">{blogEntry.body}</div>
					</div>
				);
			})}
		</>
	);
};
