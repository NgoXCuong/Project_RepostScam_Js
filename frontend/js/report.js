Validator({
  form: "#form-report",
  formGroupSelector: ".form__group",
  errorSelector: ".form-message",
  rules: [
    Validator.isRequired("#nameScammer", "Vui lòng nhập tên chủ tài khoản"),
    Validator.minLength("#nameScammer", 5, "Nhập tối thiểu 5 ký tự"),
    Validator.isRequired("#phoneScammer", "Vui lòng nhập số điện thoại"),
    Validator.isPhoneNumber("#phoneScammer", "Số điện thoại không hợp lệ"),
    Validator.isRequired("#numberScammer", "Vui lòng nhập số tài khoản"),
    Validator.isNumber("#numberScammer"),
    Validator.minLength("#numberScammer", 8, "Nhập tối thiểu 8 ký tự"),
    Validator.isRequired("#bankScammer", "Vui lòng nhập tên ngân hàng"),
    Validator.minLength("#bankScammer", 2, "Nhập tối thiểu 2 ký tự"),
    Validator.isRequired("#contentReport", "Vui lòng nhập nội dung tố cáo"),
    Validator.minLength("#contentReport", 20, "Nhập tối thiểu 20 ký tự"),
    Validator.isImageUploaded("#uploadImage", "Vui lòng upload hình ảnh"),
    Validator.isRequired("#nameUser", "Vui lòng nhập họ tên của bạn"),
    Validator.minLength("#nameUser", 5, "Nhập tối thiểu 5 ký tự"),
    Validator.isRequired("#phoneUser", "Vui lòng nhập số điện thoại"),
    Validator.isPhoneNumber("#phoneUser", "Số điện thoại không hợp lệ"),
  ],
  onSubmit: function (data) {
    console.log(data); // Dữ liệu form sau khi xác thực thành công
  },
  resetOnSubmit: true,
});
