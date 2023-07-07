const Faq = () => {
  return (
    <div className="flex flex-col gap-5 p-5">
      <span className="text-xl font-bold">Câu hỏi thường gặp</span>
      <div className="flex flex-col w-full gap-2 p-5 bg-white rounded-xl px-7">
        <div className="text-lg font-bold ">Làm thế nào để đăng ký tài khoản mới?</div>
        <div className="opacity-80">
          Để đăng ký tài khoản mới, hãy nhấp vào nút &quot;Đăng ký&quot; trên trang chủ và điền đầy đủ thông tin yêu
          cầu. Sau khi hoàn tất, bạn sẽ nhận được một email xác nhận và có thể bắt đầu sử dụng tài khoản của mình.
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 p-5 bg-white rounded-xl px-7">
        <div className="text-lg font-bold">Tôi quên mật khẩu của mình, làm thế nào để khôi phục nó?</div>
        <div className="opacity-80">
          Trên trang đăng nhập, hãy nhấp vào liên kết &quot;Quên mật khẩu&quot; và làm theo các hướng dẫn để khôi phục
          mật khẩu qua email. Nếu bạn không nhận được email khôi phục, hãy kiểm tra thư mục spam hoặc liên hệ với chúng
          tôi để được hỗ trợ.
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 p-5 bg-white rounded-xl px-7">
        <div className="text-lg font-bold">Tôi gặp sự cố khi truy cập vào trang web, làm thế nào để giải quyết?</div>
        <div className="opacity-80">
          Đầu tiên, hãy thử tải lại trang hoặc khởi động lại trình duyệt của bạn. Nếu vẫn gặp sự cố, hãy bấm phím F12
          trên bàn phím để kiểm tra xem có thông báo về sự cố hoặc hướng dẫn sửa lỗi không.
        </div>
      </div>
      <div className="flex flex-col w-full gap-2 p-5 bg-white rounded-xl px-7">
        <div className="text-lg font-bold">Phần mềm của bạn có thể tích hợp với các ứng dụng CRM không?</div>
        <div className="opacity-80">
          Đúng, phần mềm của chúng tôi hỗ trợ tích hợp với nhiều ứng dụng CRM phổ biến như Salesforce, HubSpot và Zoho
          CRM. Bạn có thể liên hệ với chúng tôi để được hỗ trợ cụ thể.
        </div>
      </div>
    </div>
  );
};

export default Faq;
