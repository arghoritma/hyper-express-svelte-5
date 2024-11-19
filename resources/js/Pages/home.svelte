<script>
  import { inertia } from "@inertiajs/svelte";
  import Layout from "../Layouts/main.svelte";
  import { onMount } from "svelte";

  export let users = [];
  export let total = 0;
  export let page = 1;
  export let search = "";
  export let filter = "all";

  let selectedUsers = new Set();
  let selectAll = false;

  $: if (selectAll) {
    selectedUsers = new Set(users.map((user) => user.id));
  } else {
    selectedUsers = new Set();
  }

  function toggleUser(userId) {
    if (selectedUsers.has(userId)) {
      selectedUsers.delete(userId);
    } else {
      selectedUsers.add(userId);
    }
    selectedUsers = selectedUsers; // trigger reactivity
  }

  function handleSearch() {
    inertia.get("/home", { search, filter, page: 1 }, { preserveState: true });
  }

  function handleFilter(newFilter) {
    filter = newFilter;
    inertia.get("/home", { search, filter, page: 1 }, { preserveState: true });
  }

  function handlePage(newPage) {
    page = newPage;
    inertia.get("/home", { search, filter, page }, { preserveState: true });
  }

  async function deleteSelected() {
    if (confirm("Are you sure you want to delete the selected users?")) {
      inertia.delete("/users", {
        data: { ids: Array.from(selectedUsers) },
        onSuccess: () => {
          selectedUsers = new Set();
          selectAll = false;
        },
      });
    }
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString();
  }
</script>

<Layout path="home">
  <div class="container mx-auto p-4 lg:p-8">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
    >
      <div>
        <h1 class="text-2xl font-bold">User Management</h1>
        <p class="mt-1 text-sm opacity-70">
          Manage your system users and their access
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <a href="/register" use:inertia class="btn btn-primary"> Add User </a>
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <!-- Search -->
      <div class="join">
        <input
          type="text"
          bind:value={search}
          placeholder="Search users..."
          class="input input-bordered join-item w-full"
          on:keyup={(e) => e.key === "Enter" && handleSearch()}
        />
        <button class="btn btn-primary join-item" on:click={handleSearch}>
          Search
        </button>
      </div>

      <!-- Filter Buttons -->
      <div class="join">
        <button
          class="btn join-item {filter === 'all' ? 'btn-primary' : ''}"
          on:click={() => handleFilter("all")}
        >
          All Users
        </button>
        <button
          class="btn join-item {filter === 'verified' ? 'btn-primary' : ''}"
          on:click={() => handleFilter("verified")}
        >
          Verified
        </button>
        <button
          class="btn join-item {filter === 'unverified' ? 'btn-primary' : ''}"
          on:click={() => handleFilter("unverified")}
        >
          Unverified
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  class="checkbox"
                  bind:checked={selectAll}
                />
              </label>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each users as user (user.id)}
            <tr>
              <td>
                <label>
                  <input
                    type="checkbox"
                    class="checkbox"
                    checked={selectedUsers.has(user.id)}
                    on:change={() => toggleUser(user.id)}
                  />
                </label>
              </td>
              <td>
                <div class="flex items-center gap-3">
                  <div>
                    <div class="font-bold">{user.name}</div>
                    {#if user.phone}
                      <div class="text-sm opacity-70">{user.phone}</div>
                    {/if}
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                {#if user.is_verified}
                  <div class="badge badge-success">Verified</div>
                {:else}
                  <div class="badge badge-warning">Unverified</div>
                {/if}
              </td>
              <td>{formatDate(user.created_at)}</td>
              <td>
                <button
                  class="btn btn-ghost btn-xs"
                  on:click={() => inertia.visit(`/users/${user.id}/edit`)}
                >
                  Edit
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    {#if total > 0}
      <div class="mt-4 flex items-center justify-between">
        <div class="text-sm">
          Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, total)} of {total}
          users
        </div>
        <div class="join">
          <button
            class="btn join-item {page === 1 ? 'btn-disabled' : ''}"
            disabled={page === 1}
            on:click={() => handlePage(page - 1)}
          >
            Previous
          </button>
          <button
            class="btn join-item {page * 10 >= total ? 'btn-disabled' : ''}"
            disabled={page * 10 >= total}
            on:click={() => handlePage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    {/if}

    <!-- Bulk Actions -->
    {#if selectedUsers.size > 0}
      <div class="fixed bottom-0 inset-x-0 pb-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="alert alert-info">
            <div class="flex items-center justify-between w-full">
              <span>
                {selectedUsers.size} user{selectedUsers.size === 1 ? "" : "s"} selected
              </span>
              <button on:click={deleteSelected} class="btn btn-error btn-sm">
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</Layout>
