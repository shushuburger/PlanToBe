document.addEventListener("DOMContentLoaded", function () {
  // URL에서 카테고리 정보 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  
  const buttons = document.querySelectorAll(".category-btn");
  const difficultySelector = document.getElementById("difficulty-selector");
  const difficultyButtons = document.querySelectorAll(".difficulty-btn");

  // 카테고리 선택 처리
  if (category) {
      // 모든 버튼에서 active 클래스 제거
      buttons.forEach(button => button.classList.remove("active"));
      
      // 클릭된 카테고리 버튼에 active 클래스 추가
      const activeButton = document.querySelector(`.category-btn[data-category='${category}']`);
      if (activeButton) {
          activeButton.classList.add("active");
      }

      // 난이도 선택을 숨기거나 표시
      if (category === "difficulty") {
          difficultySelector.classList.remove("hidden");
      } else {
          difficultySelector.classList.add("hidden");
      }

      // 모든 리스트 숨기기
      document.querySelectorAll(".plant-list").forEach(list => list.classList.add("hidden"));

      // 선택된 카테고리 리스트만 표시
      const targetList = document.getElementById(category);
      if (targetList) {
          targetList.classList.remove("hidden");
      }
  }
  
  // 카테고리 버튼 클릭 시
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

  // 난이도 버튼 클릭 시
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

  // 식물 상세 보기 버튼 클릭 시
  const detailsButtons = document.querySelectorAll(".details-btn");
  detailsButtons.forEach(button => {
      button.addEventListener("click", function () {
          const plantName = this.parentElement.querySelector("span").textContent;
          window.location.href = `../plant_detail/plant_detail.html?plant=${encodeURIComponent(plantName)}`;
      });
  });

  // 로고 클릭 시 메인 페이지로 돌아가기
  document.getElementById('header-logo').addEventListener('click', () => {
      window.location.href = '../main.html'; // Adjust path as needed
  });
});

const searchInput = document.getElementById("searchInput");        
searchInput.addEventListener("keyup", function (event) {
    // Enter 키가 눌렸을 때만 동작
    if (event.key === "Enter") {
        const searchQuery = searchInput.value.trim().toLowerCase(); // 공백 제거 및 소문자 변환

        if (searchQuery.length > 0) {
            // 로컬스토리지에서 plantData 가져오기
            const plantData = JSON.parse(localStorage.getItem("plantData"));

            // plantData가 존재하고, 그 key들만 뽑아서 리스트로 만들기
            const plantKeys = plantData ? Object.keys(plantData) : [];

            // plantKeys에서 searchQuery와 일치하는 키가 있는지 확인
            const foundKey = plantKeys.find(key => key.toLowerCase().includes(searchQuery));

            if (foundKey) {
                // 식물이 존재하면 plant_detail.html로 이동하며 정보를 전달
                window.location.href = `../plant_detail/plant_detail.html?plant=${encodeURIComponent(foundKey)}`;
            } else {
                // 일치하는 식물이 없으면 실패 메시지 출력
                alert("식물 정보가 존재하지 않습니다.");
            }
        }
    }
});