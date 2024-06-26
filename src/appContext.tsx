/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import { BlogEntry } from "./types";
import _initialBlogEntries from "./data/blogEntries.json";
import * as tools from "./tools";

tools.sortDates(_initialBlogEntries);

interface IAppContext {
	blogEntries: BlogEntry[];
	filteredBlogEntries: BlogEntry[];
	setBlogEntries: (blogEntries: BlogEntry[]) => void;
	handleDeleteBlogEntry: (blogEntry: BlogEntry) => void;
	handleSaveNewBlogEntry: (blogEntry: BlogEntry) => void;
	allTags: string[];
	handleMainTagClick: (tag: string) => void;
	selectedMainTag: string;
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [blogEntries, setBlogEntries] =
		useState<BlogEntry[]>(_initialBlogEntries);
	const [filteredBlogEntries, setFilteredBlogEntries] = useState<BlogEntry[]>(
		[]
	);
	const [allTags, setAllTags] = useState<string[]>([]);
	const [selectedMainTag, setSelectedMainTag] = useState("");

	const rebuildFilteredBlogEntries = (_blogEntries: BlogEntry[], _selectedMainTag: string) => {
		if (tools.isEmpty(_selectedMainTag)) {
			setFilteredBlogEntries(_blogEntries);
		} else {
			const _filteredBlogEntries = _blogEntries.filter((m) =>
				m.tags.includes(_selectedMainTag)
			);
			setFilteredBlogEntries(_filteredBlogEntries);
		}
	};

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
		rebuildFilteredBlogEntries(blogEntries, selectedMainTag);
	}, []);

	const handleDeleteBlogEntry = (blogEntry: BlogEntry): void => {
		const _blogEntries = blogEntries.filter((m) => m.id !== blogEntry.id);
		setBlogEntries(_blogEntries);
		rebuildFilteredBlogEntries(_blogEntries, selectedMainTag);
	};

	const handleSaveNewBlogEntry = (blogEntry: BlogEntry): void => {
		blogEntries.push(blogEntry);
		tools.sortDates(blogEntries);
		setBlogEntries(structuredClone(blogEntries));
	};

	const handleMainTagClick = (_selectedMainTag: string): void => {
		setSelectedMainTag(_selectedMainTag);
		rebuildFilteredBlogEntries(blogEntries, _selectedMainTag);
	};

	return (
		<AppContext.Provider
			value={{
				blogEntries,
				filteredBlogEntries,
				setBlogEntries,
				handleDeleteBlogEntry,
				handleSaveNewBlogEntry,
				allTags,
				handleMainTagClick,
				selectedMainTag,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
