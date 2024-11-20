<script>
    import { inertia, page, router } from "@inertiajs/svelte";
    import { clickOutside } from "../Components/helper";
    import { onMount } from "svelte";
    import dayjs from "dayjs"
    import DripformIcon from "../Components/DripformIcon.svelte";
  import Navbar from "./Navbar.svelte";
  import Drawer from "./Drawer.svelte";
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
      }
    ];
  
    let installPrompt = null;
  
    onMount(()=>{
      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        installPrompt = event;
  
        const showInstallDate = localStorage.getItem('showInstall');
        if(showInstallDate){
          if(Date.now() > parseInt(showInstallDate))
          {
            showInstall = true;
          }
        }else{
          showInstall = true;
        }
        
      });
    })
  
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
</script>

<div class="drawer lg:drawer-open">
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" /> 
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <Navbar />
    <!-- Page Content -->
    <main class="flex flex-auto flex-col max-w-full">
      <slot />
    </main>
  </div> 
  <div class="drawer-side z-10">
    <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
      <Drawer />
  </div>
</div>
{#if showInstall}
<div class="fixed inset-x-0 bottom-0">
  <div class="alert bg-primary text-white">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button on:click={() => {
      showInstall = false; 
      localStorage.setItem('showInstall', dayjs().add(1,'day').valueOf());
    }} class="btn btn-sm btn-circle btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
      </svg>
    </button>
    <span>Install Dripsender App</span>
    <button on:click={Install} class="btn btn-sm btn-ghost bg-white text-primary">Install</button>
  </div>
</div>
{/if}
