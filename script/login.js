const loginBtn = document.getElementById("login");
const loginModal = document.querySelector(".login-check-modal");
const recipient = document.getElementById("recipient");
const sender = document.getElementById("sender");

let recipientValue = "";
let senderValue = "";
let messageItem = {
  recipient: "",
  message: "",
  sender: "",
  date: "",
  password: "",
};
let btnBroup = document.querySelector(".btn-wrap");

//이벤트 버블링을 이용해서 코드 변경하기완료!
btnBroup.addEventListener("click", function (e) {
  if (e.target.id == "login") {
    recipientValue = recipient.value;
    console.log(recipientValue);
    senderValue = sender.value;
    if (recipientValue == "") {
      showToast("받으실 분의 닉네임을 입력해주세요");
    } else if (senderValue == "") {
      showToast("보내시는 분의 닉네임을 입력해주세요");
    } else {
      // 데이터를 객체 형태로 저장
      messageItem.recipient = recipientValue;
      messageItem.sender = senderValue;
      messageItem.message = ""; // 초기값
      window.localStorage.setItem("messageData", JSON.stringify(messageItem));

      window.location.href = "/letter.html"; // 이동할 URL
    }
  } else if (e.target.id == "goToMailBox") {
    window.location = "/mailBox.html";
  }
});
