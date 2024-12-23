let textInputs = document.querySelectorAll(".letter-text");
const textHead = document.querySelector(".letter-head");
const textBody = document.querySelector(".letter-textarea");
const textBottom = document.querySelector(".letter-bottom");
let currentMailBox = [];
let currentMailMap = {};

loadLocalStorage();

const today = new Date();
console.log(today); // 전체 날짜와 시간 정보 출력

const year = today.getFullYear(); // 년도
const month = today.getMonth() + 1; // 월 (0부터 시작하므로 +1)
const date = today.getDate(); // 일
const TodayDate = `${year}-${month}-${date}`;

const params = new URLSearchParams(window.location.search);
let recipientData = currentMailMap[params.get("recipient")];
console.log(recipientData);
let mailIndex = null;

if (recipientData) {
  console.log(`현재 받는사람: ${recipientData.name}`);
  mailIndex = recipientData.mailList.length - 1;

  textHead.value = recipientData.name; // 받는 사람
  textBottom.value = recipientData.mailList[mailIndex].sender; // 보내는 사람
} else {
  console.error("받는사람 데이터가 없습니다.");
}
/*
textInputs.forEach((e) => {
  e.addEventListener("input", function () {
    getInputValue();
  });
});*/

textBody.addEventListener("input", function () {
  const lineCount = textBody.value.split("\n").length;
  if (lineCount > 7) {
    textBody.value = textBody.value.slice(0, -1);
    showToast("최대 7줄까지 입력 가능합니다!");
  }
});

const sendBtn = document.querySelector(".letter-btn");
const seal = document.querySelector(".seal");
const gameStartModal = document.querySelector(".modal");
const gameStartModalContent = document.querySelector(".modal-content");

sendBtn.addEventListener("click", function () {
  if (!textHead.value.trim()) {
    showToast("받을 사람을 입력해 주세요!");
    return;
  }
  if (!textBody.value.trim()) {
    showToast("보낼 메세지를 입력해 주세요!");
    return;
  }
  if (!textBottom.value.trim()) {
    showToast("보내는 사람을 입력해 주세요!");
    return;
  }
  seal.classList.add("show");
  saveMessage();
  setTimeout(function () {
    gameStartModal.style.display = "block";
    gameStartModalContent.style.display = "block";
  }, 1000);
});

document.getElementById("gameStart").addEventListener("click", function () {
  window.location.href = "/game.html";
});

function saveMessage() {
  const messageItem = {
    recipient: textHead.value.trim(),
    sender: textBottom.value.trim(),
    message: textBody.value.trim(),
    read: 0,
    date: TodayDate,
  };
  recipientData.mailList[mailIndex] = messageItem;
  saveLocalStorage(currentMailBox);
  showToast("메시지가 저장되었습니다!");
}
