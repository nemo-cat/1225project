let lifeCount = 5;
let lifeWrap = document.getElementById("heart");

for (let i = 0; i < lifeCount; i++) {
  lifeWrap.innerHTML += `<div class="life-item"></div>`;
}

let lifeBar = document.querySelectorAll(".life-item");
console.log(lifeBar);

/*

1. 좌,우, 스페이스바 를 이용하여 조작한다.
2. 최대로 갈수있는 범위는 브라우저의 0과 100%까지이다.
3. 점프는 자기 높이의 50%만 할수있다.
4. 장애물과 내 캐릭터가 닿으면 생명이 1개 까인다.
5. 생명이 모두 까이면 게임은 끝이난다.

*/

let myCharacter = document.getElementById("myCharacter");
let obstacle = document.getElementById("obstacle");
let myHeight = 0; //캐릭터 높이값
let myMoveX = 0;
let moveValue = 20; //기본 이동 px
let moveSpeed = 1; //최초 스피드
let moveSpeedFaster = 2; //이속증가
let isSpeedIncreased = false; //속도 증가했는지 확인
let speedTimer = null; //속도 증가를 위한 타이머
let moveFinal = moveValue * moveSpeed; //최종 이동좌표

// 우측으로 움직이는법
// 우측 키보드가 입력되면 내 캐릭터를 x축 + 로 이동시킨다.
window.onkeydown = (e) => {
  // e.keyCode를 사용하여 키값 확인
  if (e.keyCode === 39) {
    moveTo("right");
  } else if (e.keyCode === 37) {
    moveTo("left");
  } else if (e.keyCode === 32) {
    console.log("스페이스바 클릭");
    jumpping();
  }
};

window.onkeyup = () => {
  // 키를 뗐을 때 셋팅 초기화
  if (speedTimer) {
    clearTimeout(speedTimer);
    speedTimer = null;
    moveSpeed = 1;
    isSpeedIncreased = false;
    stopWalking();
  }
};

function moveTo(move) {
  moveSpeed = 1;
  if (move == "right") {
    myMoveX += moveFinal;
    speedIncreased(move);
  } else if (move == "left") {
    myMoveX -= moveFinal;
    speedIncreased(move);
  }

  //최대 이동범위(?) 제한 전체 브라우저 크기 - 내 캐릭터 크기
  let maxWidth = window.innerWidth - myCharacter.offsetWidth;
  /* math.max 가장 큰 값 반환, math.min 가장 작은 값 반환.
  Math.min에서 실제 입력받은값과, 최대 이동범위를 비교하여 최대이동범위를 초과하지 않도록 함.
  Math.max에서 0을 넣은 이유는.. 0보다 작아질순없으니까..
  */
  myMoveX = Math.max(0, Math.min(myMoveX, maxWidth));
  myCharacter.style.left = `${myMoveX}px`;
  walking();
}

function speedIncreased(move) {
  if (!isSpeedIncreased) {
    speedTimer = setTimeout(() => {
      moveSpeed += moveSpeedFaster; // 1초 후 속도를 증가
      moveFinal = moveValue * moveSpeed;
      if (move == "right ") {
        myMoveX += moveFinal;
      } else {
        myMoveX -= moveFinal;
      }

      console.log(`speedUp! NowSpeed: ${moveSpeed}`);
    }, 1000);
    isSpeedIncreased = true;
  }
}

/* 
점프는 마지막에 생각하자... 
이제 장에물과 내 캐릭터가 닿는 순간을 캐치해 내야한다.
1. 실시간으로 내 캐릭터의 좌표와 장애물의 좌표를 구해야할듯?
document.querySelector('div').getBoundingClientRect()
2. 좌표가 겹칠때 console.log를 찍자.
*/

/*
충돌 판정
A : characterPosition
B : obstaclePosition
A의 오른쪽 끝이 B의 왼쪽 끝보다 크다
A의 왼쪽 끝이 B의 오른쪽 끝보다 작다.
A의 아래쪽 끝이 B의 위쪽 끝 보다 크다
A의 위쪽 끝이 B의 아래쪽 끝 보다 작다.
*/
let gameCount = 30;
let gameTimerEl = document.getElementById("gameTimer");
let gameTimer = setInterval(function () {
  gameCount--;
  if (gameCount == 0) {
    clearInterval(gameTimer);
  }
  if (gameCount < 10) {
    gameTimerEl.innerHTML = `0${gameCount}`;
  } else {
    gameTimerEl.innerHTML = gameCount;
  }

  if (gameCount == 0 && lifeCount > 0) {
    gameOverLay.style.display = "block";
    gameClear.classList.add("show");
  }
}, 1000);

