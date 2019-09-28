<template>
    <div id="signup" class="w-10/12 lg:w-2/6 md:w-1/2">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
                <h1 class="text-center font-semibold text-2xl md:text-4xl text-gray-800">
                    Sign Up
                </h1>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username" type="text" placeholder="Username">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" placeholder="******************">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Re-Password
                </label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" type="password" placeholder="******************">
                <!--
                    <p class="text-red-500 text-xs italic">Please choose a password.</p>
                -->
            </div>
            <div class="flex sm:flex-row flex-col items-center justify-between mb-6 md:mb-16">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 sm:mb-0 rounded focus:outline-none focus:shadow-outline"
                    type="button">
                    Sign Up
                </button>
                <div inline-block align-baseline>
                    Have an account?
                    <router-link to="/login" class="font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Login
                    </router-link>
                </div>
            </div>

            <!-- Redirect to Sign Up -->
            <div class="text-center">
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                </a>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="postcss" scoped>

</style>