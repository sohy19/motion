import {
	InputDialog,
	MediaData,
	TextData,
} from "./components/dialog/dialog.js";
import { VideoComponent } from "./components/page/item/video.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { NoteComponent } from "./components/page/item/note.js";
import { ImageComponent } from "./components/page/item/image.js";
import {
	Composable,
	PageComponent,
	PageItemComponent,
} from "./components/page/page.js";
import { Component } from "./components/component.js";
import { MedialSectionInput } from "./components/dialog/input/media-input.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
	new (): T;
};
class App {
	private readonly page: Component & Composable;
	constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
		this.page = new PageComponent(PageItemComponent);
		this.page.attachTo(appRoot);

		this.bindElementToDialog<MedialSectionInput>(
			"#new-image",
			MedialSectionInput,
			(input: MedialSectionInput) => new ImageComponent(input.title, input.url)
		);
		this.bindElementToDialog<MedialSectionInput>(
			"#new-video",
			MedialSectionInput,
			(input: MedialSectionInput) => new VideoComponent(input.title, input.url)
		);
		this.bindElementToDialog<TextSectionInput>(
			"#new-note",
			TextSectionInput,
			(input: TextSectionInput) => new NoteComponent(input.title, input.body)
		);
		this.bindElementToDialog<TextSectionInput>(
			"#new-todo",
			TextSectionInput,
			(input: TextSectionInput) => new TodoComponent(input.title, input.body)
		);

		// const image = new ImageComponent(
		// 	"Image Title",
		// 	"https://picsum.photos/600/300"
		// );
		// this.page.addChild(image);

		// const video = new VideoComponent(
		// 	"Video Title",
		// 	"https://youtu.be/K3-jG52XwuQ"
		// );
		// this.page.addChild(video);

		// const note = new NoteComponent("Note Title", "Note Body");
		// this.page.addChild(note);

		// const todo = new TodoComponent("Todo Title", "Todo Item");
		// this.page.addChild(todo);

		// const imageBtn = document.querySelector("#new-image")! as HTMLButtonElement;
		// imageBtn.addEventListener("click", () => {
		// 	const dialog = new InputDialog();
		// 	const inputSection = new MedialSectionInput();
		// 	dialog.addChild(inputSection);
		// 	dialog.attachTo(this.dialogRoot);

		// 	dialog.setOnCloseListenr(() => {
		// 		dialog.removeFrom(this.dialogRoot);
		// 	});
		// 	dialog.setOnSubmitListenr(() => {
		// 		// 섹션을 만들어서 페이지에 추가 해준다
		// 		const image = new ImageComponent(inputSection.title, inputSection.url);
		// 		this.page.addChild(image);
		// 		dialog.removeFrom(this.dialogRoot);
		// 	});

		// 	dialog.attachTo(dialogRoot);
		// });

		// const videoBtn = document.querySelector("#new-video")! as HTMLButtonElement;
		// videoBtn.addEventListener("click", () => {
		// 	const dialog = new InputDialog();
		// 	const inputSection = new MedialSectionInput();
		// 	dialog.addChild(inputSection);
		// 	dialog.attachTo(this.dialogRoot);

		// 	dialog.setOnCloseListenr(() => {
		// 		dialog.removeFrom(this.dialogRoot);
		// 	});
		// 	dialog.setOnSubmitListenr(() => {
		// 		// 섹션을 만들어서 페이지에 추가 해준다
		// 		const video = new VideoComponent(inputSection.title, inputSection.url);
		// 		this.page.addChild(video);
		// 		dialog.removeFrom(this.dialogRoot);
		// 	});

		// 	dialog.attachTo(this.dialogRoot);
		// });

		// const noteBtn = document.querySelector("#new-note")! as HTMLButtonElement;
		// noteBtn.addEventListener("click", () => {
		// 	const dialog = new InputDialog();
		// 	const inputSection = new TextSectionInput();
		// 	dialog.addChild(inputSection);
		// 	dialog.attachTo(this.dialogRoot);

		// 	dialog.setOnCloseListenr(() => {
		// 		dialog.removeFrom(this.dialogRoot);
		// 	});
		// 	dialog.setOnSubmitListenr(() => {
		// 		// 섹션을 만들어서 페이지에 추가 해준다
		// 		const note = new NoteComponent(inputSection.title, inputSection.body);
		// 		this.page.addChild(note);
		// 		dialog.removeFrom(this.dialogRoot);
		// 	});

		// 	dialog.attachTo(this.dialogRoot);
		// });
	}

	private bindElementToDialog<T extends (MediaData | TextData) & Component>(
		selector: string,
		InputComponent: InputComponentConstructor<T>,
		makeSection: (input: T) => Component
	) {
		const todoBtn = document.querySelector(selector)! as HTMLButtonElement;
		todoBtn.addEventListener("click", () => {
			const dialog = new InputDialog();
			const inputSection = new InputComponent();
			dialog.addChild(inputSection);
			dialog.attachTo(this.dialogRoot);

			dialog.setOnCloseListenr(() => {
				dialog.removeFrom(this.dialogRoot);
			});
			dialog.setOnSubmitListenr(() => {
				// 섹션을 만들어서 페이지에 추가 해준다
				const data = makeSection(inputSection);
				this.page.addChild(data);
				dialog.removeFrom(this.dialogRoot);
			});

			dialog.attachTo(this.dialogRoot);
		});
	}
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
