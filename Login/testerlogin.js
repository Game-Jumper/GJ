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
            setUser();
            getJobs();
        } else {
            var helloText = document.getElementById('hello-text');
            helloText.style.display = "none";
        }
    });
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}
function setUser() {
    firebase.database().ref('Users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
        var data = snapshot.val();
        document.getElementById('testerSection').style.display = "block";
        document.getElementById('login-page').style.display = "none";
        document.getElementById('hello-text').style.display = "block";
        document.getElementById('yourMoney').innerHTML = data.tester.currentMoney;
        document.getElementById('payDay').innerHTML = data.tester.nextPayday;
        document.getElementById('messagesFro').innerHTML = data.tester.messagesFrom;
        var split = data.name.split(' ');
        var fname = split[0].split('');
        document.getElementById('hello-text').innerHTML = fname[0] + ". " + split[1];
    });
}
window.onload = function() {
    initApp();
};
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
            for(var i = 0; i < amt; i++) {
                var name = data[i].name;
                var link = data[i].link;
                if(data[i].done == true) {
                    var text = document.createElement("p");
                    text.classList.add("center");
                    var inside = document.createElement("a");
                    inside.classList.add("done");
                    inside.innerHTML = name;
                    inside.href = link;
                    inside.disabled = true;
                    text.appendChild(inside);
                    document.getElementById("jobs").appendChild(text);
                } else {
                    var text = document.createElement("p");
                    text.classList.add("center");
                    var inside = document.createElement("a");
                    inside.classList.add("blue");
                    inside.innerHTML = name;
                    inside.href = link;
                    text.appendChild(inside);
                    document.getElementById("jobs").appendChild(text);
                }
            }
        }
    });
}