import { useState } from "react";
import { BlogEntry } from "../types";
import initialBlogEntries from "../data/blogEntries.json";

export const PageBlog = () => {
	const [blogEntries, setBlogEntries] =
		useState<BlogEntry[]>(initialBlogEntries);

	return (
		<>
			{blogEntries.map((blogEntry, index) => {
				return (
					<div key={index} className="blogEntry">
						<div className="title">{blogEntry.title}</div>
					</div>
				);
			})}
		</>
	);
};
