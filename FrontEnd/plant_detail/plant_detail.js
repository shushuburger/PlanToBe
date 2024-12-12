document.addEventListener("DOMContentLoaded", function () {
  // 초기 데이터 설정 및 localStorage에 저장 (한 번만 실행)
  if (!localStorage.getItem("plantData")) {
    const plantData = {
      "고구마": {
          info: "고구마는 힐링과 식용 모두에 적합한 다용도 식물입니다. 햇볕이 잘 드는 장소에서 키우면 좋습니다. 물은 흙이 마르면 충분히 주세요.",
          routines: [
              { title: "물 주기", frequency: 3 },
              { title: "흙 상태 체크", frequency: 7 }
          ],
          caution: "과도한 물을 주면 뿌리가 썩을 수 있으니 주의하세요."
      },
      "몬스테라": {
          info: "몬스테라는 넓고 독특한 잎 모양으로 인테리어에 적합합니다. 공기 정화 능력이 뛰어나며, 간접적인 햇빛을 좋아합니다.",
          routines: [
              { title: "물 주기", frequency: 7 },
              { title: "흙 상태 체크", frequency: 10 }
          ],
          caution: "직사광선은 잎을 태울 수 있으니 피해야 합니다."
      },
      "산세베리아": {
          info: "산세베리아는 초보자에게 적합한 강인한 식물입니다. 건조한 환경에서도 잘 자라며 물은 흙이 완전히 말랐을 때만 주세요.",
          routines: [
              { title: "물 주기", frequency: 14 },
              { title: "흙 상태 체크", frequency: 14 }
          ],
          caution: "추운 환경에서는 잎이 손상될 수 있으니 온도를 유지해주세요."
      },
      "필로덴드론": {
          info: "필로덴드론은 밝은 공간에서 잘 자라는 실내 식물입니다. 흙이 약간 건조할 때 물을 주며, 잎을 자주 닦아주면 건강하게 키울 수 있습니다.",
          routines: [
              { title: "물 주기", frequency: 5 },
              { title: "흙 상태 체크", frequency: 7 }
          ],
          caution: "잎이 갈변하면 과습일 가능성이 높습니다. 물 주는 주기를 조정하세요."
      },
      "아레카야자": {
          info: "아레카야자는 실내 공기 정화에 탁월한 식물로, 따뜻하고 습기가 많은 환경에서 잘 자랍니다. 강한 직사광선은 피하세요.",
          routines: [
              { title: "물 주기", frequency: 7 },
              { title: "흙 상태 체크", frequency: 10 }
          ],
          caution: "잎 끝이 갈색으로 변하면 습도가 부족할 수 있습니다. 주변 습도를 높여주세요."
      },
      "스파티필름": {
          info: "스파티필름은 어두운 환경에서도 잘 자라는 공기 정화 식물입니다. 꽃이 자주 피며, 적절한 습도를 유지해주는 것이 중요합니다.",
          routines: [
              { title: "물 주기", frequency: 5 },
              { title: "흙 상태 체크", frequency: 7 }
          ],
          caution: "과도한 물은 뿌리 썩음병을 유발할 수 있으니 물을 주기 전에 흙 상태를 반드시 확인하세요."
      },
      "페퍼로미아": {
          info: "페퍼로미아는 작은 잎과 다양한 색깔로 인테리어용으로 인기 있는 식물입니다. 과도한 물을 피하고 통풍이 잘 되는 환경을 좋아합니다.",
          routines: [
              { title: "물 주기", frequency: 10 },
              { title: "흙 상태 체크", frequency: 14 }
          ],
          caution: "추운 환경에서는 성장이 둔화되니 적정 온도를 유지해주세요."
      },
      "틸란드시아": {
          info: "틸란드시아는 흙 없이 자라는 독특한 식물입니다. 직사광선을 피하며 공중 습도를 자주 공급해주는 것이 중요합니다.",
          routines: [
              { title: "물 분무하기", frequency: 3 },
              { title: "공기 습도 체크", frequency: 7 }
          ],
          caution: "물에 너무 오래 담가두면 썩을 수 있으니 적당한 분무만 해주세요."
      },
      "로즈마리": {
          info: "로즈마리는 허브 식물로 요리에 자주 사용됩니다. 햇빛을 좋아하며, 물은 흙이 완전히 마를 때만 줍니다.",
          routines: [
              { title: "물 주기", frequency: 7 },
              { title: "흙 상태 체크", frequency: 10 }
          ],
          caution: "배수가 잘 되지 않으면 뿌리가 썩을 수 있으니 화분 배수구를 확인하세요."
      },
      "바질": {
          info: "바질은 상큼한 향으로 요리에 자주 사용되는 허브 식물입니다. 따뜻하고 햇빛이 많은 장소를 좋아합니다.",
          routines: [
              { title: "물 주기", frequency: 3 },
              { title: "흙 상태 체크", frequency: 5 }
          ],
          caution: "찬 바람에 민감하니 실내 온도를 일정하게 유지해주세요."
      },
      "타임": {
          info: "타임은 건조한 환경에서도 잘 자라는 허브 식물로, 독특한 향을 가지고 있습니다. 물은 흙이 완전히 말랐을 때만 주세요.",
          routines: [
              { title: "물 주기", frequency: 10 },
              { title: "흙 상태 체크", frequency: 14 }
          ],
          caution: "물을 너무 자주 주면 뿌리가 썩을 수 있으니 주의하세요."
      },
      "딜": {
          info: "딜은 요리와 장식에 사용되는 허브 식물입니다. 햇볕이 잘 드는 곳에서 잘 자라며 적절한 수분을 유지해주는 것이 중요합니다.",
          routines: [
              { title: "물 주기", frequency: 5 },
              { title: "흙 상태 체크", frequency: 7 }
          ],
          caution: "뿌리가 민감하므로 옮겨 심을 때 주의해야 합니다."
      }
    };  
    localStorage.setItem("plantData", JSON.stringify(plantData));
    console.log("초기 plantData가 localStorage에 저장되었습니다.");
  }

  // localStorage에서 plantData 가져오기
  const storedPlantData = JSON.parse(localStorage.getItem("plantData"));

  if (!storedPlantData) {
    console.error("localStorage에 plantData가 없습니다.");
    return;
  }

  // URL에서 식물 이름 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const plantName = urlParams.get("plant");

  if (plantName && storedPlantData[plantName]) {
    const plantInfo = storedPlantData[plantName];

    // HTML 요소에 정보 업데이트
    document.getElementById("plant-name").textContent = plantName;
    document.getElementById("plant-info").textContent = plantInfo.info;
    document.getElementById("plant-caution").textContent = `주의사항: ${plantInfo.caution}`;

    // 이미지 설정
    const imagePath = `../images/${plantName}.jpeg`;
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
    document.getElementById("plant-caution").textContent = "";
  }

  // 뒤로가기 버튼 기능
  window.goBack = function () {
    window.history.back();
  };
});

// 헤더 로고 클릭 시 메인 페이지로 이동
document.getElementById('header-logo').addEventListener('click', () => {
  window.location.href = '../main.html'; // 경로 필요에 따라 수정
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