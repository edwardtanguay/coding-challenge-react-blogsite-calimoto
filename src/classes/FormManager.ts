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
	} 

	private getValuesFromBlogEntry(blogEntry: BlogEntry) {
		this.formInfo.id = blogEntry.id;
		this.formInfo.date.value = blogEntry.date;
		this.formInfo.title.value = blogEntry.title;
		this.formInfo.tags.value = structuredClone(blogEntry.tags);
		this.formInfo.body.value = blogEntry.body;
	}

	private getBlankFormInfo():FormInfo {
		return {
			id: '',
			date: {
				value: '',
				message: '',
				error: ''
			},
			title: {
				value: '',
				message: '',
				error: ''
			},
			tags: {
				value: [],
				message: '',
				error: ''
			},
			body: {
				value: '',
				message: '',
				error: ''
			}
		}
	}

	private validate() {
		this.formInfo.title.message = "type in title";
	}

	public getFormInfo(): FormInfo {
		return this.formInfo;
	}

	public getBlogEntry(): BlogEntry {
		return {
			id: this.formInfo.id,
			date: this.formInfo.date.value,
			title: this.formInfo.title.value,
			tags: structuredClone(this.formInfo.tags.value),
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
