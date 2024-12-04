document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".category-btn");
    const difficultySelector = document.getElementById("difficulty-selector");
    const difficultyButtons = document.querySelectorAll(".difficulty-btn");
  
    buttons.forEach(button => {
      button.addEventListener("click", function () {
        const category = button.getAttribute("data-category");
  
        // 모든 버튼에서 active 클래스 제거
        buttons.forEach(btn => btn.classList.remove("active"));
  
        // 클릭된 버튼에 active 클래스 추가
        button.classList.add("active");
  
        // 난이도 선택의 특별 동작 처리
        if (category === "difficulty") {
          difficultySelector.classList.remove("hidden");
  
          // 난이도 버튼 초기화
          difficultyButtons.forEach(btn => btn.classList.remove("active"));
  
          // 모든 리스트 숨김
          document.querySelectorAll(".plant-list").forEach(list => {
            list.classList.add("hidden");
          });
          return;
        } else {
          difficultySelector.classList.add("hidden");
        }
  
        // 모든 리스트를 숨김 처리
        document.querySelectorAll(".plant-list").forEach(list => {
          list.classList.add("hidden");
        });
  
        // 선택된 카테고리 리스트만 표시
        const targetList = document.getElementById(category);
        if (targetList) {
          targetList.classList.remove("hidden");
        }
      });
    });
  
    difficultyButtons.forEach(button => {
      button.addEventListener("click", function () {
        const level = button.getAttribute("data-level");
  
        // 모든 난이도 버튼에서 active 클래스 제거
        difficultyButtons.forEach(btn => btn.classList.remove("active"));
  
        // 선택된 난이도 버튼에 active 클래스 추가
        button.classList.add("active");
  
        // 모든 리스트를 숨김 처리
        document.querySelectorAll(".plant-list").forEach(list => {
          list.classList.add("hidden");
        });
  
        // 선택된 난이도 리스트만 표시
        const targetList = document.getElementById(`difficulty-${level}`);
        if (targetList) {
          targetList.classList.remove("hidden");
        }
      });
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const detailsButtons = document.querySelectorAll(".details-btn");
  
    detailsButtons.forEach(button => {
      button.addEventListener("click", function () {
        const plantName = this.parentElement.querySelector("span").textContent;
        // `plant_detail.html`로 이동하며 식물 이름을 URL에 전달
        window.location.href = `../plant_detail/plant_detail.html?plant=${encodeURIComponent(plantName)}`;
      });
    });
  });
  