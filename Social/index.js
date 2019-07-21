var firebaseConfig = {
    apiKey: "AIzaSyBsnqMW3L_2pjboOOzZJ8fJDYzGgCxcyoo",
    authDomain: "game-jumper-tester.firebaseapp.com",
    databaseURL: "https://game-jumper-tester.firebaseio.com",
    projectId: "game-jumper-tester",
    storageBucket: "game-jumper-tester.appspot.com",
    messagingSenderId: "457793690679",
    appId: "1:457793690679:web:98d416b70632c843"
};
firebase.initializeApp(firebaseConfig);
initApp();
function loadPosts() {
    firebase.database().ref('Social/Posts').once('value').then(function(snapshot) {
        var data = snapshot.val();
        for(var i = 0; i < Object.keys(data).length; i++) (function(i) {
            var postContain = document.createElement("div");
            postContain.classList.add("w3-container");
            postContain.classList.add("w3-card");
            postContain.classList.add("w3-white");
            postContain.classList.add("w3-round");
            postContain.classList.add("w3-margin")
            document.getElementById('postContainer').appendChild(postContain);
            postContain.appendChild(document.createElement("br"));
            var postProImg = document.createElement("img");
            postProImg.src = "Icons/" + data[i].prosrc + ".png";
            postProImg.classList.add("w3-left");
            postProImg.classList.add("w3-circle");
            postProImg.classList.add("w3-margin-right");
            postProImg.style.width = "60px";
            postContain.appendChild(postProImg);
            var postLikes = document.createElement("span");
            postLikes.classList.add("w3-right");
            postLikes.classList.add("w3-opacity");
            postLikes.innerHTML = data[i].likes + " Likes";
            postContain.appendChild(postLikes);
            var postName = document.createElement("h4");
            postName.innerHTML = data[i].user;
            postContain.appendChild(postName);
            postContain.appendChild(document.createElement("br"));
            var hr = document.createElement("hr");
            hr.classList.add("w3-clear");
            postContain.appendChild(hr);
            var img = document.createElement("img");
            img.src = data[i].src;
            img.classList.add("w3-margin-bottom");
            img.style.width = "100%";
            postContain.appendChild(img);
            var postContent = document.createElement("p");
            postContent.innerHTML = data[i].text;
            postContain.appendChild(postContent);
            var postButton = document.createElement("button");
            postButton.type = "button";
            postButton.classList.add("w3-button");
            postButton.classList.add("w3-theme-d1");
            postButton.classList.add("w3-margin-bottom");
            postButton.onclick = function() {likePost(i);};
            var postThumb = document.createElement("i");
            postThumb.classList.add("fa");
            postThumb.classList.add("fa-thumbs-up");
            postButton.appendChild(postThumb);
            postButton.appendChild(document.createTextNode(" Like"));
            postContain.appendChild(postButton);
        })(i);
    });
}
function likePost(num) {
    console.log(num);
    firebase.database().ref('Social/Posts/' + num).once('value').then(function(snapshot) {
        var data = snapshot.val();
        console.log(data);
        firebase.database().ref('Social/Posts/' + num.toString()).update({
            likes: data.likes += 1
        });
        location.reload();
    });
}
function post() {
    firebase.database().ref().once('value').then(function(snapshot) {
        var data = snapshot.val();
        if(document.getElementById('file').value != null) {
            console.log("hi")
        } else {
            firebase.database().ref('Social/Posts/' + Object.keys(data.Social.Posts).length).update({
                user: data.Users[firebase.auth().currentUser].name,
                prosrc: data.Users[firebase.auth().currentUser].prosrc,
                likes: 0,
                text: document.getElementById('text').value
            });
        }
    });
}
function signIn() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        firebase.database().ref().once('value').then(function(snapshot) {
            var data = snapshot.val();
            if(data.Users[firebase.auth().currentUser.uid].prosrc == null) {
                document.getElementById("profilePic").style.display = "block";
            }
        });
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Invalid Login Credentials');
        } else {
          alert(errorMessage);
        }
    });
}
function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            loadPosts();
        } else {
            location.replace("https://gamejumper.info/Login/testerlogin.html");
        }
    });
    setTimeout(function(){
        if(firebase.auth().currentUser == null) {
            document.getElementById('myModal').style.display = "block";
        }
    }, 1000);
}
function change(srcNum) {
    firebase.database().ref('Users/' + firebase.auth().currentUser.uid).update({
        prosrc: srcNum
    });
    document.getElementById('myModal').style.display = "none";
    firebase.database().ref('Users/' + firebase.auth().currentUser.uid).once('value').then(function() {
        var data = snapshot.val();
        document.getElementById('topRight').src = "Icons/" + data[i].prosrc + ".png";
    });
}