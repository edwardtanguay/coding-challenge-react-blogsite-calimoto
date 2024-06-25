export type BlogEntry = {
	id: string;
	date: string;
	title: string;
	body: string;
	tags: string[];
};

export type FormError = {
	field: string,
	errorText: string
}

export type FormMessage = {
	field: string,
	text: string
}

export type FormInfo = {
	blogEntry: BlogEntry,
	messages: FormMessage[],
	errorMessages: FormError[]
}