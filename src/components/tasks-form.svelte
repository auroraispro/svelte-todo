<script lang="ts">
  let newTask = $state("");
  let {
    addTask,
  }: {
    addTask: (newTask: string) => void;
  } = $props();

  function formSubmitted(e: SubmitEvent) {
    e.preventDefault();
    addTask(newTask);
    newTask = "";
  }
</script>

<form onsubmit={formSubmitted}>
  <label>
    <input
      name="newTask"
      class="Taskform formline"
      bind:value={newTask}
    />
  </label>
  <div class="button-container formline">
    <button>Add</button>
  </div>
</form>

<style>
  form {
    display: flex;

    height: 3em;
    gap: 0.5em;
    align-items: center;
  }

  button {
    margin-bottom: 0;
  }

  input {
    flex: 1;
    margin-bottom: 0;
  }
</style>
