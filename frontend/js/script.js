const modelHTML = `<section class="model">
        <div class="model__overlay"></div>
        <div class="model__content">
          <div class="model__header">
            <div class="model__header-title">Chi tiết tố cáo</div>
            <div class="model__header-close">
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          <div class="model__body">
            <div class="model__group">
              <div class="model__profile">
                <div class="model__profile-avatar">
                  <img
                    src="./assets/img/avatar.png"
                    alt=""
                    style="width: 40px; height: 40px"
                  />
                </div>
                <div class="model__info">
                  <h4 class="model__info-name">Hà Thị Yến Nhi</h4>
                  <p class="model__info-desc">#50 - Tố cáo ngày 19/07/2025</p>
                </div>
              </div>
              <div class="model__detail">
                <span class="model__detail-title">Số điện thoại</span>
                <span class="model__detail-text">0388 098 123</span>
              </div>
              <div class="model__detail">
                <span class="model__detail-title">Số tài khoản</span>
                <span class="model__detail-text">0388 098 123</span>
              </div>
              <div class="model__detail">
                <span class="model__detail-title">Ngân hàng</span>
                <span class="model__detail-text">MB Bank</span>
              </div>
            </div>
            <div class="model__group">
              <div class="model__profile">
                <div class="model__profile-avatar">
                  <img
                    src="./assets/img/avatar.png"
                    alt=""
                    style="width: 40xp; height: 40px"
                  />
                </div>
                <div class="model__info">
                  <h4 class="model__info-name">Ngô Xuân Cường</h4>
                  <p class="model__info-desc">Người tố cáo</p>
                </div>
              </div>
              <div class="model__detail">
                <span class="model__detail-title">Trạng thái</span>
                <span class="model__detail-text">Nạn nhân</span>
              </div>
              <div class="model__detail">
                <span class="model__detail-title">Liên hệ</span>
                <span class="model__detail-text">0123 456 789</span>
              </div>
              <div class="model__textarea">
                <span class="model__detail-title">Nội dung tố cáo</span>
                <p class="model__textarea-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia soluta ipsam nisi qui, dolor non quas. Iure asperiores
                  a at impedit minus qui corporis repudiandae. Itaque aliquid
                  debitis excepturi natus.
                </p>
              </div>
              <div class="model__image">
                <span class="model__detail-title">Hình ảnh liên quan</span>
                <div class="model__preview-image">
                  <img src="./assets/img/shield.png" alt="" />
                  <img src="./assets/img/shield.png" alt="" />
                  <img src="./assets/img/shield.png" alt="" />
                  <img src="./assets/img/shield.png" alt="" />
                  <img src="./assets/img/shield.png" alt="" />
                  <img src="./assets/img/shield.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`;
const scammerItems = document.querySelectorAll(".scammer__item");
const warningHeaders = document.querySelectorAll(".warning__header");
const endpoint = "https://68803af6f1dcae717b615ab0.mockapi.io/scammers";
const scammerList = document.querySelector(".scammer__list");
const today = document.querySelector(".today");
const alertScamDesc = document.querySelector(".alert-scam__desc");

// === HANDLE FORMAT DATE ===
function formatDate(dateString) {
  const date = dateString ? new Date(dateString) : new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formatDay = day < 10 ? `0${day}` : day;
  const formatMonth = month < 10 ? `0${month}` : month;

  return `${formatDay}/${formatMonth}/${year}`;
}

if (today) {
  today.textContent = `Hôm nay ${formatDate()}`;
}
// === WARNING ===
warningHeaders.forEach((item) =>
  item.addEventListener("click", handleShowDropdown)
);

function handleShowDropdown(e) {
  const warningContent = e.target.nextElementSibling;
  const warningContentAll = document.querySelectorAll(".warning__content");
  const warningIcon = e.target.querySelector(".warning__header-icon");
  const warningIconAll = document.querySelectorAll(".warning__header-icon");
  warningContentAll.forEach((item) => {
    if (item != warningContent) {
      item.style.height = 0;
      item.classList.remove("active");
    }
  });
  warningIconAll.forEach((item) => {
    if (item !== warningIcon) {
      item.classList.remove("active");
    }
  });
  warningContent.style.height = `${warningContent.scrollHeight}px`;
  warningContent.classList.toggle("active");
  warningIcon.classList.toggle("active");
  if (!warningContent.classList.contains("active")) {
    warningContent.style.height = 0;
  }
}

// === MODEL ===
scammerItems.forEach((item) => item.addEventListener("click", handleShowModel));

function handleShowModel() {
  document.body.insertAdjacentHTML("afterbegin", modelHTML);
  document.body.style.overflow = "hidden";
}

document.body.addEventListener("click", (e) => {
  const model = document.querySelector(".model");
  if (
    e.target.matches(".model__header-close") ||
    e.target.matches(".model__overlay")
  ) {
    model.remove();
    document.body.style.overflow = "auto";
  }
});

// === HANDLE RENDER SCAMMER LIST
function rederScammerToday(data) {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);
  const todayData = data.filter((item) => {
    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0);
    return itemDate.getTime() === todayDate.getTime();
  });
  alertScamDesc.textContent = `Có ${todayData.length} cảnh báo`;

  if (todayData && todayData.length > 0) {
    todayData.forEach((item) => {
      const scammerItemHTML = `<li class="scammer__item">
            <img src="./assets/img/avatar.png" alt="" class="scammer__avatar" />
            <div class="scammer__info">
              <h3 class="scammer__name">${item.nameScammer}</h3>
              <div class="scammer__date">#${item.id}- ${formatDate(
        item.date
      )}</div>
            </div>
          </li>`;
      scammerList.insertAdjacentHTML("afterbegin", scammerItemHTML);
    });
  }
}

// === HANDLE LIST SCAMMER ===
async function getScammer() {
  try {
    const response = await axios.get(endpoint);
    const data = await response.data;
    rederScammerToday(data);
  } catch (error) {
    console.error(error);
  }
}
getScammer();
