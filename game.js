var config = {
    apiKey: "AIzaSyCiPbUFz41fy0pet2Xeva_iB3G78DOhpuI",
    authDomain: "game-jumper-customer.firebaseapp.com",
    databaseURL: "https://game-jumper-customer.firebaseio.com",
    projectId: "game-jumper-customer",
    storageBucket: "game-jumper-customer.appspot.com",
    messagingSenderId: "917916079945"
};
firebase.initializeApp(config);

var sEmail = Cookies.get('email');
var sPassword = Cookies.get('password');


firebase.auth().signInWithEmailAndPassword(sEmail, sPassword).then(function() {
    document.getElementById('login').innerHTML = "Logged In " + "(" + firebase.auth().currentUser.email + ")";
    document.getElementById('recent').innerHTML = "Recently Played";
    document.getElementById('recent').style.cursor = "pointer";
}).catch(function(error) {
    return true;
});
var cEmail;
var cPassword
//
function miniGamesClick() {
    document.getElementById('asteroids').style.display = "block";
    document.getElementById('snake').style.display = "block";
    document.getElementById('pong').style.display = "block";
    document.getElementById('form').style.display = "none";
    document.getElementById('congrats').style.display = "none";
    document.getElementById('verify').style.display = "none";
    document.getElementById('forgot').style.display = "none";
    document.getElementById('change').style.display = "none";
}
function fullGamesClick() {
    document.getElementById('asteroids').style.display = "none";
    document.getElementById('snake').style.display = "none";
    document.getElementById('pong').style.display = "none";
    document.getElementById('form').style.display = "none";
    document.getElementById('congrats').style.display = "none";
    document.getElementById('forgot').style.display = "none";
    document.getElementById('verify').style.display = "none";
    document.getElementById('change').style.display = "none";
}
function allGamesClick() {
    document.getElementById('asteroids').style.display = "block";
    document.getElementById('snake').style.display = "block";
    document.getElementById('pong').style.display = "block";
    document.getElementById('form').style.display = "none";
    document.getElementById('congrats').style.display = "none";
    document.getElementById('forgot').style.display = "none";
    document.getElementById('verify').style.display = "none";
    document.getElementById('change').style.display = "none";
}
function logInClick() {
    initApp();
    document.getElementById('asteroids').style.display = "none";
    document.getElementById('snake').style.display = "none";
    document.getElementById('pong').style.display = "none";
    document.getElementById('form').style.display = "block";
    document.getElementById('forgot').style.display = "block";
    if(firebase.auth().currentUser.uid.length > 5) {
        console.log(firebase.auth().currentUser);
        document.getElementById('congrats').style.display = "block";
        document.getElementById('form').style.display = "none";
        document.getElementById('login').innerHTML = "Logged In " + "(" + firebase.auth().currentUser.email + ")";
    }
    function signMeIn() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
            Cookies.set('email', email);
            Cookies.set('password', password);
            cEmail = Cookies.get('email');
            document.getElementById('login').innerHTML = "Logged In " + "(" + firebase.auth().currentUser.email + ")";
            document.getElementById('congrats').style.display = "block";
            document.getElementById('form').style.display = "none";
            document.getElementById('real').style.display = "none";
            document.getElementById('recent').innerHTML = "Recently Played";
            document.getElementById('recent').style.cursor = "pointer";
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Invalid Login Credentials');
            } else {
                alert(errorMessage + ' Try Again in a Few Seconds');
            }
        });
    }
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
                console.log("In");
                // [START_EXCLUDE]
                /*document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
                document.getElementById('quickstart-sign-in').textContent = 'Sign out';
                document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');*/
                document.getElementById('congrats').style.display = "block";
                document.getElementById('form').style.display = "none";
                document.getElementById('real').style.display = "none";
                document.getElementById('change').style.display = "block";
                if(firebase.auth().currentUser.emailVerified == false) {
                    document.getElementById('verify').style.display = "block";
                }
            } else {
                console.log("No User");
                document.getElementById('login').innerHTML = "Login";
            }
        });
        document.getElementById('sign-in').addEventListener('click', signMeIn, false);
    }
}
function recentGamesClick() {
    if(firebase.auth().currentUser.w == "game-jumper-customer.firebaseapp.com") {
        document.getElementById('form').style.display = "none";
        document.getElementById('asteroids').style.display = "none";
        document.getElementById('snake').style.display = "none";
        document.getElementById('pong').style.display = "none";
        document.getElementById('congrats').style.display = "none";
        document.getElementById('forgot').style.display = "none";
        document.getElementById('verify').style.display = "none";
        document.getElementById('change').style.display = "none";
        if(Cookies.get('asteroids') == "true") {
            document.getElementById('asteroids').style.display = "block";
        }
        if(Cookies.get('snake') == "true") {
            document.getElementById('snake').style.display = "block";
        }
        if(Cookies.get('pong') == "true") {
            document.getElementById('pong').style.display = "block";
        }
    }
}
function asteroidsClick() {
    Cookies.set('asteroids', 'true');
}
function snakeClick() {
    Cookies.set('snake', 'true');
}
function pongClick() {
    Cookies.set('pong', 'true');
}
function checkFeature() {
    if(firebase.auth().currentUser != null) {
        document.getElementById('recent').style.textDecoration = "underline";
    } else {
        document.getElementById('recent').style.textDecoration = "none";
    }
}
function verifyAccount() {
    firebase.auth().currentUser.sendEmailVerification().then(function() {
        alert("Sent!");
    })
}