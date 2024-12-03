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
      editable: true,
      selectable: true,
      dayMaxEvents: 3, // 하루 최대 3개의 일정만 표시
      moreLinkContent: function(args) {
        return `+${args.num}개의 일정`; // "n개의 일정"으로 표시
      },
      eventClick: function(info) {
        alert(`"${info.event.title}" 일정을 선택했습니다.`);
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
      eventDidMount: function(info) {
        // 커스텀 스타일 적용 (예: 텍스트 색상, 배경색)
        info.el.style.backgroundColor = info.event.extendedProps.backgroundColor || "#BEDFB2";
        info.el.style.color = info.event.extendedProps.textColor || "#000000";
      }
    });
  
    calendar.render();
  });
  