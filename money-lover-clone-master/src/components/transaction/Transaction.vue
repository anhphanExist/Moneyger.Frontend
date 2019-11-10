<template>
  <div>
    <div
      class="
            w-100 h-24
            bg-white hover:bg-gray-100
            py-5 px-12
            text-2xl text-gray-500 font-medium
            flex justify-start items-center
            cursor-pointer
        "
    >
      Search ...
    </div>
    <divider />
    <div class="w-100 h-24 bg-gray-400 shadow-inner"></div>
    <divider />

    <!-- Cash Flow -->
    <div class="flex">
      <div class="w-full bg-white flex flex-col p-12">
        <div v-for="cF in cashFlow" :key="cF.id">
          <div class="w-full flex" v-if="cF.type === 'Total'">
            <span class="w-2/3"></span>
            <span class="w-1/3 border-t-2"></span>
          </div>
          <div class="w-full flex justify-between text-2xl font-semibold p-5">
            <span class="w-2/3 text-gray-800">
              {{ cF.type }}
            </span>
            <span class="w-1/3 flex">
              <span class="w-2/3 text-gray-800">
                <span v-if="cF.type === 'Inflow'">+</span>
                <span v-if="cF.type === 'Outflow'">-</span>
              </span>

              <span class="w-1/3 text-right text-gray-600">
                {{ cF.cash }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="w-100 flex">
      <div
        class="w-full bg-gray-400 hover:bg-gray-600 h-10 text-gray-700 hover:text-gray-200 cursor-pointer font-semibold flex justify-center items-center"
      >
        View report for this month
      </div>
    </div>

    <divider />

    <div class="w-100 flex flex-col">
      <div
        class="w-full bg-white flex flex-col"
        v-for="(transaction, index) in transactions"
        :key="index"
      >
        <div class="w-full flex flex-col px-12 pt-12 pb-6">
          <div class="w-full flex justify-between text-lg font-semibold">
            <div
              class="time"
              v-for="(dayTrans, index) in transaction.date"
              :key="index"
            >
              <span class="day">{{ dayTrans.day }}</span
              >/<span class="month">{{ dayTrans.month }}</span
              >/<span class="year">{{ dayTrans.year }}</span
              >, <span class="weekday">{{ dayTrans.date }}</span>
            </div>
            <div class="cash">
              {{ transaction.total }}
            </div>
          </div>
          <div class="w-full border-t-2 my-10"></div>
          <div
            class="w-full flex justify-between py-5 px-6 mb-5 border-2"
            v-for="(transDetails, index) in transaction.trans"
            :key="index"
          >
            <div>{{ transDetails.name }}</div>
            <div>{{ transDetails.value }}</div>
          </div>
        </div>
        <divider />
      </div>
    </div>
  </div>
</template>

<script>
import Divider from "./global/Divider";

export default {
  name: "transaction",
  components: {
    divider: Divider
  },
  data() {
    return {
      cashFlow: [
        { id: "1", type: "Inflow", cash: "$8,000" },
        { id: "2", type: "Outflow", cash: "$4,000" },
        { id: "3", type: "Total", cash: "$4,000" }
      ],
      transactions: [
        {
          date: [
            {
              day: "1",
              month: "12",
              year: "2018",
              date: "Tuesday"
            }
          ],
          total: "$20,000,000",
          trans: [
            { type: "Outflow", name: "Movies", value: "$10,000,000" },
            { type: "Outflow", name: "Books", value: "$10,000,000" }
          ]
        },
        {
          date: [
            {
              day: "15",
              month: "11",
              year: "2018",
              date: "Friday"
            }
          ],
          total: "$40,000,000",
          trans: [
            { type: "Outflow", name: "Movies", value: "$20,000,000" },
            { type: "Outflow", name: "Books", value: "$20,000,000" }
          ]
        },
        {
          date: [
            {
              day: "5",
              month: "11",
              year: "2018",
              date: "Monday"
            }
          ],
          total: "$40,000,000",
          trans: [
            { type: "Outflow", name: "Movies", value: "$20,000,000" },
            { type: "Outflow", name: "Books", value: "$20,000,000" }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="postcss" scoped></style>
