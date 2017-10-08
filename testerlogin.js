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
            window.location.replace("https://gamejumper.info/Login/tester.html")
        } else {
            console.log('Not Logged In');
        }
    });
}()); 