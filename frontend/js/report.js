// === VALIABLES ===
const apiKey = "aeb2298dd49b3aa479ae2f6e0d6fcbf2";
const endpoint = "https://68803af6f1dcae717b615ab0.mockapi.io/scammers";
const uploadImageInput = document.getElementById("uploadImage");
let arrImg = [];
const formUploadWrap = document.querySelector(".form__upload-wrap");
const phoneScammerInput = document.getElementById("phoneScammer");
const numberScammerInput = document.getElementById("numberScammer");
const phoneUserInput = document.getElementById("phoneUser");
const constReportInput = document.getElementById("contentReport");

// === HANDLE INPUT ONLE NUMBER ===
phoneScammerInput.addEventListener("keypress", handleInputOnlyNunber);
numberScammerInput.addEventListener("keypress", handleInputOnlyNunber);
phoneUserInput.addEventListener("keypress", handleInputOnlyNunber);
function handleInputOnlyNunber(e) {
  if (e.charCode < 48 || e.charCode > 57) {
    e.preventDefault();
  }
}

// === HANDLE CONTENT REPORT INPUT ===
constReportInput.addEventListener("input", (e) => {
  e.target.style.height = "auto";
  e.target.style.height = `${e.target.scrollHeight}px`;
});

// === HANDLE UPLOAD IMAGE ===
uploadImageInput.addEventListener("change", handleUploadImage);

async function handleUploadImage(e) {
  const imgList = [...e.target.files];
  imgList.forEach(async (item) => {
    const urlImg = await uploadImgBB(item);
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
    const formImgPreviews = document.querySelectorAll(".form__image-preview");
    try {
      await axios.post(endpoint, {
        images: arrImg,
        date: new Date(),
        ...rest,
      });
      formImgPreviews.forEach((item) => item.remove());
      await FuiToast.success("Gửi tố cáo thành công");
    } catch (error) {
      console.log(error);
      FuiToast.error("Gửi tố cáo thất bại");
      formImgPreviews.forEach((item) => item.remove());
    }

    console.log({ images: arrImg, ...rest }); // Dữ liệu form sau khi xác thực thành công
  },
  resetOnSubmit: true,
});

// === HANDLE UPLOAD IMGBB
async function uploadImgBB(file) {
  const formData = new FormData();
  // Thêm file hình ảnh vào FormData để gửi lên server
  formData.append("image", file);

  try {
    // Gửi yêu cầu POST đến API ImgBB với đường dẫn endpoint và apiKey bằng axios
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData
    );

    // Trả về URL của hình ảnh sau khi tải lên thành công
    return response.data.data.url;
  } catch (error) {
    // Bắt lỗi nếu có vấn đề xảy ra trong quá trình tải lên
    console.log(error);
    return null; // Trả về null nếu gặp lỗi
  }
}
