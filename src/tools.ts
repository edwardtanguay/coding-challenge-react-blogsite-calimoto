import dayjs from "dayjs";
import { BlogEntry } from "./types";
import advancedFormat from "dayjs/plugin/advancedFormat";
import * as tools from "./tools";

dayjs.extend(advancedFormat);

/**
 * Returns today's date in ISO format.
 *
 * getCurrentDate()
 *
 * '2024-06-26'
 */
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

export const stripTextOfDangerousContent = (input: string): string => {
	return input.replace(/<[^>]*>/g, "");
};

export const getAmericanLongDate = (date: string): string => {
	if (tools.isValidIsoDateFormat(date)) {
		return dayjs(date).format("ddd, MMM D, YYYY");
	} else {
		return "";
	}
};

export const isEmpty = (text: string): boolean => {
	return text.trim() === "";
};

export const OLDisValidIsoDateFormat = (date: string): boolean => {
	const format = "YYYY-MM-DD";
	return dayjs(date, format, true).isValid();
};

export const isValidIsoDateFormat = (date: string): boolean => {
	const regex =
		/^(?:(?:19|20)\d{2})-(?:(?:0[1-9]|1[0-2]))-(?:(?:0[1-9]|1\d|2\d|3[01]))$/;
	if (!regex.test(date)) {
		return false;
	}

	// Further validation for actual date values using Date object
	const d = new Date(date);
	const [year, month, day] = date.split("-").map(Number);

	return (
		d.getFullYear() === year &&
		d.getMonth() + 1 === month &&
		d.getDate() === day
	);
};

export const arrayHasDuplicateItems = (items: string[]): boolean => {
	const seenItems = new Set();

	for (const item of items) {
		if (seenItems.has(item)) {
			return true;
		}
		seenItems.add(item);
	}

	return false;
};

export const stringInArrayTooShort = (
	arr: string[],
	limit: number
): boolean => {
	for (const str of arr) {
		if (str.length <= limit) {
			return true;
		}
	}
	return false;
};

export const stringInArrayTooLong = (arr: string[], limit: number): boolean => {
	for (const str of arr) {
		if (str.length > limit) {
			return true;
		}
	}
	return false;
};
