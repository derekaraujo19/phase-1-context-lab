/* Your Code Here */

function createEmployeeRecord(employee) {
    return {
      firstName: employee[0],
      familyName: employee[1],
      title: employee[2],
      payPerHour: employee[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }

  function createEmployeeRecords(employees) {
    const employee = employees.map(createEmployeeRecord);
    return employee;
  }

  function createTimeInEvent(datestamp) {
    this.timeInEvents.push({
      type: "TimeIn",
      hour: Number(datestamp.slice(11)),
      date: datestamp.slice(0, 10)
    })
    return this;
  }

  function createTimeOutEvent(datestamp) {
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: Number(datestamp.slice(11)),
      date: datestamp.slice(0, 10)
    })
    return this;
  }

  function hoursWorkedOnDate(matchDate) {

    for (let i = 0; i < this.timeInEvents.length; i++) {
      if (this.timeInEvents[i].date === matchDate) {
        const difference = this.timeOutEvents[i].hour - this.timeInEvents[i].hour;
        if (difference < 1000) {
          const slicedDiff = difference.toString().slice(0,1);
          return Number(slicedDiff);
        } else {
          const slicedDiff = difference.toString().slice(0,2);
          return Number(slicedDiff);
        }
      }
    }
  }

  function wagesEarnedOnDate(matchDate) {
    const hours = hoursWorkedOnDate.call(this, matchDate);
    return hours * this.payPerHour;
  }



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    for (const record of srcArray) {
        // console.log(srcArray);
        let nameLength = record.firstName.length;
        if (record.firstName.slice(0, nameLength) === firstName) {
            return record;
        } else {
            return undefined;
        }
    }
}


function calculatePayroll(records){
    var sum = 0;
    for (let i = 0; i < records.length; i++) {
      var totalPayroll = allWagesFor.call(records[i]);
      sum += totalPayroll;
    }
    return sum;
  }
