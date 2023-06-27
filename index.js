// Your code here
function createEmployeeRecord(array){
    const testEmployee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    // console.log(testEmployee)
    return testEmployee
}

function createEmployeeRecords(arrays){  
    return arrays.map((info) => {
        return createEmployeeRecord(info)
    })
}

function createTimeInEvent(record, dateTime){
    let [date, hour] = dateTime.split(' ')
    
    record.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })
    return record
}

function createTimeOutEvent(record, dateTime){
    let [date, hour] = dateTime.split(' ')
    
    record.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    })
    return record
}

function allWagesFor(record){
    let datesWorked = record.timeInEvents.map(function (e) {
        return e.date
    })

    let allPay = datesWorked.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(record, d)
    }, 0)

    return allPay
}

function calculatePayroll(allRecords){
    return allRecords.reduce(function (mem, rec) {
        return mem + allWagesFor(rec)
    }, 0)
}

function hoursWorkedOnDate(record, date){
    let InEvent = record.timeInEvents.find((e)=>{
        return e.date === date
    })
    let outEvent = record.timeOutEvents.find((e)=>{
        return e.date === date
    })
    return (outEvent.hour - InEvent.hour) / 100
}

function wagesEarnedOnDate(record, date){
    let wage = hoursWorkedOnDate(record, date) * record.payPerHour
    return wage
}
