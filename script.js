document.addEventListener("DOMContentLoaded", () => {
  const wheel = document.getElementById("wheel");
  const spinButton = document.getElementById("spin-button");
  const prizes = [
    { name: "奖品1", color: "#FFCC00", probability: 0.1 },
    { name: "奖品2", color: "#FF6666", probability: 0.2 },
  ];

  initWheel();

  spinButton.addEventListener("click", spinWheel);

  function initWheel() {
    const total = prizes.length;
    const angle = 360 / total;

    prizes.forEach((prize, index) => {
      const prizeEl = document.createElement("div");
      prizeEl.style.backgroundColor = prize.color;
      prizeEl.style.transform = `rotate(${angle * index}deg) skewY(-${
        90 - angle
      }deg)`;
      prizeEl.setAttribute("data-name", prize.name);

      wheel.appendChild(prizeEl);
    });
  }

  function spinWheel() {
    // 计算总旋转度数（包括慢-快-慢）
    const totalDegrees = 360 * 10 + getRandomDegree(); // 示例：旋转10圈加上随机度数

    let currentDegree = 0;
    let duration = 4000; // 总旋转时间：4000ms
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      // 动画时间曲线（例如：ease-in-out）
      const easeInOut = easeInOutQuad(progress, 0, totalDegrees, duration);

      // 应用旋转到转盘
      wheel.style.transform = `rotate(${easeInOut}deg)`;

      if (progress < duration) {
        // 动画未完成，继续旋转
        requestAnimationFrame(step);
      } else {
        // 动画完成
        currentDegree = easeInOut;
        onSpinComplete();
      }
    }

    requestAnimationFrame(step);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  function getRandomDegree() {
    // 计算一个随机停止度数
    return Math.random() * 360;
  }
  function onSpinComplete() {
    const totalDegrees = 360;
    const prizeDegree = totalDegrees / prizes.length; // 每个奖项占据的角度
    const offsetDegree = 90; // 假设指针在顶部，调整偏移
    const finalDegree = currentDegree % totalDegrees; // 最终停止的度数

    const prizeIndex =
      Math.floor((finalDegree + offsetDegree) / prizeDegree) % prizes.length;
    const winningPrize = prizes[prizeIndex];

    alert(`恭喜你，中得了：${winningPrize.name}`);
  }
});
