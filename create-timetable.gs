function Line(subject, room, teacher){
 this.subject = subject
 this.room = room
 this.teacher = teacher
 
 this.equals = function(compare){
   if(typeof compare !== "Line"){
     return false
   }
   
   return (this.subject == compare.subject && this.room == compare.room && this.teacher == compare.teacher)
 }
}

var RECESS = new Line("Recess", "", "")
var LUNCH = new Line("Lunch", "", "")
var FREE_LINE = new Line("Free Line", "", "")

/**
* Creates a timetable calendar
* @param calendar A calendar to place events onto
* @param timetable An array containing the timetable for the week, (using the constants RECESS, LUNCH, and FREE_LINE as required
* @param start The unix timestamp of midnight on the first day of term
* @param lengthInWeeks Number of weeks term goes for
* @param classStart Milliseconds between midnight and start of class
* @param recessLength Milliseconds recess goes for
* @param lunchLength Milliseconds lunch goes for
* @param periodLength Milliseconds period goes for
* @param lengthBetweenPeriods Milliseconds between periods
**/
function createTimetable(calendar, timetable, start, lengthInWeeks, classStart, recessLength, lunchLength, periodLength, lengthBetweenPeriods) {
  if(typeof calendar == "undefined" || typeof timetable == "undefined" || typeof start == "undefined" || typeof lengthInWeeks == "undefined"){
    return undefined
  }
  
  if(typeof classStart == "undefined"){
    //9 hours
    classStart = 32400*1000 
  }
  if(typeof recessLength == "undefined"){
    //15 minutes
    recessLength = 900*1000
  }
  if(typeof lunchLength == "undefined"){
    //45 minutes
    lunchLength = 2700*1000 
  }
  if(typeof periodLength == "undefined"){
    //1 hour
    periodLength = 3600*1000 
  }
  if(typeof lengthBetweenPeriods == "undefined"){
    //0 milliseconds
    lengthBetweenPeriods = 0*1000 
  }
  
  var dayStart = start + classStart
  var currentTime = dayStart
  for(var i = 0; i < lengthInWeeks; i++){
    
    for(day in timetable){
      
      for(periodNum in timetable[day]){
        
        var period = timetable[day][periodNum]
        
        var periodStart = new Date(currentTime)
        var periodEnd
        
        if(period == RECESS){
          periodEnd = new Date(currentTime += recessLength)
        }else if(period == LUNCH){
          periodEnd = new Date(currentTime += lunchLength)
        }else{
          periodEnd = new Date(currentTime += periodLength)
        }
        
        var event = calendar.createEvent(period.subject, periodStart, periodEnd)

        event.setDescription("Teacher: " + period.teacher)
        
        currentTime+=lengthBetweenPeriods
      }
      
      //Add a day
      currentTime = dayStart+=(86400*1000)
      
      if(day % 3 == 0){
       Utilities.sleep(10000) 
      }
    }
    
    //Skip weekend
    currentTime = dayStart+=(86400*2000)
  }
}
