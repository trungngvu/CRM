import Rating from '@mui/material/Rating';

const Notification = () => {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex flex-col w-full gap-2 p-5 bg-white rounded-xl px-7">
        <div className="text-lg font-bold ">
          Công việc <span className="italic">Học từ vựng Mimikara</span> sắp đến hạn
        </div>
        <div className="opacity-80">Hạn hoàn thành: 01/07/2023</div>
      </div>
      <div className="flex flex-col w-full gap-2 p-5 bg-white rounded-xl px-7">
        <div className="text-lg font-bold">Admin vừa thêm bạn vào dự án mới</div>
        <div className="opacity-80">Tên dự án: Dự án phát triên app mobile CRM</div>
      </div>
      <div className="flex flex-col w-full gap-2 p-5 bg-white rounded-xl px-7">
        <div className="text-lg font-bold">Admin vừa thêm bạn là người theo dõi công việc</div>
        <div className="opacity-80">Tên công việc: Thiết kế Figma app CRM</div>
      </div>
      <div className="flex flex-col w-full gap-2 p-5 bg-white rounded-xl px-7">
        <div className="text-lg font-bold">Admin vừa nhắc đến bạn trong một bình luận</div>
        <div className="opacity-80">Bình luận: Sửa gấp cho anh Figma trong tuần này nhé!</div>
      </div>
      <div className="flex flex-col w-full gap-2 p-5 bg-white rounded-xl px-7">
        <div className="text-lg font-bold">Admin vừa đánh giá công việc của bạn</div>
        <div className="flex opacity-80">
          Tên công việc: Làm Navbar cho CRM
          <Rating name="read-only" value={4} readOnly className="inline ml-3" />
        </div>
      </div>
    </div>
  );
};

export default Notification;
