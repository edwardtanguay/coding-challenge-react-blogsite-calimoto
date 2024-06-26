/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import { BlogEntry } from "./types";
import _initialBlogEntries from "./data/blogEntries.json";
import * as tools from "./tools";

tools.sortDates(_initialBlogEntries);

interface IAppContext {
	blogEntries: BlogEntry[];
	setBlogEntries: (blogEntries: BlogEntry[]) => void;
	handleDeleteBlogEntry: (blogEntry: BlogEntry) => void;
	handleSaveNewBlogEntry: (blogEntry: BlogEntry) => void;
	allTags: string[];
	handleMainTagClick: (tag: string) => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [blogEntries, setBlogEntries] =
		useState<BlogEntry[]>(_initialBlogEntries);
	const [allTags, setAllTags] = useState<string[]>([]);

	const getAllTags = (): string[] => {
		const tags: string[] = [];
		for (const blogEntry of blogEntries) {
			tags.push(...blogEntry.tags);
		}
		const uniqueTags = Array.from(new Set(tags));
		uniqueTags.sort((a, b) => (a > b ? 1 : -1));
		return uniqueTags;
	};

	useEffect(() => {
		const _allTags = getAllTags();
		setAllTags(_allTags);
	}, []);

	const handleDeleteBlogEntry = (blogEntry: BlogEntry): void => {
		const _blogEntries = blogEntries.filter((m) => m.id !== blogEntry.id);
		setBlogEntries(_blogEntries);
	};

	const handleSaveNewBlogEntry = (blogEntry: BlogEntry): void => {
		blogEntries.push(blogEntry);
		tools.sortDates(blogEntries);
		setBlogEntries(structuredClone(blogEntries));
	};

	const handleMainTagClick = (tag: string): void => {
		console.log(111, tag);
	};

	return (
		<AppContext.Provider
			value={{
				blogEntries,
				setBlogEntries,
				handleDeleteBlogEntry,
				handleSaveNewBlogEntry,
				allTags,
				handleMainTagClick,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
