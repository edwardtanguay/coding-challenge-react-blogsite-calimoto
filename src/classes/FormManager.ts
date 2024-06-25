import { BlogEntry, FormInfo } from "../types";
import * as tools from '../tools';

export class FormManager {
	private blogEntry: BlogEntry;
	private formInfo: FormInfo;

	constructor(blogEntry: BlogEntry) {
		this.blogEntry = blogEntry;
		this.formInfo = tools.getBlankFormInfo();
		this.parse();
	}

	private parse() {
		this.formInfo.blogEntry = structuredClone(this.blogEntry);
	}

	getFormInfo(): FormInfo {
		return this.formInfo;
	}

}