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

let toastTimer;
let vibrationTimer;
let toast = "";
let toastMessage = "";

window.showToast = function showToast(message) {
  let toast = document.querySelector(".toast-message");
  let toastMessage = document.querySelector(".toast-message p");

  clearTimeout(toastTimer, vibrationTimer);
  toast.classList.add("show");
  toast.classList.add("vibration");
  toastMessage.innerHTML = `${message}`;

  //2초후 토스트메세지 제거
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2000);

  //0.6초후 진동효과 제거
  vibrationTimer = setTimeout(function () {
    toast.classList.remove("vibration");
  }, 600);
};

//로컬스토리지에 있는 값 가져오기 전역
window.loadLocalStorage = function loadLocalStorage() {
  let getMailBox = window.localStorage.getItem("mailBox");
  let parsedMailBox = getMailBox
    ? JSON.parse(getMailBox)
    : [JSON.parse(giftFromSori)];
  currentMailBox = parsedMailBox;
  arrayToMap();
};

//배멸에있는걸 다시 map에 담는 함수
function arrayToMap() {
  for (let i = 0; i < currentMailBox.length; i++) {
    const mailBox = currentMailBox[i];
    currentMailMap[mailBox.name] = mailBox;
  }
}

// 로컬스토리지에 저장시키자!
window.saveLocalStorage = function saveLocalStorage(currentMailBox) {
  console.log("saveLocalStorage 함수실행");
  window.localStorage.setItem("mailBox", JSON.stringify(currentMailBox));
  console.log("saveLocalStorage 저장완료");
};
