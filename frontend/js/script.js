const warningHeaders = document.querySelectorAll(".warning__header");
const scammerList = document.querySelector(".scammer__list");
const alertScamTitle = document.querySelector(".alert-scam__title");
let scammerData = [];
const scammerListWrap = document.querySelector(".scammer__list-wrap");
const loading = document.querySelector(".loading");
const alertScamDesc = document.querySelector(".alert-scam__desc");

// === Format Date Title ===
alertScamTitle.textContent = `Hôm nay ${formatDate()}`;

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

// === Handle Show Model ===
document.body.addEventListener("click", (e) => {
  const model = document.querySelector(".model");
  if (
    e.target.matches(".model__header-close") ||
    e.target.matches(".model__overlay")
  ) {
    model.remove();
    document.body.style.overflow = "auto";
  } else if (e.target.matches(".scammer__item")) {
    handleShowModel(e.target.dataset.id);
  }
});

// === HANDLE RENDER SCAMMER LIST TODAY
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
      scammerList.insertAdjacentHTML("afterbegin", renderItemHTML(item));
    });
  } else {
    scammerListWrap.insertAdjacentHTML("beforeend", renderNotFound());
  }
}

// === HANDLE LIST SCAMMER ===
async function getScammer() {
  loading.classList.add("active");
  setTimeout(async () => {
    try {
      loading.classList.remove("active");
      const response = await axios.get(endpoint);
      scammerData = await response.data;
      rederScammerToday(scammerData);
    } catch (error) {
      loading.classList.remove("active");
      console.error(error);
      scammerListWrap.insertAdjacentHTML(
        "beforeend",
        renderNotFound("Không có dữ liệu")
      );
    }
  }, 1000);
}
getScammer();
