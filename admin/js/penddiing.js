let scammerData = [];
const dashboardTableBody = document.querySelector(".dashboard__table-body");

// === HANDLE SCAMMER PENDDING ===
function handleScammerPendding(item) {
  const tableBodyItemHTML = `<tr class = "dashboard__table-item" >
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
  const response = await axios.get(endpoint);
  const scammerData = await response.data;
  const penddingScammerData = scammerData.filter(
    (item) => item.approve === false
  );

  penddingScammerData.forEach((item) => {
    handleGetScammerPendding(item);
  });
}

handleGetScammerPendding();
