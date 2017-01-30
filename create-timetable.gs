var startMonth = 'January';
var startDay = 30
var startYear = 2017

var schoolDayStartTime = "09:00"
var recessLengthMinutes = 15
var lunchLengthMinutes = 45
var periodLengthMinutes = 60

var lines = {"1": "Chemistry", "2": "Economics", "3": "Information Technology", "4": "English", "5": "Specialist mathematics", "6": "Information Technology", "r": "Reccess", "l": "Lunch"}

var timetable = [["5", "2", "r", "7", "3", "l", "1", "4"],
                 ["6", "4", "r", "5", "7", "l", "2", "3"],
                 ["7", "1", "r", "3", "2", "l", "4", "6"],
                 ["1", "5", "r", "6", "2", "l", "8", "8"],
                 ["4", "3", "r", "1", "6", "l", "5", "7"]]

function createTimeTable() {

  for (day in timetable) {

    var currentStartTime = schoolDayStartTime

    for (period in timetable[day]) {

       var periodStartTime = new Date(startMonth + " " + startDay + " " + startYear + " " + currentStartTime),
           periodEndTime = new Date(periodStartTime)

       if (timetable[day][period] == "r") {

         periodEndTime.setMinutes(periodStartTime.getMinutes() + recessLengthMinutes);

       } else if (timetable[day][period] == "l") {

         periodEndTime.setMinutes(periodStartTime.getMinutes() + lunchLengthMinutes);

       } else {

         periodEndTime.setMinutes(periodStartTime.getMinutes() + periodLengthMinutes);

       }


       if (lines[timetable[day][period]] != undefined) {

         CalendarApp.createEventSeries(lines[timetable[day][period]], periodStartTime, periodEndTime, CalendarApp.newRecurrence().addWeeklyRule())

       }

       currentStartTime = periodEndTime.getHours() + ":" + periodEndTime.getMinutes()

    }

    startDay += 1

  }

}
