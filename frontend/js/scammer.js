const alertScamDesc = document.querySelector(".alert-scam__desc");
const scammerList = document.querySelector(".scammer__list");
const loading = document.querySelector(".loading");
let scammerData = [];
const scammerListWrap = document.querySelector(".scammer__list-wrap");
const formSearch = document.querySelector(".form-search");
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("search_query");
const inputSearch = document.querySelector(".form-search__input");

console.log(query);

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

// === HANDLE RENDER SCAMMER LIST
function rederScammerAll(data) {
  if (data && data.length > 0) {
    data.forEach((item) => {
      scammerList.insertAdjacentHTML("afterbegin", renderItemHTML(item));
    });
  } else {
    scammerListWrap.insertAdjacentHTML("beforeend", renderNotFound());
  }
}

async function getScammer() {
  loading.classList.add("active");
  setTimeout(async () => {
    try {
      loading.classList.remove("active");
      const response = await axios.get(endpoint);
      scammerData = await response.data;
      if (query) {
        const filterData = scammerData.filter(
          (item) =>
            item.numberScammer.includes(query.trim()) ||
            item.phoneScammer.includes(query.trim()) ||
            removeTextNoMark(item.nameScammer).includes(removeTextNoMark(query))
        );
        rederScammerAll(filterData);
      } else {
        rederScammerAll(scammerData);
      }
      // rederScammerAll(scammerData);
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

// === Handle Search ===
inputSearch.value = query;
formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  urlParams.set("search_query", inputSearch.value);
  window.location.search = urlParams.toString();
});
