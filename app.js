var config = {
    apiKey: "AIzaSyBsnqMW3L_2pjboOOzZJ8fJDYzGgCxcyoo",
    authDomain: "game-jumper-tester.firebaseapp.com",
    databaseURL: "https://game-jumper-tester.firebaseio.com",
    projectId: "game-jumper-tester",
    storageBucket: "game-jumper-tester.appspot.com",
    messagingSenderId: "457793690679"
};
firebase.initializeApp(config);
var currentEmail = firebase.auth().currentUser.email;
if(currentEmail == "jaket.goldman@gmail.com") {
    var usersName = "jake";
    var userData = {
        currentMoney = "$0",
        nextPayday = "Jan 5th",
        lukeMessages = "None"
    };
} else if(currentEmail == "Noah") {
    var usersName = "noah";
    var userData = {
        currentMoney = "$0",
        nextPayday = "Jan 5th",
        lukeMessages = "None"
    };
} else if(currentEmail == "jkarch04@gmail.com") {
    var usersName = "jason";
    var userData = {
        currentMoney = "$0",
        nextPayday = "Jan 5th",
        lukeMessages = "None"
    };
} else if(currentEmail == "lukestrong47@gmail.com") {
    var usersName = "luke";
    var userData = {
        currentMoney = "TEST VERSION",
        nextPayday = "TEST VERSION",
        lukeMessages = "TEST VERSION"
    };
} else {
    document.getElementById('main').innerHTML = " ";
    window.location.replace("https://gamejumper.info");
}