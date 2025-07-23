// === VALIABLES ===
const enpoin = "https://68803af6f1dcae717b615ab0.mockapi.io/scammers";
const uploadImageInput = document.getElementById("uploadImage");
let arrImg = [];
const formUploadWrap = document.querySelector(".form__upload-wrap");

// === HANDLE UPLOAD IMAGE ===
uploadImageInput.addEventListener("change", handleUploadImage);

function handleUploadImage(e) {
  const imgList = [...e.target.files];
  imgList.forEach((item) => {
    const urlImg = URL.createObjectURL(item);
    const imgHTML = `<div class="form__image-preview">
          <div class="form__preview-remove" data-url="${urlImg}">
            <i class="fa-solid fa-xmark"></i>
          </div>
          <img src="${urlImg}" alt="" class="form__preview-img" />
        </div>`;
    formUploadWrap.insertAdjacentHTML("afterbegin", imgHTML);
    arrImg.push(urlImg);
  });
}

formUploadWrap.addEventListener("click", (e) => {
  if (e.target.matches(".form__preview-remove")) {
    const formImgPreview = e.target.parentNode;
    formImgPreview.remove();
    arrImg = arrImg.filter((item) => item !== e.target.dataset.url);
    console.log(arrImg);
  }
});

// ==== VALIDATE ====
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
  onSubmit: async function ({ images, ...rest }) {
    try {
      await axios.post(enpoin, {
        images: arrImg,
        ...rest,
      });
    } catch (error) {
      console.log(error);
    }

    console.log({ images: arrImg, ...rest }); // Dữ liệu form sau khi xác thực thành công
  },
  resetOnSubmit: true,
});
