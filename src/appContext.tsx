/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import { BlogEntry } from "./types";
import _initialBlogEntries from "./data/blogEntries.json";

const initialBlogEntries = _initialBlogEntries.sort((a, b) =>
	a.date > b.date ? 1 : -1
);

interface IAppContext {
	blogEntries: BlogEntry[];
	setBlogEntries: (blogEntries: BlogEntry[]) => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [blogEntries, setBlogEntries] =
		useState<BlogEntry[]>(initialBlogEntries);

	return (
		<AppContext.Provider
			value={{
				blogEntries,
				setBlogEntries,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
