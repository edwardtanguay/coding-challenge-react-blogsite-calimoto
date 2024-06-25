/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import { BlogEntry } from "./types";
import _initialBlogEntries from "./data/blogEntries.json";
import * as tools from "./tools";

tools.sortDates(_initialBlogEntries);

interface IAppContext {
	blogEntries: BlogEntry[];
	setBlogEntries: (blogEntries: BlogEntry[]) => void;
	handleDeleteBlogEntry: (blogEntry: BlogEntry) => void;
	handleSaveNewBlogEntry: (blogEntry: BlogEntry) => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [blogEntries, setBlogEntries] =
		useState<BlogEntry[]>(_initialBlogEntries);

	const handleDeleteBlogEntry = (blogEntry: BlogEntry): void => {
		const _blogEntries = blogEntries.filter((m) => m.id !== blogEntry.id);
		setBlogEntries(_blogEntries);
	};

	const handleSaveNewBlogEntry = (blogEntry: BlogEntry): void => {
		blogEntries.push(blogEntry);
		tools.sortDates(blogEntries);
		setBlogEntries(structuredClone(blogEntries));
	};

	return (
		<AppContext.Provider
			value={{
				blogEntries,
				setBlogEntries,
				handleDeleteBlogEntry,
				handleSaveNewBlogEntry,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
