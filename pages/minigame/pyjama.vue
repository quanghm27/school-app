<template>
  <div class="container m-auto my-10 shadow-lg rounded-lg border-md p-10 text-sm h-screen overflow-auto">
    <div class="flex flex-col justify-start items-center">
      <p class="text-black text-opacity-100 text-5xl font-bold text-center w-full">
        Tặng thưởng Pyjama hằng tuần cho học sinh
      </p>
      <p class="mt-20 font-bold w-full text-lg">Danh sách mã trúng thưởng(phân cách bằng dấu ,)</p>
      <p type="text" class="rounded text-black border-2 w-full p-3 my-5 border-solid">{{ listCodeReward }}</p>
      <p type="text" class="rounded text-black border-2 w-full font-bold">
        {{ `Số lượng: ${listCodeReward.length}` }}
      </p>
      <div class="flex flex-row">
        <p type="text" class="rounded text-black border-2 w-full p-3 my-5">Mã bí mật</p>
        <input type="text" class="rounded text-black border-2 w-full p-3 my-5 border-solid" v-model="secretKey" />
      </div>
      <button class="rounded-lg bg-green-600 px-20 py-2 text-white" @click="rewardGiftCode">Đồng ý</button>
    </div>
    <p class="mt-10 font-bold w-full text-lg">Danh sách khuyến nghị tặng quà</p>
    <div class="flex flex-round justify-between items-center">
      <div class="flex flex-row justify-start items-start mt-3">
        <p type="text" class="rounded text-black border-2 w-full p-3">Trường</p>
        <input type="text" class="rounded text-black border-2 w-full p-3 border-solid" v-model="school" />
      </div>
      <div class="flex flex-row justify-start items-start mt-3">
        <p type="text" class="rounded text-black border-2 w-full p-3">Khối</p>
        <input type="text" class="rounded text-black border-2 w-full p-3 border-solid" v-model="grade" />
      </div>
      <button class="px-4 rounded-full py-2 bg-green-600 text-white my-1" @click="searchSuggest">
        Tìm kiếm
      </button>
    </div>
    <table class="table-auto text-sm mt-10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên học sinh</th>
          <th>Lớp</th>
          <th>Khối</th>
          <th>Trường</th>
          <th>Mã trường</th>
          <th>Số câu trả lời đúng</th>
          <th>Pyjama</th>
          <th>Mã</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in listSuggest" :key="JSON.stringify(item)">
          <th class="font-normal">{{ item.id }}</th>
          <th class="font-normal">{{ item.name }}</th>
          <th class="font-normal">{{ item.className }}</th>
          <th class="font-normal">{{ item.grade }}</th>
          <th class="font-normal">{{ item.schoolName }}</th>
          <th class="font-normal">{{ item.schoolId }}</th>
          <th class="font-normal">{{ item.numTicket }}</th>
          <th class="font-normal">{{ item.rewardPyjama > 0 ? 'Đã trúng' : '' }}</th>
          <th class="font-normal">{{ item.groupCode.split(',')[0] }}</th>
          <th class="font-normal">
            <button
              class="px-4 rounded-full py-2 text-white my-1"
              :class="listCodeReward.includes(item.groupCode.split(',')[0]) ? 'bg-red-400' : 'bg-green-600'"
              @click="handleAction(item.groupCode.split(',')[0])"
            >
              Thêm/Xoá
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Pyjama',
  layout: 'blank',
  data() {
    return {
      listSuggest: [],
      listCodeReward: [],
      secretKey: '',
      school: '',
      grade: '',
    }
  },
  methods: {
    async getSuggestReward() {
      const data = await this.$api.miniGame.SUGGEST_REWARD()
      this.listSuggest = data
    },
    handleAction(code) {
      if (this.listCodeReward.includes(code)) {
        this.listCodeReward = this.listCodeReward.filter(n => n !== code)
      } else {
        this.listCodeReward.push(code)
      }
    },
    async rewardGiftCode() {
      const result = await this.$api.miniGame.REWARD_PYJAMA_CODE({
        LIST_CODE: this.listCodeReward,
        SECRET_KEY: this.secretKey,
      })
      console.log('result', result)
      this.$toast.success('Đã trao thưởng thành công: ' + result)
    },
    async searchSuggest() {
      const data = await this.$api.miniGame.SUGGEST_REWARD({ SCHOOL: this.school, GRADE: this.grade })
      this.listSuggest = data
    },
  },
  mounted() {
    this.getSuggestReward()
  },
}
</script>

<style scoped></style>
