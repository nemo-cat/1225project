/* 1. 눈을 원하는 범위내에서 랜덤으로 생성 */
let snowWrap = document.querySelector(".snow-wrap");
let snowCount = randomNum(50, 100);

for (let i = 0; i < snowCount; i++) {
  snowWrap.innerHTML += `<div class="snow-item"></div>`;
}

/* 2. 눈을 생성했으니 눈의 postion을 랜덤으로 정하기 */

//눈 아이템을 배열에 담아서 postion을 변경해주면 되지않을까?
//x, y축 기준 0~100%가 필요하니까 이값도 랜덤으로 생성
let snowItem = document.querySelectorAll(".snow-item");
let randomX;
let randomY;
let randomSize;

snowItem.forEach((el) => {
  randomX = randomNum(0, 100);
  randomY = randomNum(0, 100);
  randomSize = randomNum(2, 12);
  el.style.left = `${randomX}%`;
  el.style.top = `${randomY}%`;
  el.style.width = `${randomSize}px`;
  el.style.height = `${randomSize}px`;
});

//눈을 랜덤으로 위치시켰으니 이제 현재 위치기준에서 bottom아래로 내려와야해
snowItem.forEach((el) => {
  //el.style.top이 문자열로 나와서 다시 정수로 변환
  let positionY = parseInt(el.style.top);

  let fallingSnow = setInterval(function () {
    positionY++;
    el.style.top = `${positionY}%`;

    if (positionY > 100) {
      positionY = -10;
      el.style.left = `${randomNum(0, 100)}%`; //한번 내린뒤에 left값 변경
      /* css에 transition주니까 움직임은 부드러워졌는데 눈이 다시 올라가는게 보임;
      일시적으로 transition none을 주고 다시 트랜지션 값을 줘야할듯 */
      el.style.transition = "none"; // 일시적으로 transition 비활성화
      setTimeout(() => {
        el.style.transition = "all 0.3s"; // transition 재적용
      }, 500);
    }
  }, 100);
});

function randomNum(min, max) {
  //math.random() * (최대값 - 최소값 + 1)을하여 0~51미만의 수를 랜덤으로 생성,
  //그 후 +50을 더하면 50 ~ 101미만의 수를 랜덤으로 생성
  return Math.floor(Math.random() * (max - min + 1) + min);
}
