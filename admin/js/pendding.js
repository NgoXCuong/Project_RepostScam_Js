let scammerData = [];
const dashboardTableBody = document.querySelector(".dashboard__table-body");
const dashboardTopTotal = document.querySelector(".dashboard__top-total");
const dashboardTableWrap = document.querySelector(".dashboard-table-wrap");

// === HANDLE SCAMMER PENDDING ===
function handleRenderScammerPendding(item) {
  const tableBodyItemHTML = `<tr class = "dashboard__table-bodyItem" data-id = "${
    item.id
  }" >
                  <td>#${item.id}</td>
                  <td>${item.nameScammer}</td>
                  <td>${item.phoneScammer}</td>
                  <td>${item.bankScammer}</td>
                  <td>${item.numberScammer}</td>
                  <td>${item.nameUser}</td>
                  <td>${formatDate(item.date)}</td>
                  <td class="table-action">
                    <span class="table-action__icon table-action__view">
                      <i class="fa-solid fa-eye"> </i
                    ></span>
                    <span class="table-action__icon table-action__remove">
                      <i class="fa-solid fa-trash"></i
                    ></span>
                  </td>
                </tr>`;
  dashboardTableBody.insertAdjacentHTML("afterbegin", tableBodyItemHTML);
}

// === HANDLE GET SCAMMER PENDDING ===
async function handleGetScammerPendding() {
  try {
    const response = await axios.get(endpoint);
    scammerData = await response.data;
    const penddingScammerData = scammerData.filter(
      (item) => item.approve === false
    );
    dashboardTopTotal.textContent = `(Có ${penddingScammerData.length} đơn)`;

    if (penddingScammerData?.length > 0) {
      penddingScammerData.forEach((item) => {
        handleRenderScammerPendding(item);
      });
    } else {
      dashboardTableWrap.insertAdjacentHTML(
        "beforeend",
        renderNotFound("Không có đơn nào!!!", true)
      );
    }
  } catch (error) {}
}

handleGetScammerPendding();

// === handle view scammer ===
document.body.addEventListener("click", (e) => {
  console.log(scammerData);
  const model = e.target.closest(".model");
  if (e.target.matches(".table-action__view")) {
    console.log(e.target.closest(".dashboard__table-bodyItem"));
    const scammerItem = e.target.closest(".dashboard__table-bodyItem");
    handleShowModel(scammerItem.dataset.id);
  } else if (
    e.target.matches(".model__header-close") ||
    e.target.matches(".model__overlay")
  ) {
    model.remove();
  }
});
