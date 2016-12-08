// Initialize Firebase
var config = {
    apiKey: "AIzaSyAEKJVuLKlpF5CmOgjYhY7scH3BwDEPwqI",
    authDomain: "fir-train-time.firebaseapp.com",
    databaseURL: "https://fir-train-time.firebaseio.com",
    storageBucket: "fir-train-time.appspot.com",
    messagingSenderId: "840866995004"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function() {

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    // Prevents moving to new page
    return false;
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");

    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;

    // Minutes Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    var arrivalTime = moment(nextTrain).format("hh:mm");

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
        trainFrequency + "</td><td>" + arrivalTime + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});
