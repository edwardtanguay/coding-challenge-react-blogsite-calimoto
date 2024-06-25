export type BlogEntry = {
	id: string;
	date: string;
	title: string;
	tags: string[];
	body: string;
};

export type FormInfo = {
	id: string;
	date: {
		value: string;
		message: string;
		error: string;
	};
	title: {
		value: string;
		message: string;
		error: string;
	};
	tags: {
		value: string;
		derivedValue: string[];
		message: string;
		error: string;
	};
	body: {
		value: string;
		message: string;
		error: string;
	};
};
