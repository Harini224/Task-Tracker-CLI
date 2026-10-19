https://roadmap.sh/projects/task-tracker

# Task Tracker CLI

A small command-line task tracker built with Node.js. Tasks are stored locally in `tasklist.json`.

## Requirements

- [Node.js](https://nodejs.org/)

No npm packages are required.

## Usage

Run commands from the project directory:

```powershell
node .\task-cli.js <command> [arguments]
```

### Add a task

```powershell
node .\task-cli.js add "Read a book"
```

New tasks start with the `todo` status and receive an automatically assigned ID.

### List tasks

```powershell
node .\task-cli.js list
```

Filter by status with `todo`, `in-progress`, or `done`:

```powershell
node .\task-cli.js list todo
node .\task-cli.js list in-progress
node .\task-cli.js list done
```

### Update a task description

```powershell
node .\task-cli.js update 1 "Read two books"
```

### Change a task's status

```powershell
node .\task-cli.js mark-in-progress 1
node .\task-cli.js mark-done 1
```

### Delete a task

```powershell
node .\task-cli.js delete 1
```

## Task data

The CLI reads and writes `tasklist.json` in the current project directory. If the file does not exist, it is initialized as an empty list. Each task contains an ID, description, status, and creation and update timestamps.
