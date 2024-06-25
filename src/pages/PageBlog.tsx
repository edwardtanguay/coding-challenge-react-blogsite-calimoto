import { useContext } from "react";
import { BlogEntry } from "../types";
import { FaTrashAlt } from "react-icons/fa";
import { AppContext } from "../appContext";

export const PageBlog = () => {
	const { blogEntries, setBlogEntries } = useContext(AppContext);

	const handleDeleteBlogEntry = (blogEntry: BlogEntry): void => {
		const _blogEntries = blogEntries.filter(m => m.id !== blogEntry.id);
		setBlogEntries(_blogEntries);
	}

	return (
		<>
			{blogEntries.map((blogEntry, index) => {
				return (
					<div key={index} className="blogEntry">
						<div className="blogEntryHeader">
							<div className="date">{blogEntry.date}</div>
							<div className="deleteIcon">
								<FaTrashAlt onClick={() => handleDeleteBlogEntry(blogEntry)} />
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
