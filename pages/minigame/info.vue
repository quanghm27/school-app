<template>
  <div class="flex flex-col min-h-screen overscroll-auto relative">
    <!--    style="background: linear-gradient(122.73deg, #3550DC -61.52%, #27E9F7 169.17%);"-->
    <img src="~/assets/img/minigame/bg.png" class="w-full absolute" style="z-index: -1" />
    <div class="flex flex-row justify-start items-center mb-4 px-6 mt-10">
      <img src="~/assets/img/minigame/ic-back.png" class="object-contain h-8 w-8" @click="$router.back()" />
      <p class="ml-4 text-base font-bold" style="color: #944200">MINI GAME ĐẤU TRƯỜNG TRÍ TUỆ</p>
    </div>
    <p class="ml-4 text-base font-bold mt-12" style="color: #944200">Thể lệ chương trình</p>
    <p class="ml-4 text-xs mt-2 mb-4" style="color: #944200">05/04/2021 – 02/05/2021</p>
    <div
      class="flex-grow rounded-tl-nm rounded-tr-nm bg-white pl-6 pr-5 pb-20 w-full shadow-lg justify-between shadow-lg"
    >
      <div class="scrollbar text-black-333333 py-10" style="overflow-y: auto; height: 80vh">
        <p class="text-base font-bold mb-1">I, Cách thức tham gia:</p>
        <div class="mb-5" style="background-color: #3550DC; width: 170px; height: 3px"></div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Học sinh đăng nhập tài khoản tại ứng dụng Schools.vn, <strong>tham gia trả lời câu hỏi</strong> bằng cách
            lựa chọn đáp án đúng.
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Với mỗi câu trả lời đúng, học sinh sẽ nhận được một mã dự thưởng để tham gia chương trình trúng thưởng.
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Số lượng mã dự thưởng không giới hạn (tương ứng với số lượng câu trả lời đúng của học sinh).
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Hàng ngày hoặc hàng tuần, Ban Tổ Chức sẽ tổng kết và thông báo danh sách trúng thưởng qua app Schools.vn
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Tất cả các phần quà của chương trình đều được cung cấp chính hãng từ <strong>YG</strong> và
            <strong>Big Hit Entertainment</strong>
          </p>
        </div>
        <p class="text-base font-bold mb-1 mt-5">II, Điều kiện nhận giải:</p>
        <div class="mb-5" style="background-color: #3550DC; width: 170px; height: 3px"></div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <p class="ml-6 text-xs" style="color: #C52F00">
            Đối với giải đặc biệt: <strong>Bộ Pyjama BTS hoặc Black Pink phiên bản giới hạn</strong>
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <p class="ml-6 text-xs" style="color: #3550DC">
            * Để có cơ hội thắng giải Đặc biệt, học sinh cần xếp thứ nhất (1) trong Bảng xếp hạng hằng tuần trên hệ
            thống Schools.vn
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <p class="ml-6 text-xs" style="color: #3550DC">
            Giải đặc biệt sẽ được trao cho học sinh theo phân bố giải thưởng như sau:
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Tuần 1 (05/04/2021- 11/04/2021): Học sinh trả lời đúng nhiều nhất và nhiều nhất tại MỖI trường (tổng cộng 03
            giải)
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Tuần 2 (12/04/2021 - 18/04/2021): 02 Học sinh trả lời đúng nhiều nhất và nhanh nhất tại 02 trường (tổng cộng
            02 giải)
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Tuần 3 (19/04/2021 - 25/04/2021): 02 Học sinh trả lời đúng nhiều nhất và nhanh nhất tại 02 trường (tổng cộng
            02 giải)
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Tuần 4 (26/04/2021 - 02/05/2021): Học sinh trả lời đúng nhiều nhất và nhanh nhất tại MỖI khối lớp (10, 11,
            12) tại MỖI trường (tổng cộng 09 giải)
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <p class="ml-6 text-xs font-bold italic" style="color: #3550DC">
            Kết quả trúng giải Đặc biệt sẽ được thông báo tới học sinh vào cuối mỗi tuần.
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <p class="ml-6 text-xs" style="color: #C52F00">
            Đối với giải may mắn: <strong>Poster BTS, Black Pink</strong>
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Ban tổ chức Schools.vn hoàn thành việc quay số hàng ngày bằng phần mềm quay số ngẫu nhiên, dựa trên danh
            sách các mã số hợp lệ của từng lớp/trường
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Mã số trúng thưởng là mã số trùng với dãy số ngẫu nhiên của kết quả trên phần mềm quay số ngẫu nhiên
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Kết quả trúng thưởng sẽ được Ban tổ chức thông báo tới học sinh qua app Schools.vn vào ngày hôm sau
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <p class="ml-6 text-xs" style="color: #C52F00">
            Đối với giải điểm danh may mắn: <strong>Móc chìa khóa BTS</strong>
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Kết quả trúng thưởng sẽ được Ban tổ chức thông báo tới học sinh qua app Schools.vn vào ngày hôm sau
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Học sinh điểm danh bằng Thẻ học sinh được hệ thống Schools.vn ghi nhận thành công sẽ được Ban Tổ Chức lựa
            chọn ngẫu nhiên để trao giải thưởng vào cuối chương trình
          </p>
        </div>
        <p class="text-base font-bold mb-1 mt-5">III, Các quy định khác:</p>
        <div class="mb-5" style="background-color: #3550DC; width: 170px; height: 3px"></div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Trong trường hợp phát sinh tranh chấp, khiếu nại liên quan đến chương trình, Ban Tổ Chức sẽ trực tiếp giải
            quyết và quyết định của BTC là kết quả cuối cùng
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            BTC có quyền được thay đổi thể lệ trong thời gian diễn ra chương trình mà không cần báo trước.
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            BTC có quyền sử dụng hình ảnh của người thắng cuộc để quảng bá cho chương trình.
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            BTC có quyền loại bỏ tư cách tham gia của người chơi hoặc không trao giải trong các trường hợp nghi ngờ gian
            lận hoặc giả mạo.
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Phần thưởng sẽ được trao cho người trúng giải tại trường học vào cuối chương trình
          </p>
        </div>
        <div class="mb-3 flex flex-row justify-start items-start">
          <img src="~/assets/img/minigame/dot.png" class="object-contain h-2 w-2 mt-1" />
          <p class="ml-4 text-xs">
            Đầu mối giải đáp các thắc mắc liên quan tới chương trình: <strong>Hotline – {{ $const.HOTLINE }}</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  layout: 'minigame',
  data() {
    return {
      type: 'OWNED',
      ticketOwned: [],
    }
  },
}
</script>

<style scoped>
.scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
