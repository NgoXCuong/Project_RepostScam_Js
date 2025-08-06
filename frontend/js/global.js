const endpoint = "https://68803af6f1dcae717b615ab0.mockapi.io/scammers";

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

// === Render Model HTML ===
function renderModelHTML(itemData) {
  const imgListHTML = itemData.images
    .map((item, index) => {
      return `<a href ="${item}"><img src="${item}" alt="Ảnh bằng chứng của ${
        itemData.nameScammer
      } ${index + 1}" /></a>`;
    })
    .join("");
  return `<section class="model">
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
                    src="https://i.ibb.co/d0fDNg5z/avatar.png"
                    alt=""
                    style="width: 40px; height: 40px"
                  />
                </div>
                <div class="model__info">
                  <h4 class="model__info-name">${itemData.nameScammer}</h4>
                  <p class="model__info-desc">#${
                    itemData.id
                  } - Tố cáo ngày ${formatDate(itemData.date)}</p>
                </div>
              </div>
              <div class="model__detail">
                <span class="model__detail-title">Số điện thoại</span>
                <span class="model__detail-text text-single">${
                  itemData.phoneScammer
                }</span>
              </div>
              <div class="model__detail">
                <span class="model__detail-title">Số tài khoản</span>
                <span class="model__detail-text  text-single">${
                  itemData.numberScammer
                }</span>
              </div>
              <div class="model__detail">
                <span class="model__detail-title">Ngân hàng</span>
                <span class="model__detail-text text-single">${
                  itemData.bankScammer
                }</span>
              </div>
            </div>
            <div class="model__group">
              <div class="model__profile">
                <div class="model__profile-avatar">
                  <img
                    src="https://i.ibb.co/d0fDNg5z/avatar.png"
                    alt=""
                    style="width: 40xp; height: 40px"
                  />
                </div>
                <div class="model__info">
                  <h4 class="model__info-name">${itemData.nameUser}</h4>
                  <p class="model__info-desc">Người tố cáo</p>
                </div>
              </div>
              <div class="model__detail">
                <span class="model__detail-title">Trạng thái</span>
                <span class="model__detail-text text-single">${
                  itemData.option
                }</span>
              </div>
              <div class="model__detail">
                <span class="model__detail-title">Liên hệ</span>
                <span class="model__detail-text text-single">${
                  itemData.numberScammer
                }</span>
              </div>
              <div class="model__textarea">
                <span class="model__detail-title">Nội dung tố cáo</span>
                <p class="model__textarea-content">
                  ${itemData.contentReport}
                </p>
              </div>
              <div class="model__image">
                <span class="model__detail-title">Hình ảnh liên quan</span>
                <div class="model__preview-image">
                  ${imgListHTML}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`;
}

// === show MODEL ===
function handleShowModel(id) {
  const scammer = scammerData.find((item) => item.id === id);
  document.body.insertAdjacentHTML("afterbegin", renderModelHTML(scammer));
  document.body.style.overflow = "hidden";
  lightGallery(document.querySelector(".model__preview-image"), {
    plugins: [lgThumbnail],
  });
}

// === Render Item HTML ===
function renderItemHTML(itemData) {
  return `<li class="scammer__item" data-id = "${itemData.id}">
            <img src="./assets/img/avatar.png" alt="" class="scammer__avatar" />
            <div class="scammer__info">
              <h3 class="scammer__name text-single">${itemData.nameScammer}</h3>
              <div class="scammer__date">#${itemData.id}- ${formatDate(
    itemData.date
  )}</div>
            </div>
          </li>`;
}

// === Render Not Found HTML ===
function renderNotFound(
  message = "Hiện tại không có scammer nào!!!",
  admin = false
) {
  return `<div class = "not-found">
      <img src =  "${
        admin === false
          ? "./assets/img/not-found.svg"
          : "../frontend/assets/img/not-found.svg"
      }"/>
      <span>${message}</span>
    </div>`;
}

// === remove text no mark ===
function removeTextNoMark(str) {
  // remove accents
  var from =
      "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to =
      "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-");

  return str;
}
