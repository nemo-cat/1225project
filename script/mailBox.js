const postBox = document.querySelector(".post-box");
const mailModal = document.querySelector(".modal2");
const goToCreate = document.getElementById("goToCreate");

let mailLogin = `
  <button id="close"></button>
  <div class="modal2-wrap mail-login">
    <div class="modal2-header">
      <h2 class="title">누구의 편지함을 열까요?</h2>
    </div>
    <div class="modal2-contents">
      <input type="text" placeholder="닉네임을 입력해주세요." />
      <input type="password" placeholder="설정한 비밀번호를 입력해주세요."/>
      <button id="openBtn">편지함 열기</button>
      <button id="goToCreate" class="text-btn">새로운 편지함 만들기</button>
    </div>
  </div>`;
let mailCreate = `
  <button id="close"></button>
  <div class="modal2-wrap mail-create">
    <div class="modal2-header">
      <h2 class="title">새로운 편지함 만들기</h2>
    </div>
    <div class="modal2-contents">
      <input type="text" placeholder="닉네임을 입력해주세요." />
      <input type="password" placeholder="사용할 비밀번호를 입력해주세요" />
      <input type="password" placeholder="비밀번호를 한번 더 입력해주세요"/>
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

mailModal.addEventListener("click", function (e) {
  if (e.target.id === "goToCreate") {
    mailModal.innerHTML = mailCreate;
  } else if (e.target.id === "goToOpen") {
    mailModal.innerHTML = mailLogin;
  } else if (e.target.id === "createBtn" || e.target.id === "openBtn") {
    mailModal.innerHTML = mailBox;
  } else if (e.target.id === "closeMailModal" || e.target.id === "close") {
    //모달창 닫기
    mailModal.innerHTML = mailLogin;
    mailModal.classList.remove("show");
  } else {
    console.log("error!");
  }
});
