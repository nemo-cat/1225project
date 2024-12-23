const loginModal = document.querySelector(".modal2-contents");
const loginBtn = document.getElementById("login");
const recipient = document.getElementById("recipient");
const sender = document.getElementById("sender");

let currentMailBox = [];
let currentMailMap = {};

loadLocalStorage();

loginModal.addEventListener("click", function (e) {
  if (e.target.id == "login") {
    checkInputBox();
  }
});

/*
1. 받는사람이 실제로 존재하는 데이터인지 확인하기
1-1. 존재하지 않으면 없는 닉네임이라고 toast보여주기


2. 실제 존재하는 데이터면 -> 보내는사람 닉네임 들어갔는지 확인
2-1. 보내는사람 닉네임 없으면 toast보여주기
*/
let inputNickName;
function checkInputBox() {
  inputNickName = recipient.value;
  const inputSender = sender.value;
  let foundRecipient = false;
  for (let i = 0; i < currentMailBox.length; i++) {
    console.log(
      `${i}번째 || 가져온값 : ${currentMailBox[i].name} || 실제입력값 : ${inputNickName}`
    );
    if (currentMailBox[i].name == inputNickName && inputSender) {
      addMailList(inputNickName, inputSender);
      //해당닉네임의 유저에게 mailList가 하나 더 추가되어야 함.
      foundRecipient = true;
      saveLocalStorage(currentMailBox); //로컬스토리지에 저장
      console.log("이동 준비 중");
      window.location.href = `/1225project/letter.html?recipient=${encodeURIComponent(
        inputNickName
      )}`;
      console.log("이 코드는 실행되지 않아야 함");
      break;
    } else if (currentMailBox[i].name == inputNickName && !inputSender) {
      showToast("보내는 사람의 닉네임을 입력해주세요");
      foundRecipient = true;
      break;
    }
  }

  if (!foundRecipient) {
    showToast("존재하지 않는 닉네임 입니다.");
  }
}

/*
1.해당하는 닉네임의 로컬스토리지의
2.mailList에 메일을 하나 더 추가한다.
3. 로컬스토리지값을 바꾸기보단 currentMailBox의 값을 수정하여 새로 저장시키는 방법으로간다.
4. 메일 인덱스가 필요하려나?싶었는데 배열은 순서대로 저장되니까 그대로 로컬스토리지에 저장되니..순서문제는 없을듯?
편지쓸때 mailList의 마지막 애를 데려오면 될듯하다/.

*/

function addMailList(recipient, sender) {
  let addNewMail = {
    sender: sender,
    message: null,
    date: "2024-12-19",
    read: 0,
  };
  for (let i = 0; i < currentMailBox.length; i++) {
    if (currentMailBox[i].name == recipient) {
      currentMailBox[i].mailList.push(addNewMail);
      console.log(currentMailBox[i].mailList);
    }
  }
}

document.getElementById("goToMailBox").addEventListener("click", function () {
  window.location.href = "./mailBox.html";
});
