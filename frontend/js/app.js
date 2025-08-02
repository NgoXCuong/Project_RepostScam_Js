const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  const headerHeight = header.offsetHeight;
  const marginTopHeader = parseFloat(getComputedStyle(header).marginTop);
  const totalHeaderHeight = headerHeight + marginTopHeader;
  if (window.scrollY > totalHeaderHeight) {
    header.classList.add("fixed");
    document.body.classList.add("active");
  } else {
    header.classList.remove("fixed");
    document.body.classList.remove("active");
  }
});
