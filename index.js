// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create multiple employee records from an array of arrays
function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

// Function to add a time-in event to an employee record
function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(" ");

    employee.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10)
    });

    return employee;
}

// Function to add a time-out event to an employee record
function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(" ");

    employee.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    });

    return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

// Function to calculate total wages for all worked dates
function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => total + wagesEarnedOnDate(employee, event.date), 0);
}

// Function to calculate payroll for multiple employees
function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}
