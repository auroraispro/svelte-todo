<script lang="ts">
  import TasksForm from "./components/tasks-form.svelte";
  import TasksList from "./components/tasks-list.svelte";
  import "@picocss/pico";
  import type { Filter, Task } from "./types";

  let message = "Tasks App";
  let currentFilter = $state<Filter>("all");
  let tasks = $state<Task[]>([]);
  let totalDone = $derived(
    tasks.reduce((total, task) => total + Number(task.done), 0),
  );

  let filteredTasks = $derived.by(() => {
    switch (currentFilter) {
      case "all": {
        return tasks;
      }
    }
    return tasks;
  });

  function addTask(newTask: string) {
    tasks.push({
      id: crypto.randomUUID(),
      title: newTask,
      done: false,
    });
  }

  function toggleDone(task: Task) {
    task.done = !task.done;
  }

  function removeTask(index: number) {
    tasks.splice(index, 1);
  }
</script>

<main>
  <h1>{message}</h1>
  <TasksForm {addTask} />
  <p>
    {#if tasks.length}
      {totalDone} / {tasks.length} tasks completed
    {:else}
      Add a task to get started.
    {/if}
  </p>
  {#if tasks.length}
    <div class="button-container">
      <button class="secondary">All</button>
      <button class="secondary">Todo</button>
      <button class="secondary">Done</button>
    </div>
  {/if}
  <TasksList
    tasks={filteredTasks}
    {toggleDone}
    {removeTask}
  />
</main>

<style>
  main {
    margin: 1rem;
    max-width: 800px;
  }
  .button-container {
    display: flex;
    justify-content: right;
    margin-bottom: 1rem;
    gap: 0.5rem;
  }
</style>
