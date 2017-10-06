// Initialize Firebase
(function(){
    var config = {
        apiKey: "AIzaSyBsnqMW3L_2pjboOOzZJ8fJDYzGgCxcyoo",
        authDomain: "game-jumper-tester.firebaseapp.com",
        databaseURL: "https://game-jumper-tester.firebaseio.com",
        projectId: "game-jumper-tester",
        storageBucket: "game-jumper-tester.appspot.com",
        messagingSenderId: "457793690679"
    };
    firebase.initializeApp(config);
    //Get Elements
    const txtEmail = document.getElementById('userName');
    const txtPassword = document.getElementById('userPassword');
    const btnLogin = document.getElementById('loginBtn');
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
            window.open("Login/tester.html")
        } else {
            console.log('Not Logged In');
        }
    });
}());

function pageLoad() {
    if(firebaseUser) {
        return true;
    } else {
        document.getElementById("main").innerHTML = "";
        window.location.replace("http://gamejumper.info");
    }
}