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
