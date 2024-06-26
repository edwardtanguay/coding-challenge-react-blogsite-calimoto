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

	const rebuildFilteredBlogEntries = (
		_blogEntries: BlogEntry[],
		_selectedMainTag: string
	) => {
		if (tools.isEmpty(_selectedMainTag)) {
			setFilteredBlogEntries(_blogEntries);
		} else {
			const _filteredBlogEntries = _blogEntries.filter((m) =>
				m.tags.includes(_selectedMainTag)
			);
			if (_filteredBlogEntries.length === 0) {
				setSelectedMainTag("");
				setFilteredBlogEntries(_blogEntries);
			} else {
				setFilteredBlogEntries(_filteredBlogEntries);
			}
		}
	};

	const rebuildAllTags = (_blogEntries: BlogEntry[]): void => {
		const tags: string[] = [];
		for (const blogEntry of _blogEntries) {
			tags.push(...blogEntry.tags);
		}
		const _allTags = Array.from(new Set(tags));
		_allTags.sort((a, b) => (a > b ? 1 : -1));
		setAllTags(_allTags);
	};

	useEffect(() => {
		rebuildAllTags(blogEntries);
		rebuildFilteredBlogEntries(blogEntries, selectedMainTag);
	}, []);

	const handleDeleteBlogEntry = (blogEntry: BlogEntry): void => {
		const _blogEntries = blogEntries.filter((m) => m.id !== blogEntry.id);
		setBlogEntries(_blogEntries);
		rebuildFilteredBlogEntries(_blogEntries, selectedMainTag);
		rebuildAllTags(_blogEntries);
	};

	const handleSaveNewBlogEntry = (blogEntry: BlogEntry): void => {
		blogEntries.push(blogEntry);
		tools.sortDates(blogEntries);
		const _selectedMainTag = '';
		setBlogEntries(structuredClone(blogEntries));
		rebuildFilteredBlogEntries(blogEntries, _selectedMainTag);
		rebuildAllTags(blogEntries);
		setSelectedMainTag(_selectedMainTag);
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
