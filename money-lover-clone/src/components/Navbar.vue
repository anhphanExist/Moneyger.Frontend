<template>
  <nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6">
    <div class="w-1/5">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">Chigga</span>
      </div>
    </div>
    <div class="w-3/5">
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-blue-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="text-sm lg:flex-grow">
        <div class="inline-block mr-4 text-white font-bold">Moneyger:</div>

        <div class="inline-block relative w-64">
          <select
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option>Phan Anh</option>
            <option>Nam Anh</option>
            <option>Đạt Lưu</option>
          </select>
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
          >
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>
        </div>

        <div class="inline-block ml-5 text-white font-bold">
          Total Wealth: $20.000.000
        </div>
      </div>
    </div>
    <div class="w-1/5 flex justify-end">
      <a
        href="#"
        class="text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
      >
        Add Transaction
      </a>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped></style>