let setTimer = false;
let gameOverLay = document.querySelector(".modal");
let gameOver = document.querySelector(".game-over");
let gameClear = document.querySelector(".game-clear");
let gameRestart = document.querySelector("#gameReStart");

setInterval(() => {
  let characterX = myCharacter.getBoundingClientRect().x;
  let charcaterY = myCharacter.getBoundingClientRect().y;
  let characterW = myCharacter.getBoundingClientRect().width;
  let charcaterH = myCharacter.getBoundingClientRect().height;
  let characterPosition = {
    x: [characterX, characterX + characterW],
    y: [charcaterY, charcaterY + charcaterH],
  };

  let obstacleX = obstacle.getBoundingClientRect().x;
  let obstacleY = obstacle.getBoundingClientRect().y;
  let obstacleW = obstacle.getBoundingClientRect().width;
  let obstacleH = obstacle.getBoundingClientRect().height;
  let obstaclePosition = {
    x: [obstacleX, obstacleX + obstacleW],
    y: [obstacleY, obstacleY + obstacleH],
  };
  console.log(
    `캐릭터 좌표 : ${characterPosition.x[0]}, ${characterPosition.x[1]}`
  );

  if (
    characterPosition.x[1] > obstaclePosition.x[0] && // 캐릭터의 오른쪽 끝이 장애물의 왼쪽 끝보다 크다면
    characterPosition.x[0] < obstaclePosition.x[1] && // 캐릭터의 왼쪽 끝이 장애물의 오른쪽 끝보다 작다면
    characterPosition.y[1] > obstaclePosition.y[0] && // 캐릭터의 아래쪽 끝이 장애물의 위쪽 끝보다 아래라면
    characterPosition.y[0] < obstaclePosition.y[1] // 캐릭터의 위쪽 끝이 장애물의 아래쪽 끝보다 위라면
  ) {
    if (!setTimer) {
      // setTimer가 false일 때만 타이머 설정
      myCharacter.classList.add("hurt");
      setTimer = true;
      setTimeout(() => {
        // 300ms 후에 타이머가 true로 바뀌며, 생명 감소
        lifeCount--;
        lifeBar[lifeCount].classList.add("loss");
        if (lifeCount == 0 && gameCount > 0) {
          gameOverLay.style.display = "block";
          gameOver.classList.add("show");
          clearInterval(gameTimer);
        }
        myCharacter.classList.remove("hurt");
        setTimer = false;
      }, 500);
    }
  }
}, 200);

/* 
하기 싫어도 점프를 만들긴 해야한다.
점프....
내 캐릭터가 bottom 0인데... 내 캐릭터의 높이의 절반만 점프할수이따.
사실 2단점프로 생각하고있는데 일단 1단 점프만 하자.

점프란 최소값 0 에서부터 최대값 내 캐릭터의 높이/2 에 도달한 후, 최대값에서 최소값으로 내려와야한다.

*/
let maxJump = myCharacter.clientHeight * 0.7;
let myMoveY = 0;
console.log(maxJump);

function jumpping() {
  console.log("점핑 함수 실행");
  myCharacter.style.bottom = `${maxJump}px`;
  myCharacter.classList.add("jump");

  setTimeout(() => {
    myCharacter.style.bottom = `0px`;
    myCharacter.classList.remove("jump");
  }, 500);
}

/* 근데 겁나 부자연스러움 ㅋㅋ 움직이면서 점프하려면 물리를 넣어야할거같은데...응애.. */

//걷는 모션

let isWalking = false; // 걷는 상태 추적
let changeImg = true; // 이미지 전환 상태

function walking() {
  if (isWalking) {
    return; // 이미 걷는 중이면 함수 종료
  }
  isWalking = true;

  let walkingInterval = setInterval(() => {
    if (!isWalking) {
      clearInterval(walkingInterval); // 걷는 상태가 종료되면 반복 중지
      return;
    }

    if (changeImg) {
      myCharacter.classList.add("move1");
      myCharacter.classList.remove("move2");
      changeImg = false;
    } else {
      myCharacter.classList.add("move2");
      myCharacter.classList.remove("move1");
      changeImg = true;
    }
  }, 300);
}

function stopWalking() {
  isWalking = false; // 걷기 종료
  myCharacter.classList.remove("move1", "move2"); // 모든 걷기 이미지 초기화
}

gameRestart.addEventListener("click", function () {
  window.location.reload();
});
