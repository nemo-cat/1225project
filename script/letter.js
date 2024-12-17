//텍스트 입력 7줄까지만 가능
let textInputs = document.querySelectorAll(".letter-text");
let textHead = document.querySelector(".letter-head");
let textBody = document.querySelector(".letter-textarea");
let textBottom = document.querySelector(".letter-bottom");
let textAreaClientHeight = 0;
let textAreaScrollHeight = 0;

const savedData = JSON.parse(window.localStorage.getItem("messageData"));
if (savedData) {
  // HTML에 데이터를 표시
  textHead.value = savedData.recipient; // 받는 사람
  textBottom.value = savedData.sender; // 보내는 사람
}

let inputText = {
  title: "",
  message: "",
  sender: "",
};

//입력한 텍스트 가져오기
function getInputValue() {
  inputText.title = textHead.value;
  inputText.message = textBody.value;
  inputText.sender = textBottom.value;
}

window.localStorage.getItem("소리");

textHead.innerHTML = textInputs.forEach((e, index) => {
  e.addEventListener("input", function () {
    getInputValue();
  });
});

textBody.addEventListener("input", function () {
  textAreaClientHeight = textBody.clientHeight;
  textAreaScrollHeight = textBody.scrollHeight;

  //텍스트 스크롤 높이가 눈에보이는 영역 높이 보다 크면 => 스크롤이 생겼단 얘기니까 7줄을 초과했단 뜻
  //본문 편지내용을 슬라이스함.
  if (textAreaScrollHeight > textAreaClientHeight) {
    textBody.value = textBody.value.slice(0, -1);
    inputBodyText = textBody.value;
    console.log(inputBodyText);
  }
  console.log(
    `ClientHeight: ${textAreaClientHeight}, ScrollHeight: ${textAreaScrollHeight}`
  );
});

const sendBtn = document.querySelector(".letter-btn");
const seal = document.querySelector(".seal");
const gameStartModal = document.querySelector(".modal");
const gameStartModalContent = document.querySelector(".modal-content");

//작성완료 클릭시
sendBtn.addEventListener("click", function () {
  if (!inputText.title.trim()) {
    showToast("받을 사람을 입력해 주세요!");
    return;
  }
  if (!inputText.message.trim()) {
    showToast("보낼 메세지를 입력해 주세요!");
    return;
  }
  if (!inputText.sender.trim()) {
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

let gameStartBtn = document.getElementById("gameStart");
gameStartBtn.addEventListener("click", function () {
  window.location.href = "/game.html"; // 이동할 URL
});

//로컬스토리지에 편지 저장
function saveMessage() {
  const messageItem = {
    recipient: textHead.value.trim(),
    sender: textBottom.value.trim(),
    message: textBody.value.trim(), // 편지 내용
  };

  window.localStorage.setItem("messageData", JSON.stringify(messageItem));
  showToast("메시지가 저장되었습니다!");
}
