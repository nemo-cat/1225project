const postBox = document.querySelector(".post-box");
const mailModal = document.querySelector(".modal2");
const goToCreate = document.getElementById("goToCreate");
const goBack = document.querySelector(".goBack");
let getMailList = null;
let mailLogin = `
  <button id="close"></button>
  <div class="modal2-wrap mail-login">
    <div class="modal2-header">
      <h2 class="title">누구의 <span class="red">편지함</span>을 열까요?</h2>
    </div>
    <div class="modal2-contents">
      <input id="loginId" type="text" placeholder="닉네임을 입력해주세요." />
      <input id="loginPw" type="password" placeholder="설정한 비밀번호를 입력해주세요."/>
      <button id="openBtn">편지함 열기</button>
      <button id="goToCreate" class="text-btn">새로운 편지함 만들기</button>
    </div>
  </div>`;

let mailCreate = `
  <button id="close"></button>
  <div class="modal2-wrap mail-create">
    <div class="modal2-header">
      <h2 class="title">새로운 <span class="red">편지함</span> 만들기</h2>
    </div>
    <div class="modal2-contents">
      <input id="createNewId" type="text" placeholder="닉네임을 입력해주세요." />
      <input id="createNewPw" type="password" placeholder="사용할 비밀번호를 입력해주세요" />
      <input id="checkNewPw" type="password" placeholder="비밀번호를 한번 더 입력해주세요"/>
      <button id="createBtn">편지함 만들기</button>
      <button id="goToOpen" class="text-btn">이전으로 돌아가기</button>
    </div>
  </div>`;

let mailBox = `
  <button id="close"></button>
  <div class="modal2-wrap mail-box">
    <div class="modal2-header">
      <h2 class="title">
        <span id="yourName"></span>
        <div>
          <span class="red">편</span>
          <span class="green">지</span>
          <span class="red">함</span>
        </div>
      </h2>
    </div>
    <div class="modal2-contents">
      <ul class="mail-list">
      </ul>
      <button id='closeMailModal'>닫기</button>
    </div>
  </div>`;

goBack.addEventListener("click", function () {
  window.location.href = "/index.html";
});

postBox.addEventListener("click", function () {
  mailModal.classList.add("show");
});

mailModal.addEventListener("click", function (e) {
  if (e.target.id === "goToCreate") {
    mailModal.innerHTML = mailCreate;
  } else if (e.target.id === "goToOpen") {
    mailModal.innerHTML = mailLogin;
  } else if (e.target.id === "openBtn") {
    findNickName();
  } else if (e.target.id === "createBtn") {
    createNewMailBox();
  } else if (e.target.id === "closeMailModal" || e.target.id === "close") {
    // 모달창 닫기
    mailModal.innerHTML = mailLogin;
    mailModal.classList.remove("show");
  } else {
    console.log("error!");
  }
});
//checkNewPw;
/* 새로운 편지함 만들기 */
//1. 닉네임, 비밀번호를 받아서 로컬스토리지에 저장한다.
//원래의 메일박스
let currentMailBox = [];
let currentMailMap = {};

let giftFromSori = `{
  "name": "주인장",
  "passWord": "980330",
  "mailList": [{ "sender": "주인장", "message": "행운의편지", "date": "2024-12-18", "read": 0 }]
}`;

loadLocalStorage();

//편지함 만들기를 하면 객체 하나를 만들자.
function createNewMailBox() {
  if (!checkDuplicateNickname()) {
    return;
  } else {
    console.log("닉네임 중복 체크 완료!");
  }

  console.log("새로운 객체 생성 전");
  let newMailBox = {
    //새로운 객체 생성
    name: document.getElementById("createNewId").value,
    passWord: document.getElementById("checkNewPw").value,
    mailList: [
      { sender: `민국`, message: "바보", date: "2024-12-18", read: 0 },
    ],
  };
  console.log("새로운 객체 생성 완료 : " + newMailBox);
  console.log("currentMailBox에 push전");
  currentMailBox.push(newMailBox);
  console.log("currentMailBox에 push후" + currentMailBox);
  console.log("saveLocalStorage 함수호출");
  saveLocalStorage(currentMailBox);

  mailModal.innerHTML = mailLogin;
  showToast(`${newMailBox.name}님의 메일함 생성이 완료되었습니다`);
}

// 로컬스토리지에 저장시키자!
function saveLocalStorage(currentMailBox) {
  console.log("saveLocalStorage 함수실행");
  window.localStorage.setItem("mailBox", JSON.stringify(currentMailBox));
  console.log("saveLocalStorage 저장완료");
}

