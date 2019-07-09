var config = {
    apiKey: "AIzaSyBsnqMW3L_2pjboOOzZJ8fJDYzGgCxcyoo",
    authDomain: "game-jumper-tester.firebaseapp.com",
    databaseURL: "https://game-jumper-tester.firebaseio.com",
    projectId: "game-jumper-tester",
    storageBucket: "game-jumper-tester.appspot.com",
    messagingSenderId: "457793690679"
};
firebase.initializeApp(config);
function toggleSignIn() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Invalid Login Credentials');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById('quickstart-sign-in').disabled = false;
    });
}
function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            readData();
        }
    });
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}
window.onload = function() {
    initApp();
};
function readData() {
    firebase.database().ref().once('value').then(function(snapshot) {
        var data = snapshot.val().Users;
        var info = snapshot.val().Info;
        if(data[firebase.auth().currentUser.uid].admin == true) {
            var split = data[firebase.auth().currentUser.uid].name.split(' ');
            var fname = split[0].split('');
            document.getElementById('hello-text').innerHTML = fname[0] + ". " + split[1];
            for(var i = 0; i < Object.keys(data.List).length; i++) (function(i) {
                var text = document.createElement("p");
                text.innerHTML = data[data.List[i]].name + " - " + data[data.List[i]].tester.currentMoney;
                text.onclick = function() { sendMessage(data.List[i]); };
                text.classList.add("center");
                document.getElementById('testers').appendChild(text);
            })(i);
            document.getElementById('overall').innerHTML = info.totalMoney;
            document.getElementById('owed').innerHTML = info.moneyOwed;
            getReady();
        } else {
            alert("You are not an admin.");
            location.replace('testerlogin.html');
        }
    });
}
function getReady() {
    var userOverallData = document.getElementById('adminSection');
    userOverallData.style.display = "block";
    var loginData = document.getElementById('login-page');
    loginData.style.display = "none";
    var helloText = document.getElementById('hello-text');
    helloText.style.display = "block";
    getJobs();
}
function sendMessage(uid) {
    firebase.database().ref('Users').once('value').then(function(snapshot) {
        var data = snapshot.val();
        if(uid == "all") {
            var aMess = prompt("What message would you like to send to all?");
            for(var i = 0; i < Object.keys(data.List).length; i++) {
                firebase.database().ref('Users/' + data.List[i] + '/tester').update({
                    messagesFrom: aMess
                });
            }
        } else {
            var message = prompt("What message would you like to send to " + data[uid].name + "?");
            firebase.database().ref('Users/' + uid + '/tester').update({
                messagesFrom: message
            });
        }
    });
}
function addJob() {
    var name = prompt("What is the name of the new job?");
    var link = prompt("What is the link of the new job?");
    firebase.database().ref('Jobs').once('value').then(function(snapshot) {
        var data = snapshot.val();
        var num = Object.keys(data).length - 1;
        firebase.database().ref('Jobs/' + num.toString()).update({
            name: name,
            link: link,
            done: false
        });
    });
    location.reload();
}
function getJobs() {
    firebase.database().ref('Jobs').once('value').then(function(snapshot) {
        var data = snapshot.val();
        var amt = Object.keys(data).length - 1;
        if(data["0"] == null) {
            var text = document.createElement("p");
            text.classList.add("center");
            text.innerHTML = "No Jobs Currently Available";
            document.getElementById("jobs").appendChild(text);
        } else {
            for(var i = 0; i < amt; i++) (function(i) {
                var name = data[i].name;
                var link = data[i].link;
                if(data[i].done == true) {
                    var text = document.createElement("p");
                    text.classList.add("center");
                    text.classList.add("done");
                    text.innerHTML = name;
                    text.href = link;
                    text.onclick = function() { changeJob(i); };
                    text.disabled = true;
                    document.getElementById("jobs").appendChild(text);
                } else {
                    var text = document.createElement("p");
                    text.classList.add("center");
                    text.classList.add("blue");
                    text.innerHTML = name;
                    text.href = link;
                    text.onclick = function() { changeJob(i); };
                    document.getElementById("jobs").appendChild(text);
                }
            })(i);
        }
    });
}
function changeJob(num) {
    firebase.database().ref().once('value').then(function(snapshot) {
        var data = snapshot.val();
        var input = prompt("Type 'change' to change the job. Type 'end' to end the job. Type 'delete' to delete the job. Type 'open' to open the link.");
        if(input == "change") {
            var name = prompt("What will be the new name for '" + data.Jobs[num].name + "'?");
            var link = prompt("What will be the new link for '" + data.Jobs[num].link + "'?");
            firebase.database().ref('Jobs/' + num).update({
                name: name,
                link: link
            });
            location.reload();
        } else if(input == "end") {
            firebase.database().ref('Jobs/' + num).update({
                done: true
            });
            location.reload();
        } else if(input == "delete") {
            for(var i = num; i < Object.keys(data.Jobs).length - 1; i++) {
                console.log(i)
                if(i == Object.keys(data.Jobs).length - 2) {
                    firebase.database().ref('Jobs/' + i).remove();
                    console.log("last")
                } else {
                    firebase.database().ref('Jobs/' + i).update({
                        name: data.Jobs[i + 1].name,
                        link: data.Jobs[i + 1].link,
                        done: data.Jobs[i + 1].done
                    });
                    console.log("one run")
                }
            }
            location.reload();
        } else if(input == "open") {
            window.open(data.Jobs[num].link);
        } else {
            alert("Not a correct prompt.");
        }
    });
}