import "./style.css";
import "./responsive.css"

interface TodoInterface {
	task: string;
	completed: boolean;
	id: number;
}
let todoArray: TodoInterface[] = [];
const form = document.getElementById("input-form") as HTMLFormElement;
const todoListContainer = document.getElementById(
	"todolist-container"
) as HTMLDivElement;
const input = document.getElementById("task-input") as HTMLInputElement;

form.addEventListener("submit", (event: SubmitEvent) => {
	event.preventDefault();
	todoArray.push({
		task: input.value,
		completed: false,
		id: Math.random() * 10000,
	});
	input.value = "";
	renderTodos(todoArray);
});

const generateTodoItem = (todo: string, completed: boolean, id: number) => {
	const taskContainer = document.createElement("div") as HTMLDivElement;
	taskContainer.setAttribute("id", "task-container");

	const taskCheckBox = document.createElement("input") as HTMLInputElement;
	taskCheckBox.setAttribute("type", "checkbox");
	taskCheckBox.setAttribute("id", "task-checkbox");
	taskCheckBox.checked = completed;

	taskCheckBox.addEventListener("change", () => {
		todoArray.find((value) => {
			if (value.id === id) {
				return (value.completed = taskCheckBox.checked);
			}
		});
		task.className = taskCheckBox.checked ? "task-completed" : "";
	});

	const task = document.createElement("p") as HTMLParagraphElement;
	task.setAttribute("id", "task");
	task.className = taskCheckBox.checked ? "task-completed" : "";
	task.innerText = todo;

	const deleteTaskButton = document.createElement(
		"button"
	) as HTMLButtonElement;
	deleteTaskButton.setAttribute("id", "delete-task-btn");
	deleteTaskButton.innerText = "Delete";
	deleteTaskButton.addEventListener("click", () => {
		todoArray = todoArray.filter((v) => {
			return v.id !== id;
		});
		renderTodos(todoArray);
	});

	taskContainer.append(taskCheckBox, task, deleteTaskButton);
	todoListContainer.appendChild(taskContainer);
};

const renderTodos = (arr: TodoInterface[]) => {
	todoListContainer.innerText = "";
	arr.forEach((value) => {
		generateTodoItem(value.task, value.completed, value.id);
	});
};
