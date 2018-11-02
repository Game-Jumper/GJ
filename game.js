var config = {
    apiKey: "AIzaSyCiPbUFz41fy0pet2Xeva_iB3G78DOhpuI",
    authDomain: "game-jumper-customer.firebaseapp.com",
    databaseURL: "https://game-jumper-customer.firebaseio.com",
    projectId: "game-jumper-customer",
    storageBucket: "game-jumper-customer.appspot.com",
    messagingSenderId: "917916079945"
};
firebase.initializeApp(config);
initApp();
var cEmail;
var cPassword;
var unsave = false;
var show = false;
function checkUser(gameId) {
    console.log("user")
    if(firebase.auth().currentUser != null) {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
            var data = snapshot.val();
            if(data.saves != null) {
                console.log("saves exist")
                for(var i = 1; i < Object.keys(data.saves).length + 2; i++) {
                    console.log(i)
                    if(data.saves[i] == gameId) {
                        console.log("game exists")
                        unsave = true;
                        document.getElementById('save').innerHTML = "Unsave Game";
                        break;
                    }
                }
            }
        });
    }
}
function miniGamesClick() {
    document.getElementById('noSave').style.display = "none";
    document.getElementById('asteroids').style.display = "none";
    document.getElementById('pong').style.display = "none";
    if(firebase.auth().currentUser != null) {
        document.getElementById('asteroids').style.display = "block";
        document.getElementById('pong').style.display = "block";
    }
    document.getElementById('snake').style.display = "block";
    document.getElementById('newAge').style.display = "block";
    document.getElementById('helicopter').style.display = "none";
    document.getElementById('form').style.display = "none";
    document.getElementById('congrats').style.display = "none";
    document.getElementById('verify').style.display = "none";
    document.getElementById('forgot').style.display = "none";
    document.getElementById('change').style.display = "none";
}
function fullGamesClick() {
    document.getElementById('noSave').style.display = "none";
    document.getElementById('helicopter').style.display = "block";
    document.getElementById('asteroids').style.display = "none";
    document.getElementById('snake').style.display = "none";
    document.getElementById('pong').style.display = "none";
    document.getElementById('form').style.display = "none";
    document.getElementById('newAge').style.display = "none";
    document.getElementById('congrats').style.display = "none";
    document.getElementById('forgot').style.display = "none";
    document.getElementById('verify').style.display = "none";
    document.getElementById('change').style.display = "none";
}
function allGamesClick() {
    document.getElementById('asteroids').style.display = "none";
    document.getElementById('pong').style.display = "none";
    document.getElementById('noSave').style.display = "none";
    document.getElementById('helicopter').style.display = "block";
    document.getElementById('snake').style.display = "block";
    document.getElementById('newAge').style.display = "block";
    document.getElementById('form').style.display = "none";
    document.getElementById('congrats').style.display = "none";
    document.getElementById('forgot').style.display = "none";
    document.getElementById('verify').style.display = "none";
    document.getElementById('change').style.display = "none";
    if(firebase.auth().currentUser != null) {
        document.getElementById('pong').style.display = "block";
        document.getElementById('asteroids').style.display = "block";
    }
}
function logInClick() {
    document.getElementById('noSave').style.display = "none";
    document.getElementById('helicopter').style.display = "none";
    document.getElementById('asteroids').style.display = "none";
    document.getElementById('snake').style.display = "none";
    document.getElementById('pong').style.display = "none";
    document.getElementById('newAge').style.display = "none";
    document.getElementById('form').style.display = "block";
    document.getElementById('forgot').style.display = "block";
    if(firebase.auth().currentUser != null) {
        document.getElementById('change').style.display = "block";
        document.getElementById('congrats').style.display = "block";
        document.getElementById('form').style.display = "none";
        document.getElementById('real').style.display = "none";
        if(firebase.auth().currentUser.emailVerified == false) {
            document.getElementById('verify').style.display = "block";
        }
    }
}
function signMeIn() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        document.getElementById('change').style.display = "block";
        document.getElementById('congrats').style.display = "block";
        if(firebase.auth().currentUser.emailVerified == false) {
            document.getElementById('verify').style.display = "block";
        }
        show = true;
        initApp();
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
function recentGamesClick() {
    if(firebase.auth().currentUser.w == "game-jumper-customer.firebaseapp.com") {
        document.getElementById('form').style.display = "none";
        document.getElementById('asteroids').style.display = "none";
        document.getElementById('snake').style.display = "none";
        document.getElementById('pong').style.display = "none";
        document.getElementById('newAge').style.display = "none";
        document.getElementById('helicopter').style.display = "none";
        document.getElementById('congrats').style.display = "none";
        document.getElementById('forgot').style.display = "none";
        document.getElementById('verify').style.display = "none";
        document.getElementById('change').style.display = "none";
        document.getElementById('noSave').style.display = "none";
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
            var data = snapshot.val();
            if(data.saves != null) {
                for(var i = 0; i < Object.keys(data.saves).length + 1; i++) {
                    if(data.saves[i] != null) {
                        document.getElementById(data.saves[i]).style.display = "block";
                    }
                }
            } else {
                document.getElementById('noSave').style.display = "block";
            }
        });
    }
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
    });
}
function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if(document.getElementById('game-main') == null) {
                document.getElementById('login').innerHTML = "Logged In " + "(" + firebase.auth().currentUser.email + ")";
                document.getElementById('form').style.display = "none";
                document.getElementById('real').style.display = "none";
                document.getElementById('recent').innerHTML = "Saved Games";
                document.getElementById('recent').style.cursor = "pointer";
                if(show == false) {
                    document.getElementById('asteroids').style.display = "block";        
                    document.getElementById('pong').style.display = "block";
                }
                show = true;
            }
        } else {
            console.log("No User");
            if(document.getElementById('auth') != null) {
                console.log("j");
                location.replace('../../pricing.html');
            }
        }
    });
}
function saveGame(gameId) {
    if(firebase.auth().currentUser != null) {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
            var data = snapshot.val();
            if(data.saves != null) {
                console.log("saves exist")
                if(unsave == true) {
                    console.log("unsaving")
                    for(var i = 1; i < Object.keys(data.saves).length + 2; i++) {
                        if(data.saves[i] == gameId) {
                            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/saves/' + i).remove();
                            unsave = false;
                            document.getElementById('save').innerHTML = "Save Game";
                            finishRemove(i);
                            break;
                        }
                    }
                } else {
                    console.log("saving")
                    for(var e = 1; e < Object.keys(data.saves).length + 2; e++){
                        if(data.saves[e] == null) {
                            console.log("found open")
                            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/saves').update({
                                [e]: gameId
                            });
                            break;
                        } else {
                            console.log("exists")
                        }
                    }
                    unsave = true;
                    document.getElementById('save').innerHTML = "Unsave Game";
                }
            } else {
                console.log("saves don't exist")
                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/saves').update({
                    1: gameId
                });
                unsave = true;
                document.getElementById('save').innerHTML = "Unsave Game";
            }
        });
    } else {
        alert("This is a premium feature.");
    }
}
function finishRemove(startNum) {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/saves').once('value').then(function(snapshot) {
        var data = snapshot.val();
        for(var i = startNum + 1; i < Object.keys(data.saves).length + 3; i++) {
            if(data.saves[i] != null) {
                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/saves').update({
                    [parseInt(i) - 1]: data.saves[i]
                });
            }
        }
    });
}