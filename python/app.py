# Simple To-Do List Application

def display_menu():
    print("\nTo-Do List Menu")
    print("1. View tasks")
    print("2. Add a task")
    print("3. Remove a task")
    print("4. Mark task as complete")
    print("5. Exit")

def view_tasks(tasks):
    print("\nCurrent To-Do List:")
    if not tasks:
        print("No tasks available.")
    else:
        for i, task in enumerate(tasks, 1):
            status = "✔" if task["completed"] else "✘"
            print(f"{i}. {task['title']} [{status}]")

def add_task(tasks):
    task_title = input("Enter the task description: ")
    tasks.append({"title": task_title, "completed": False})
    print(f"Task '{task_title}' added.")

def remove_task(tasks):
    view_tasks(tasks)
    try:
        task_index = int(input("Enter the task number to remove: ")) - 1
        removed_task = tasks.pop(task_index)
        print(f"Task '{removed_task['title']}' removed.")
    except (IndexError, ValueError):
        print("Invalid task number.")

def mark_task_complete(tasks):
    view_tasks(tasks)
    try:
        task_index = int(input("Enter the task number to mark as complete: ")) - 1
        tasks[task_index]["completed"] = True
        print(f"Task '{tasks[task_index]['title']}' marked as complete.")
    except (IndexError, ValueError):
        print("Invalid task number.")

def main():
    tasks = []
    while True:
        display_menu()
        choice = input("Choose an option: ")
        if choice == "1":
            view_tasks(tasks)
        elif choice == "2":
            add_task(tasks)
        elif choice == "3":
            remove_task(tasks)
        elif choice == "4":
            mark_task_complete(tasks)
        elif choice == "5":
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
