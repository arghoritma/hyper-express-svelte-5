<script>
  import { inertia, router } from "@inertiajs/svelte";
  import DripformIcon from "../../Components/DripformIcon.svelte";

  let form = {
    email: "",
    password: "",
    password_confirmation: "",
    terms: false,
  };
  export let error;
  function submitForm() {
    router.post("/login", { email: form.email, password: form.password });
  }
</script>

<section class="min-h-screen bg-base-200 flex items-center">
  <div class="card mx-auto w-full max-w-md shadow-xl bg-base-100">
    <div class="card-body">
      <div class="flex justify-center mb-4">
        <DripformIcon></DripformIcon>
      </div>

      {#if error}
        <div class="alert alert-error">
          <span>{error}</span>
        </div>
      {/if}

      <!-- Google Login Button -->
      <div class="flex flex-col gap-4">
        <a href="/google/redirect" class="btn btn-outline gap-2">
          <svg class="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </a>
        <div class="divider">Or continue with</div>
      </div>

      <form on:submit|preventDefault={submitForm} class="form-control gap-4">
        <div>
          <!-- svelte-ignore a11y_label_has_associated_control -->
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            bind:value={form.email}
            required
            type="text"
            placeholder="maulanaibrahim@gmail.com"
            class="input input-bordered w-full"
          />
        </div>

        <div>
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input
            bind:value={form.password}
            required
            type="password"
            placeholder="••••••••"
            class="input input-bordered w-full"
          />
        </div>

        <button type="submit" class="btn btn-primary">Login</button>

        <p class="text-sm text-center">
          Belum punya akun?
          <a href="/register" use:inertia class="link link-primary"
            >Buat disini</a
          >
        </p>
      </form>
    </div>
  </div>
</section>
