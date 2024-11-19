<script>
  import { inertia, router } from "@inertiajs/svelte";
  import { password_generator } from "../../Components/helper";
  import DripformIcon from "../../Components/DripformIcon.svelte";

  let form = {
    email: "",
    password: "",
    name: "",
    phone: "",
    password_confirmation: "",
  };

  export let error;
  function submitForm() {
    if (form.password != form.password_confirmation) {
      alert("Password and konfirmasi password haru sama");
      return false;
    }

    form.phone = form.phone.toString();
    router.post("/register", form);
  }

  function generatePassword() {
    const retVal = password_generator(10);
    form.password = retVal;
    form.password_confirmation = retVal;
  }
</script>

<section class="min-h-screen bg-base-200 flex items-center">
  <div class="card mx-auto w-full max-w-md bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex justify-center mb-6">
        <DripformIcon></DripformIcon>
      </div>
      <h1 class="card-title text-2xl font-bold text-center">
        Create an account
      </h1>

      {#if error}
        <div class="alert alert-error">
          {error}
        </div>
      {/if}

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
          Sign up with Google
        </a>
        <div class="divider">Or sign up with email</div>
      </div>

      <form class="form-control gap-4" on:submit|preventDefault={submitForm}>
        <div>
          <label class="label" for="name">
            <span class="label-text">Nama</span>
          </label>
          <input
            bind:value={form.name}
            required
            type="text"
            name="name"
            id="name"
            class="input input-bordered w-full"
            placeholder="Maulana Ibrahim"
          />
        </div>

        <div>
          <label class="label" for="email">
            <span class="label-text">Email</span>
          </label>
          <input
            bind:value={form.email}
            required
            type="text"
            name="email"
            id="email"
            class="input input-bordered w-full"
            placeholder="maulanaibrahim@gmail.com"
          />
        </div>

        <div>
          <label class="label" for="password">
            <span class="label-text">Password</span>
          </label>
          <input
            bind:value={form.password}
            required
            type="password"
            name="password"
            id="password"
            class="input input-bordered w-full"
            placeholder="••••••••"
          />
          <button
            type="button"
            on:click={generatePassword}
            class="label-text-alt link link-primary">Buat Password</button
          >
        </div>

        <div>
          <label class="label" for="confirm-password">
            <span class="label-text">Konfirmasi password</span>
          </label>
          <input
            bind:value={form.password_confirmation}
            type="password"
            name="confirm-password"
            id="confirm-password"
            class="input input-bordered w-full"
            placeholder="••••••••"
          />
        </div>

        <button type="submit" class="btn btn-primary">Buat Akun Baru</button>
        <p class="text-sm text-center">
          Sudah punya akun? <a
            href="/login"
            use:inertia
            class="link link-primary">Login disini</a
          >
        </p>
      </form>
    </div>
  </div>
</section>
