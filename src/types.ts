export type BlogEntry = {
	id: string;
	date: string;
	title: string;
	body: string;
	tags: string[];
};

export type FormError = {
	field: string,
	errorMessage: string
}

export type FormData = {
	blogEntry: BlogEntry,
	errorMessages: FormError[]
}