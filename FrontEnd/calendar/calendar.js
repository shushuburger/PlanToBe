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
});
document.getElementById('header-logo').addEventListener('click', () => {
  window.location.href = '../main.html'; // Adjust path as needed
});