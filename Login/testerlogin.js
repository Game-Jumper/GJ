/*// Initialize Firebase
(function(){*/
//ADD HEY, (X); SIGNOUT BUTTON
var config = {
    apiKey: "AIzaSyBsnqMW3L_2pjboOOzZJ8fJDYzGgCxcyoo",
    authDomain: "game-jumper-tester.firebaseapp.com",
    databaseURL: "https://game-jumper-tester.firebaseio.com",
    projectId: "game-jumper-tester",
    storageBucket: "game-jumper-tester.appspot.com",
    messagingSenderId: "457793690679"
};
firebase.initializeApp(config);
    /*//Get Elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    //Add Login Event
    btnLogin.addEventListener('click', e => {
        //Get Email & Pass
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign In
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });
    //Add RealTime Listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log('Not Logged In');
        }
    });
}());*/
function toggleSignIn() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
        alert('Invalid Login Credentials');
        return;
    }   
    if (password.length < 4) {
        alert('Invalid Login Credentials');
        return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        if(firebase.auth().currentUser.email == "lukestrong47@gmail.com") {
            console.log("Luke - Test Account");
            var usersName = "Test";
            var userData = {
                currentMoney: "TEST VERSION",
                nextPayday: "TEST VERSION",
                lukeMessages: "TEST VERSION",
                estimatedMoney: "TEST VERSION"
            };
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            var userOverallData = document.getElementById('testerSection');
            userOverallData.style.display = "block";
            var loginData = document.getElementById('login-page');
            loginData.style.display = "none";
            var helloText = document.getElementById('hello-text');
            helloText.style.display = "block";
            document.getElementById('yourMoney').innerHTML = userData.currentMoney;
            document.getElementById('estimation').innerHTML = userData.estimatedMoney;
            document.getElementById('payDay').innerHTML = userData.nextPayday;
            document.getElementById('messagesFro').innerHTML = userData.lukeMessages;
            document.getElementById('hello-text').innerHTML = "Hello, " + usersName + "!";
            //
        } else if(firebase.auth().currentUser.email == "jaket.goldman@gmail.com") {
            console.log("Jake");
            var usersName = "Jake";
            var userData = {
                currentMoney: "$0.05",
                nextPayday: "Jan 5th",
                lukeMessages: "New Game Up on Saturday",
                estimatedMoney: "$3.75"
            };
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            var userOverallData = document.getElementById('testerSection');
            userOverallData.style.display = "block";
            var loginData = document.getElementById('login-page');
            loginData.style.display = "none";
            var helloText = document.getElementById('hello-text');
            helloText.style.display = "block";
            document.getElementById('yourMoney').innerHTML = userData.currentMoney;
            document.getElementById('estimation').innerHTML = userData.estimatedMoney;
            document.getElementById('payDay').innerHTML = userData.nextPayday;
            document.getElementById('messagesFro').innerHTML = userData.lukeMessages;
            document.getElementById('hello-text').innerHTML = "Hello, " + usersName + "!";
            //
        } else if(firebase.auth().currentUser.email == "jkarch04@gmail.com") {
            console.log("Jason");
            var usersName = "Jason";
            var userData = {
                currentMoney: "$0.05",
                nextPayday: "Jan 5th",
                lukeMessages: "New Game Up on Saturday",
                estimatedMoney: "$3.75"
            };
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            var userOverallData = document.getElementById('testerSection');
            userOverallData.style.display = "block";
            var loginData = document.getElementById('login-page');
            loginData.style.display = "none";
            var helloText = document.getElementById('hello-text');
            helloText.style.display = "block";
            document.getElementById('yourMoney').innerHTML = userData.currentMoney;
            document.getElementById('estimation').innerHTML = userData.estimatedMoney;
            document.getElementById('payDay').innerHTML = userData.nextPayday;
            document.getElementById('messagesFro').innerHTML = userData.lukeMessages;
            document.getElementById('hello-text').innerHTML = "Hello, " + usersName + "!";
            //
        } else if(firebase.auth().currentUser.email == "gamejumpergj@gmail.com") {
            console.log("Test Account");
            var usersName = "Test";
            var userData = {
                currentMoney: "TEST VERSION",
                nextPayday: "TEST VERSION",
                lukeMessages: "TEST VERSION",
                estimatedMoney: "TEST VERSION"
            };
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            var userOverallData = document.getElementById('testerSection');
            userOverallData.style.display = "block";
            var loginData = document.getElementById('login-page');
            loginData.style.display = "none";
            var helloText = document.getElementById('hello-text');
            helloText.style.display = "block";
            document.getElementById('yourMoney').innerHTML = userData.currentMoney;
            document.getElementById('estimation').innerHTML = userData.estimatedMoney;
            document.getElementById('payDay').innerHTML = userData.nextPayday;
            document.getElementById('messagesFro').innerHTML = userData.lukeMessages;
            document.getElementById('hello-text').innerHTML = "Hello, " + usersName + "!";
            //
        } else if(firebase.auth().currentUser.email == "eloftus1888@gmail.com") {
            console.log("Eamon");
            var usersName = "Eamon";
            var userData = {
                currentMoney: "$0.10",
                nextPayday: "Jan 5th",
                lukeMessages: "New Game Up on Saturday",
                estimatedMoney: "$3.75"
            };
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            var userOverallData = document.getElementById('testerSection');
            userOverallData.style.display = "block";
            var loginData = document.getElementById('login-page');
            loginData.style.display = "none";
            var helloText = document.getElementById('hello-text');
            helloText.style.display = "block";
            document.getElementById('yourMoney').innerHTML = userData.currentMoney;
            document.getElementById('estimation').innerHTML = userData.estimatedMoney;
            document.getElementById('payDay').innerHTML = userData.nextPayday;
            document.getElementById('messagesFro').innerHTML = userData.lukeMessages;
            document.getElementById('hello-text').innerHTML = "Hello, " + usersName + "!";
            //
        } else if(firebase.auth().currentUser.email == "lvgamejumper@gmail.com") {
            console.log("Luke V.");
            var usersName = "Luke";
            var userData = {
                currentMoney: "$0.10",
                nextPayday: "Jan 5th",
                lukeMessages: "New Game Up on Saturday",
                estimatedMoney: "$3.75"
            };
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            var userOverallData = document.getElementById('testerSection');
            userOverallData.style.display = "block";
            var loginData = document.getElementById('login-page');
            loginData.style.display = "none";
            var helloText = document.getElementById('hello-text');
            helloText.style.display = "block";
            document.getElementById('yourMoney').innerHTML = userData.currentMoney;
            document.getElementById('estimation').innerHTML = userData.estimatedMoney;
            document.getElementById('payDay').innerHTML = userData.nextPayday;
            document.getElementById('messagesFro').innerHTML = userData.lukeMessages;
            document.getElementById('hello-text').innerHTML = "Hello, " + usersName + "!";
        } else {
            console.log("Not signed in");
        }
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Invalid Login Credentials');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
    });
}

/*initApp handles setting up UI event listeners and registering Firebase auth listeners:
- firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
out, and that is where we update the UI.*/

function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var uid = user.uid;
            var providerData = user.providerData;
            // [START_EXCLUDE]
            /*document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');*/
        } else {
            var helloText = document.getElementById('hello-text');
            /*userOverview.style.display = "none";*/
            helloText.style.display = "none";
        }
    });
    // [END authstatelistener]
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}
window.onload = function() {
    initApp();
};