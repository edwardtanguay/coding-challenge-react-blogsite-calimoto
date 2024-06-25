import dayjs from "dayjs";
import { BlogEntry, FormInfo } from "./types";
import * as tools from "./tools.ts";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export const getCurrentDate = (): string => {
	return dayjs().format("YYYY-MM-DD");
};

export const sortDates = (blogEntries: BlogEntry[]): void => {
	blogEntries.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const generateSuuid = (): string => {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let shortUUID = "";

	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		shortUUID += characters.charAt(randomIndex);
	}
	return shortUUID;
};

export const getBlankBlogEntry = (): BlogEntry => {
	return {
		id: tools.generateSuuid(),
		date: tools.getCurrentDate(),
		title: "",
		body: "",
		tags: [],
	};
};

export const getBlankFormInfo = (): FormInfo => {
	return {
		blogEntry: tools.getBlankBlogEntry(),
		messages: [],
		errorMessages: []

	}
};

export const stripTextOfDangerousContent = (input: string): string => {
	return input.replace(/<[^>]*>/g, "");
};

export const getAmericanLongDate = (date: string): string => {
	return dayjs(date).format("ddd, MMM D, YYYY");
};
