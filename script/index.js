/*브라우저 리사이즈 되면, 브라우저의 width를 구해서 1280px 미만이면 모달 띄우기*/
let currentWidth = window.innerWidth;
let isModalOpen = false;
let timer = null;
let sizeNotice = `
<div class="sizeWarning">
      <div class="modal-bg"></div>
      <div class="modal-content size-content">
        <h2 class="modal-title">브라우저 사이즈를<br />확인해주세요!</h2>
        <div class="modal-text overlay-wrap">
          <p>
            해당 사이트는 <span class="green">1280px</span>이상의 브라우저에
            최적화 되어있습니다.
          </p>
        </div>
      </div>
    </div>
`;
showSizeModal(currentWidth);

window.addEventListener("resize", function () {
  clearTimeout(timer);
  timer = setTimeout(function () {
    currentWidth = window.innerWidth;
    showSizeModal(currentWidth);
  }, 200);
});

function showSizeModal(wSize) {
  if (wSize < 1280 && isModalOpen == false) {
    document.body.insertAdjacentHTML("beforeend", sizeNotice);
    isModalOpen = true;
  } else if (wSize >= 1280 && isModalOpen == true) {
    document.querySelector(".sizeWarning").remove();
    isModalOpen = false;
  }
}

/*
문제점1. InnerHTML로하니까 다른 스크립트들이 작동을 안함 => insetAdjacentHTML로 하니까 작동됨
문제점2. 브라우저 크기를 1280px이하로 여러번 줄이면, 그만큼 모달이 나옴 => 상태관리하는 변수하나 추가해야할듯!
*/
