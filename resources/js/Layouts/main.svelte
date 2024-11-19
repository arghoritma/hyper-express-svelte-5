<script>
  import { inertia, page, router } from "@inertiajs/svelte";
  import { clickOutside } from "../Components/helper";
  import { onMount } from "svelte";
  import dayjs from "dayjs";
  import DripformIcon from "../Components/DripformIcon.svelte";
  let show = false;

  let mobile_menu = false;

  let user = $page.props.user;

  let showInstall = false;

  export let path = "whatsapp";

  let menus = [
    {
      path: "home",
      href: "/home",
      title: "Home",
      show: true,
    },
  ];

  let installPrompt = null;

  onMount(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      installPrompt = event;

      const showInstallDate = localStorage.getItem("showInstall");
      if (showInstallDate) {
        if (Date.now() > parseInt(showInstallDate)) {
          showInstall = true;
        }
      } else {
        showInstall = true;
      }
    });
  });

  async function Install() {
    if (!installPrompt) {
      return;
    }

    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    showInstall = false;
  }

  function Logout() {
    router.post("/logout");
  }

  function toggleTheme() {
    const html = document.querySelector("html");
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    html.setAttribute("data-theme", newTheme);
  }
</script>

<!-- Page Container -->
<div class="drawer">
  <input
    id="my-drawer-3"
    type="checkbox"
    class="drawer-toggle"
    bind:checked={mobile_menu}
  />
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="navbar bg-base-100">
      <div class="flex-none lg:hidden">
        <label for="my-drawer-3" class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path></svg
          >
        </label>
      </div>
      <div class="flex-1">
        <a use:inertia href="/home" class="btn btn-ghost normal-case text-xl">
          <DripformIcon></DripformIcon>
        </a>
      </div>
      <div class="flex-none hidden lg:block">
        <ul class="menu menu-horizontal">
          {#each menus as menu}
            {#if menu.show}
              <li>
                <a
                  use:inertia
                  href={menu.href}
                  class={path == menu.path ? "active" : ""}
                >
                  {menu.title}
                </a>
              </li>
            {/if}
          {/each}
        </ul>
      </div>
      <div class="flex-none gap-2">
        <label class="swap swap-rotate">
          <input type="checkbox" on:change={toggleTheme} />
          <svg
            class="swap-on fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            ><path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
            /></svg
          >
          <svg
            class="swap-off fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            ><path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
            /></svg
          >
        </label>
        <div class="dropdown dropdown-end">
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <!-- svelte-ignore a11y_label_has_associated_control -->
          <label tabindex="0" class="btn btn-ghost">
            <span>{$page.props.user.name}</span>
            <svg
              class="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              /></svg
            >
          </label>
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><a use:inertia href="/profile">Profile</a></li>
            <li>
              <form on:submit|preventDefault={Logout}>
                <button type="submit">Sign out</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Page Content -->
    <main class="flex-1">
      <slot />
    </main>
  </div>
  <div class="drawer-side">
    <label for="my-drawer-3" class="drawer-overlay"></label>
    <ul class="menu p-4 w-80 bg-base-100">
      {#each menus.filter((item) => item.show) as menu}
        <li>
          <a
            use:inertia
            href={menu.href}
            class={path == menu.path ? "active" : ""}
          >
            {menu.title}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>

{#if showInstall}
  <div class="toast toast-bottom">
    <div class="alert alert-info">
      <div class="flex items-center gap-2">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button
          on:click={() => {
            showInstall = false;
            localStorage.setItem(
              "showInstall",
              dayjs().add(1, "day").valueOf()
            );
          }}
          class="btn btn-circle btn-xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            /></svg
          >
        </button>
        <span>Install Dripsender App</span>
      </div>
      <button on:click={Install} class="btn btn-sm btn-primary">Install</button>
    </div>
  </div>
{/if}
