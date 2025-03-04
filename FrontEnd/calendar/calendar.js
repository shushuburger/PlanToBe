document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  // 기존 저장된 데이터 가져오기
  const storedEvents = JSON.parse(localStorage.getItem("calendarEvents")) || [];

  // 캘린더 초기화
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    height: "100%", // 캘린더 높이를 전체 사용
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay"
    },
    events: storedEvents, // 로컬 스토리지에서 로드된 일정 표시
    locale: "ko",
    editable: true, // 드래그 앤 드롭 활성화
    selectable: true,
    dayMaxEvents: 3, // 하루 최대 3개의 일정만 표시
    moreLinkContent: function(args) {
      return `+${args.num}개의 일정`; // "n개의 일정"으로 표시
    },
    dateClick: function(info) {
      const title = prompt("새로운 일정 제목을 입력하세요:");
      if (title) {
        const newEvent = {
          title: title,
          start: info.dateStr,
          allDay: true,
          backgroundColor: "#BEDFB2",
          borderColor: "#BEDFB2",
          textColor: "#000000"
        };
        calendar.addEvent(newEvent);

        // 로컬 스토리지에 저장
        storedEvents.push(newEvent);
        localStorage.setItem("calendarEvents", JSON.stringify(storedEvents));
      }
    },
    eventClick: function(info) {
      // 일정 삭제 확인
      const deleteConfirm = confirm(`"${info.event.title}" 일정을 삭제하시겠습니까?`);
      if (deleteConfirm) {
        // 일정 삭제
        info.event.remove();

        // 로컬 스토리지에서 삭제
        const updatedEvents = storedEvents.filter(event => event.title !== info.event.title || event.start !== info.event.start);
        localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
      }
    },
    eventDrop: function(info) {
      // 일정이 드래그로 이동된 경우 로컬 스토리지 업데이트
      const updatedEvents = calendar.getEvents().map(event => ({
        title: event.title,
        start: event.startStr,
        backgroundColor: event.backgroundColor,
        borderColor: event.borderColor,
        textColor: event.textColor
      }));

      // 로컬 스토리지에 변경된 데이터 저장
      localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
    }
  });

  calendar.render();
  const userData = JSON.parse(localStorage.getItem("user"));  // 사용자 데이터 가져오기
  const userEmail = userData ? userData.email : null;  // 이메일 정보 가져오기

  emailjs.init("G6CmWIfOhB14UwjnD");

    const today = new Date();
    const todayDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const todayEvents = storedEvents.filter(event => event.start === todayDate);
    if (todayEvents.length > 0) {
        const serviceID = "service_tl3ba86";
        const templateID = "template_vs8b4fc";
        const emailParams = {
            to_email: userEmail,
            subject: "PlanToBe에서 오늘의 할 일을 알려드립니다.",
            tasks: todayEvents.map(event => `- ${event.title}`).join('\n'),
        };

        emailjs.send(serviceID, templateID, emailParams)
            .then(() => {
                console.log("이메일 전송 성공!");
            })
            .catch(error => {
                console.error("이메일 전송 실패:", error);
            });
    } else {
        console.log("오늘 해야 할 일이 없습니다.");
    }
});
document.getElementById('header-logo').addEventListener('click', () => {
  window.location.href = '../main.html'; // Adjust path as needed
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
