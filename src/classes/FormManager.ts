import { BlogEntry, FormInfo } from "../types";
import * as tools from "../tools";

export class FormManager {
	private formInfo: FormInfo;

	constructor(formInfo: FormInfo | null = null) {
		this.formInfo = this.getBlankFormInfo();
		if (formInfo === null) {
			this.getValuesFromBlogEntry(FormManager.getDefaultBlogEntry());
		} else {
			this.addBlogEntryInfo(formInfo);
		}
		this.validate();
	}

	private addBlogEntryInfo = (formInfo: FormInfo): void => {
		this.formInfo.id = formInfo.id;
		this.formInfo.date.value = formInfo.date.value;
		this.formInfo.title.value = formInfo.title.value;
		this.formInfo.tags.value = structuredClone(formInfo.tags.value);
		this.formInfo.body.value = formInfo.body.value;
	};

	private getValuesFromBlogEntry(blogEntry: BlogEntry) {
		this.formInfo.id = blogEntry.id;
		this.formInfo.date.value = blogEntry.date;
		this.formInfo.title.value = blogEntry.title;
		this.formInfo.tags.value = blogEntry.tags.join(" ");
		this.formInfo.body.value = blogEntry.body;
	}

	private getBlankFormInfo(): FormInfo {
		return {
			id: "",
			formIsValid: false,
			date: {
				value: "",
				message: "",
				error: "",
			},
			title: {
				value: "",
				message: "",
				error: "",
			},
			tags: {
				value: "",
				derivedValue: [],
				message: "",
				error: "",
			},
			body: {
				value: "",
				message: "",
				error: "",
			},
		};
	}

	private validate() {
		// date
		if (tools.isEmpty(this.formInfo.date.value)) {
			this.formInfo.date.message = "(enter date)";
			this.formInfo.date.error = "";
		} else if (!tools.isEmpty(this.formInfo.date.value)) {
			const longDate = tools.getAmericanLongDate(
				this.formInfo.date.value
			);
			if (tools.isEmpty(longDate)) {
				this.formInfo.date.message = "";
				this.formInfo.date.error = "invalid format";
			} else {
				this.formInfo.date.message = longDate;
				this.formInfo.date.error = "";
			}
		}

		// title
		const tl = this.formInfo.title.value.length;
		if (tl === 0) {
			this.formInfo.title.message = "(enter title)";
			this.formInfo.title.error = "";
		} else if (tl >= 1 && tl <= 5) {
			this.formInfo.title.message = "";
			this.formInfo.title.error = "too short";
		} else if (tl > 30) {
			this.formInfo.title.message = "";
			this.formInfo.title.error = "too long";
		} else if (tl !== 0) {
			this.formInfo.title.message = "✓";
			this.formInfo.title.error = "";
		}

		// tags
		const tgl = this.formInfo.tags.value.length;
		const tagItems = this.formInfo.tags.value.trim().split(' ');
		if (tgl === 0) {
			this.formInfo.tags.message = "(enter tags)";
			this.formInfo.tags.error = "";
		} else if (tools.stringInArrayTooShort(tagItems, 2)) {
			this.formInfo.tags.message = "";
			this.formInfo.tags.error = "tag is less than 3 chars";
		} else if (tools.arrayHasDuplicateItems(tagItems)) {
			this.formInfo.tags.message = "";
			this.formInfo.tags.error = "duplicate tags";
		} else {
			this.formInfo.tags.message = "✓";
			this.formInfo.tags.error = "";
		}

		// body
		const bl = this.formInfo.body.value.length;
		if (bl === 0) {
			this.formInfo.body.message = "(enter body)";
			this.formInfo.body.error = "";
		} else if (bl >= 1 && bl <= 20) {
			this.formInfo.body.message = "";
			this.formInfo.body.error = "too short";
		} else if (bl > 256) {
			this.formInfo.body.message = "";
			this.formInfo.body.error = "too long";
		} else if (bl !== 0) {
			this.formInfo.body.message = "✓";
			this.formInfo.body.error = "";
		}

		this.validateForm();

	}

	private formHasAnError(): boolean {
		if (!tools.isEmpty(this.formInfo.date.error)) {
			return true;
		}
		if (!tools.isEmpty(this.formInfo.title.error)) {
			return true;
		}
		if (!tools.isEmpty(this.formInfo.tags.error)) {
			return true;
		}
		if (!tools.isEmpty(this.formInfo.body.error)) {
			return true;
		}
		return false;
	}

	private formHasAnEmptyValue(): boolean {
		if (tools.isEmpty(this.formInfo.date.value)) {
			return true;
		}
		if (tools.isEmpty(this.formInfo.title.value)) {
			return true;
		}
		if (tools.isEmpty(this.formInfo.tags.value)) {
			return true;
		}
		if (tools.isEmpty(this.formInfo.body.value)) {
			return true;
		}
		return false;
	}

	private validateForm(): void {
		let valid = true;
		if (this.formHasAnError()) {
			valid = false;
		}
		if (this.formHasAnEmptyValue()) {
			valid = false;
		}
		this.formInfo.formIsValid = valid;	
	}

	public getFormInfo(): FormInfo {
		return this.formInfo;
	}

	public getBlogEntry(): BlogEntry {
		return {
			id: this.formInfo.id,
			date: this.formInfo.date.value,
			title: this.formInfo.title.value,
			tags: this.formInfo.tags.value.split(" "),
			body: this.formInfo.body.value,
		};
	}

	public static getBlankFormInfo() {
		const formManager = new FormManager();
		return formManager.getFormInfo();
	}

	public static getDefaultBlogEntry(): BlogEntry {
		return {
			id: tools.generateSuuid(),
			date: tools.getCurrentDate(),
			title: "",
			body: "",
			tags: [],
		};
	}
}
