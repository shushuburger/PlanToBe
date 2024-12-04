document.addEventListener("DOMContentLoaded", function () {
  // URL에서 식물 이름 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const plantName = urlParams.get("plant");

  // 이미지 경로 설정 (images 폴더 사용)
  const imagePath = `../images/${plantName}.jpeg`;

  // 식물 데이터 (루틴 정보 포함)
  const plantData = {
    "고구마": {
      info: "고구마는 힐링과 식용 모두에 적합한 다용도 식물입니다. 햇볕이 잘 드는 장소에서 키우면 좋습니다. 물은 흙이 마르면 충분히 주세요.",
      routines: [
        { title: "물 주기", frequency: 3 },
        { title: "흙 상태 체크", frequency: 7 }
      ]
    },
    "몬스테라": {
      info: "몬스테라는 넓고 독특한 잎 모양으로 인테리어에 적합합니다. 공기 정화 능력이 뛰어나며, 간접적인 햇빛을 좋아합니다.",
      routines: [
        { title: "물 주기", frequency: 7 },
        { title: "흙 상태 체크", frequency: 10 }
      ]
    },
    "산세베리아": {
      info: "산세베리아는 초보자에게 적합한 강인한 식물입니다. 건조한 환경에서도 잘 자라며 물은 흙이 완전히 말랐을 때만 주세요.",
      routines: [
        { title: "물 주기", frequency: 14 },
        { title: "흙 상태 체크", frequency: 14 }
      ]
    },
    "필로덴드론": {
      info: "필로덴드론은 밝은 공간에서 잘 자라는 실내 식물입니다. 흙이 약간 건조할 때 물을 주며, 잎을 자주 닦아주면 건강하게 키울 수 있습니다.",
      routines: [
        { title: "물 주기", frequency: 5 },
        { title: "흙 상태 체크", frequency: 7 }
      ]
    }
  };

  // 해당 식물 정보 가져오기
  if (plantName && plantData[plantName]) {
    const plantInfo = plantData[plantName];

    // HTML 요소에 정보 업데이트
    document.getElementById("plant-name").textContent = plantName;
    document.getElementById("plant-info").textContent = plantInfo.info;

    // 이미지 설정
    const photoElement = document.getElementById("plant-photo");
    photoElement.style.backgroundImage = `url(${imagePath})`;
    photoElement.textContent = ""; // 텍스트 제거

    // "키우기" 버튼 클릭 시 캘린더로 이동
    const growButton = document.getElementById("grow-btn");
    growButton.addEventListener("click", function () {
      const existingData = JSON.parse(localStorage.getItem("calendarEvents")) || [];

      // 애칭 입력
      const nickname = prompt(`${plantName}의 애칭을 입력해주세요:`) || plantName;

      // 중복 확인 (닉네임 기준)
      if (existingData.some(event => event.title.includes(`${nickname} 키우기 시작`))) {
        alert("이미 등록된 닉네임입니다.");
        return;
      }

      // 현재 로컬 날짜 구하기
      const today = new Date();
      const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

      // 루틴 일정 생성
      const newEvents = [
        {
          title: `${nickname} 키우기 시작`,
          start: localDate, // 로컬 날짜 저장
          backgroundColor: "#BEDFB2",
          borderColor: "#BEDFB2",
          textColor: "#000000"
        },
        ...plantInfo.routines.map(routine => {
          const routineEvents = [];
          for (let i = 0; i < 30; i += routine.frequency) {
            const eventDate = new Date(today);
            eventDate.setDate(today.getDate() + i);
            const eventLocalDate = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, "0")}-${String(eventDate.getDate()).padStart(2, "0")}`;
            routineEvents.push({
              title: `${nickname} - ${routine.title}`,
              start: eventLocalDate, // 로컬 날짜 저장
              backgroundColor: "#BEDFB2",
              borderColor: "#BEDFB2",
              textColor: "#000000"
            });
          }
          return routineEvents;
        }).flat()
      ];

      // 로컬 스토리지에 저장
      const updatedData = [...existingData, ...newEvents];
      localStorage.setItem("calendarEvents", JSON.stringify(updatedData));

      // 캘린더로 이동
      window.location.href = "../calendar/calendar.html";
    });
  } else {
    // 식물 정보가 없을 경우 기본 메시지 표시
    document.getElementById("plant-name").textContent = "정보 없음";
    document.getElementById("plant-info").textContent = "해당 식물에 대한 정보가 없습니다.";
  }

  // 뒤로가기 버튼 기능
  window.goBack = function () {
    window.history.back();
  };
});
