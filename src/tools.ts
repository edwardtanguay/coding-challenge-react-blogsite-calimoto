import dayjs from "dayjs";
import { BlogEntry } from "./types";

export const getCurrentDate = (): string => {
	return dayjs().format("YYYY-MM-DD");
};

export const sortDates = (blogEntries: BlogEntry[]): void => {
	blogEntries.sort((a, b) => (a.date < b.date ? 1 : -1));
};
