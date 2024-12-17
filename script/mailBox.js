const postBox = document.querySelector(".post-box");
const mailModal = document.querySelector(".modal2");
const goToCreate = document.getElementById("goToCreate");

// 맵과 리스트로 로컬스토리지 관리하기
let mailBoxMap = {}; // 아이디를 키로, 메일박스를 값으로 하는 맵
let mailBoxList = []; // 메일박스 목록 배열

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
      <input id="checkNewPW" type="password" placeholder="비밀번호를 한번 더 입력해주세요"/>
      <button id="createBtn">편지함 만들기</button>
      <button id="goToOpen" class="text-btn">이전으로 돌아가기</button>
    </div>
  </div>`;

let mailBox = `
  <button id="close"></button>
  <div class="modal2-wrap mail-box">
    <div class="modal2-header">
      <h2 class="title">
        <span id="yourName">소리님의</span>
        <div>
          <span class="red">편</span>
          <span class="green">지</span>
          <span class="red">함</span>
        </div>
      </h2>
    </div>
    <div class="modal2-contents">
      <ul class="mail-list">
        <li>귀요미소리<span class="new">New</span></li>
        <li>이프덴보고싶다<span class="new">New</span></li>
        <li>안녕하다람쥐</li>
        <li>보낸사람4</li>
        <li>보낸사람5</li>
        <li>보낸사람5</li>
        <li>보낸사람5</li>
      </ul>
      <button id='closeMailModal'>닫기</button>
    </div>
  </div>`;

postBox.addEventListener("click", function () {
  mailModal.classList.add("show");
});

// 새로운 편지함을 만든다 => 새로운 객체를 하나 만든다 => 받는사람과 비밀번호를 받아서 객체에 저장한다
// 단 비밀번호는 2번이상 입력해야한다. 이름은 아이디, 영문, 숫자만 가능하다.
let mailBoxItem = {
  recipient: "",
  message: "",
  sender: "",
  date: "",
  password: "",
};

let userId;
let userPw;
let checkPw;

// 새로운 편지함 만들기
function createMailBox() {
  userId = document.getElementById("createNewId").value;
  userPw = document.getElementById("createNewPw").value;
  checkPw = document.getElementById("checkNewPW").value;

  if (userId === "") {
    showToast("사용하실 닉네임을 입력해주세요");
    return;
  }
  if (!validateInput(userId)) return;
  if (중복방지(userId)) return;
  if (userPw === "" || checkPw === "") {
    showToast("비밀번호를 입력해주세요");
    return;
  }
  if (userPw !== checkPw) {
    showToast("비밀번호를 다시 확인해주세요");
    return;
  }

  // 새 객체 생성
  const newMailBoxItem = {
    recipient: userId,
    message: "",
    sender: "",
    date: new Date().toISOString(),
    password: userPw,
  };

  addMailBox(newMailBoxItem); // 리스트와 맵에 저장
  saveLocalStorage(newMailBoxItem); // 로컬스토리지에 저장

  showToast("메일함 생성에 성공하였습니다!");
  mailModal.innerHTML = mailLogin;
}

// 아이디, 비밀번호 정규식
function validateInput(userId) {
  const idRegex = /^[a-zA-Z0-9가-힣]+$/; // 영문, 숫자, 한글 허용
  if (!idRegex.test(userId)) {
    showToast("아이디는 영문, 숫자, 한글만 입력 가능합니다.");
    return false;
  }
  return true; // 모두 통과
}

// 맵과 리스트에 값 넣기
function addMailBox(mailBox) {
  mailBoxList.push(mailBox);
  mailBoxMap[mailBox.recipient] = mailBox;
}

// 로컬스토리지에 저장하는 함수
function saveLocalStorage(mailBoxItem) {
  // 기존에 저장된 데이터를 가져오기
  let existingData = loadLocalStorage(); // 로컬스토리지에서 데이터 가져오기
  // null이나 빈 값이 아닌 경우에만 추가
  if (mailBoxItem) {
    existingData.push(mailBoxItem); // 새 데이터를 추가
    window.localStorage.setItem("mailBox", JSON.stringify(existingData));
  }
}

// 로컬 스토리지에서 데이터 로드하는 함수
function loadLocalStorage() {
  return JSON.parse(window.localStorage.getItem("mailBox")) || [];
}

// 로컬스토리지에 데이터가 있는지 확인 후 데이터를 추가/로드 하는 함수
function checkLocalStorage(mailBoxItem) {
  let getData = loadLocalStorage(); // 기존 데이터 가져오기
  if (mailBoxItem) {
    getData.push(mailBoxItem); // 새로 만든 mailBoxItem을 배열에 추가
    window.localStorage.setItem("mailBox", JSON.stringify(getData)); // 업데이트된 배열을 로컬스토리지에 저장
  }
}

checkLocalStorage();

// 아이디 중복 방지
function 중복방지(inputId) {
  if (mailBoxMap[inputId]) {
    showToast("이미 사용중인 아이디 입니다.");
    return true; // 중복 발견
  }
  return false; // 중복 없음
}

mailModal.addEventListener("click", function (e) {
  if (e.target.id === "goToCreate") {
    mailModal.innerHTML = mailCreate;
  } else if (e.target.id === "goToOpen") {
    mailModal.innerHTML = mailLogin;
  } else if (e.target.id === "openBtn") {
    메일함로그인();
  } else if (e.target.id === "createBtn") {
    createMailBox();
  } else if (e.target.id === "closeMailModal" || e.target.id === "close") {
    // 모달창 닫기
    mailModal.innerHTML = mailLogin;
    mailModal.classList.remove("show");
  } else {
    console.log("error!");
  }
});

// 메일함 로그인
function 메일함로그인() {
  userId = document.getElementById("loginId").value;
  userPw = document.getElementById("loginPw").value;

  let test = mailBoxMap[userId]; // mailBoxMap을 사용하여 빠르게 찾기
  if (!test) {
    showToast("닉네임이나 비밀번호가 일치하지 않습니다!");
  }
  if (mailBoxItem && mailBoxItem.password === userPw) {
    mailModal.innerHTML = mailBox;
    return;
  }

  showToast("닉네임이나 비밀번호가 일치하지 않습니다!");
}

// 간단한 toast 메시지 함수
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// 페이지 로드 시 로컬스토리지에서 메일함 불러오기
function loadMailBoxes() {
  const storedMailBoxes = loadLocalStorage();
  storedMailBoxes.forEach((mailBox) => {
    addMailBox(mailBox); // 로컬스토리지에 저장된 메일함들을 리스트와 맵에 추가
  });
}

loadMailBoxes(); // 페이지 로드 시 로컬스토리지에서 메일함 불러오기
