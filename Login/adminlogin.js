var config = {
    apiKey: "AIzaSyCrfbcS3Ut5BoyCfNaX-WPUjmglB8cf1kE",
    authDomain: "game-jumper.firebaseapp.com",
    databaseURL: "https://game-jumper.firebaseio.com",
    projectId: "game-jumper",
    storageBucket: "game-jumper.appspot.com",
    messagingSenderId: "1076316179864"
};
firebase.initializeApp(config);
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
            console.log("Luke - Admin");
            var userData = {
                money: "$24",
                name: "Luke",
                lukeMessages: "Start Game #1 ASAP"
            };
            var userOverallData = document.getElementById('adminSection');
            userOverallData.style.display = "block";
            var loginData = document.getElementById('login-page');
            loginData.style.display = "none";
            var helloText = document.getElementById('hello-text');
            helloText.style.display = "block";
            document.getElementById('money').innerHTML = userData.money;
            document.getElementById('messagesFro').innerHTML = userData.lukeMessages;
            document.getElementById('hello-text').innerHTML = "Hello, " + userData.name + "!";
            //
        } else if(firebase.auth().currentUser.email == "cheinold1@gmail.com") {
            console.log("Chance - Admin");
            var userData = {
                money: "$24",
                name: "Chance",
                lukeMessages: "Check Out This - https://gamedistribution.com/developers/"
            };
            var userOverallData = document.getElementById('adminSection');
            userOverallData.style.display = "block";
            var loginData = document.getElementById('login-page');
            loginData.style.display = "none";
            var helloText = document.getElementById('hello-text');
            helloText.style.display = "block";
            document.getElementById('money').innerHTML = userData.money;
            document.getElementById('messagesFro').innerHTML = userData.lukeMessages;
            document.getElementById('hello-text').innerHTML = "Hello, " + userData.name + "!";
            //
        } else if(firebase.auth().currentUser.email == "gamejumpergj@gmail.com") {
            console.log("Chance - Admin");
            var userData = {
                money: "TEST VERSION",
                name: "TEST",
                lukeMessages: "TEST VERSION"
            };
            var userOverallData = document.getElementById('adminSection');
            userOverallData.style.display = "block";
            var loginData = document.getElementById('login-page');
            loginData.style.display = "none";
            var helloText = document.getElementById('hello-text');
            helloText.style.display = "block";
            document.getElementById('money').innerHTML = userData.money;
            document.getElementById('messagesFro').innerHTML = userData.lukeMessages;
            document.getElementById('hello-text').innerHTML = "Hello, " + userData.name + "!";
            //
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