//로컬스토리지에 있는 값 가져오기
function loadLocalStorage() {
  let getMailBox = window.localStorage.getItem("mailBox");
  let parsedMailBox = getMailBox
    ? JSON.parse(getMailBox)
    : [JSON.parse(giftFromSori)];
  currentMailBox = parsedMailBox;
  arrayToMap();
}

//배멸에있는걸 다시 map에 담는 함수
function arrayToMap() {
  for (let i = 0; i < currentMailBox.length; i++) {
    const mailBox = currentMailBox[i];
    currentMailMap[mailBox.name] = mailBox;
  }
}

/* 중복 닉네임 체크 */
function checkDuplicateNickname() {
  //인풋에 입력된 닉네임 값을 가져와서, 현재 등록된 메일함의 이름과 같은게 있는지 확인해야함
  //현재 등록된 메일함은 여러개일수 있음.
  let inputNickname = document.getElementById("createNewId").value;
  //현재 등록된 메일함 => currentMailBox 에 그럼... 로컬스토리지에 저장된 값들을 불러와야함. 불러왔다고 치고.
  for (let i = 0; i < currentMailBox.length; i++) {
    if (currentMailBox[i].name == inputNickname) {
      showToast("이미 사용중인 닉네임입니다.");
      console.log("함수종료");
      return false;
    }
  }
  console.log("진짜종료?");
  return true;
}
let myMailList = null;
/* 편지함 열기 */
let loginNickName;
//저장되어있는 값...에서 name을 찾아야겠지?
function findNickName() {
  loginNickName = document.getElementById("loginId").value;
  let loginPassWord = document.getElementById("loginPw").value;

  for (let i = 0; i < currentMailBox.length; i++) {
    if (currentMailBox[i].name == loginNickName) {
      showToast("아이디 일치함");
      if (currentMailBox[i].passWord == loginPassWord) {
        showToast("로그인 성공!");
        mailModal.innerHTML = mailBox;
        showMailList();
        myMailList = document.querySelector(".mail-list"); // mail-list 재할당
        attachMailListEvent(getMailList); // 이벤트 리스너 재등록
        return; // 로그인 성공 후 더 이상 체크하지 않음
      } else {
        showToast("비밀번호가 틀렸습니다"); // 비밀번호가 틀린 경우
        return; // 종료
      }
    }
  }
  showToast("존재하지 않는 닉네임입니다.");
}

function showMailList() {
  const mailBoxTitle = document.getElementById("yourName");
  const mailItemList = document.querySelector(".mail-list");
  mailBoxTitle.innerHTML = `${loginNickName}님의`;

  getMailList = currentMailMap[loginNickName].mailList;
  console.log(getMailList);

  let mailSender;
  let mailMessage;
  let mailMesssageRead;
  let notePaper = null;

  for (let i = 0; i < getMailList.length; i++) {
    mailSender = getMailList[i].sender;
    mailMessage = getMailList[i].message;
    mailMessageRead = getMailList[i].read;

    if (!mailMessageRead) {
      mailItemList.innerHTML = `<li>${mailSender}<span class="new">New</span></li>`;
    } else {
      mailItemList.innerHTML = `<li>${mailSender}</li>`;
    }
  }
}

//리스트를 클릭하면 이제..보여줘야지..... 이벤트 버블링을 이용해보자
function attachMailListEvent(getMailList) {
  if (myMailList) {
    myMailList.addEventListener("click", function (e) {
      let clickedItem = e.target;
      const index = Array.from(this.children).indexOf(clickedItem);
      getMailList[index].read = 1;
      // notePaper HTML 내용
      notePaper = `<div class="mailBox-letter letter-section">
      <div class="letter">
        <div class="letter-content">
          <h2>
            <span>To.</span><span>${loginNickName}</span>
          </h2>
          <div class="letter-body">
            <p class="letter-textarea letter-text">
            ${getMailList[index].message}
            </p>
          </div>
          <h2>
            <span>From.</span><span>${getMailList[index].sender}</span>
          </h2>
          <span class="seal"></span>
        </div>
        <button class="letter-btn">확인</button>
      </div>
      </div>`;
      document.body.insertAdjacentHTML("beforeend", notePaper);

      // "확인" 버튼 클릭 시 notePaper 삭제
      const letterBtn = document.querySelector(".letter-btn");
      letterBtn.addEventListener("click", function () {
        const letterSection = document.querySelector(".letter-section");
        if (letterSection) {
          letterSection.remove(); // notePaper 삭제
          showMailList();
        }
      });
    });
  }
}
