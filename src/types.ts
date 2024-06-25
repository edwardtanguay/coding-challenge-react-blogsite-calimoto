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

export type FormMessage = {
	field: string,
	message: string
}

export type FormInfo = {
	blogEntry: BlogEntry,
	messages: FormMessage[],
	errorMessages: FormError[]
}