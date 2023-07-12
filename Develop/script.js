let todayDate = $("#currentDay");

function currentDate() {
  let currentDateAndTime = dayjs().format('dddd, MMMM DD YYYY (hh:mm:ss A)');
  todayDate.text(currentDateAndTime);
}

currentDate();
setInterval(currentDate, 1000);

let TimeSlots = ["09:00", "10:00", "11:00", "12:00", "01:00", "02:00", "03:00", "04:00", "05:00"];

function generateBlock() {
  for (var i = 0; i < TimeSlots.length; i++) {
    let newTimeBlock = $('<div>');
    let newHourLabel = $('<div>');
    let newDescription = $('<textarea>');
    let newButton = $('<button>');
    
    $('.container-fluid').append(newTimeBlock.append(newHourLabel, newDescription, newButton));
    newTimeBlock.attr({ id: [i + 9], class: "row time-block" });
    newHourLabel.attr("class", "col-2 col-md-1 hour text-center py-3");
    newDescription.attr({ id: "hr" + [i + 9], class: "col-8 col-md-10 description", rows: "3" });
    newButton.attr({ class: "btn saveBtn col-2 col-md-1", 'aria-label': "save" });
    newButton.html(`<i class="fas fa-save" aria-hidden="true"></i>`);
    if (i < 3) {
      newHourLabel.text(TimeSlots[i] + " AM");
    } else {
      newHourLabel.text(TimeSlots[i] + " PM");
    }
  }
  retrieveDescription();
}

generateBlock();

let currentTime = parseInt(dayjs().format('H'));

let timeBlock = $(".time-block");
let label = $(".hour");

$(timeBlock).each(function () {
  let timeBlockHour = parseInt($(this).attr("id"));
  if (timeBlockHour === currentTime) {
    $(this).addClass("present");
    $(this).removeClass("future past");
  } else if (timeBlockHour > currentTime) {
    $(this).addClass("future");
    $(this).removeClass("present past");
  } else if (timeBlockHour < currentTime) {
    $(this).addClass("past");
    $(this).removeClass("present future");
  }
});

let saveButton = $(".saveBtn");

saveButton.click(function () {
  let descriptionValue = $(this).siblings(".description").val();
  let descriptionKey = $(this).parent().attr("id");
  localStorage.setItem(descriptionKey, descriptionValue);
});

function retrieveDescription() {
  for (var i = 0; i < TimeSlots.length; i++) {
    let descriptionKey = [i + 9];
    $("#hr" + [i + 9]).val(localStorage.getItem(descriptionKey));
  }
}

let clearButton = $(".clear-button");

$(clearButton).click(function () {
  localStorage.clear();
  $(".description").val("");
});
