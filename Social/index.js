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
var fileName;
function loadPosts() {
    firebase.database().ref().once('value').then(function(snapshot) {
        var data = snapshot.val().Social.Posts;
        var users = snapshot.val().Users;
        for(var i = Object.keys(data).length - 1; i > -1; i--) (function(i) {
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
            postName.innerHTML = users[data[i].user].name;
            postContain.appendChild(postName);
            postContain.appendChild(document.createElement("br"));
            var hr = document.createElement("hr");
            hr.classList.add("w3-clear");
            postContain.appendChild(hr);
            if(data[i].src != null) {
                var img = document.createElement("img");
                //var starsRef = firebase.storage().ref().child('posts/' + data[i].src);
                firebase.storage().ref().child('posts/' + data[i].src).getDownloadURL().then(function(url) {
                    img.src = url;
                });
                img.classList.add("w3-margin-bottom");
                img.style.width = "100%";
                postContain.appendChild(img);
            }
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
            fillPics();
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
        if(document.getElementById("file").files.length == 0) {
            firebase.database().ref('Social/Posts/' + Object.keys(data.Social.Posts).length).update({
                user: firebase.auth().currentUser.uid,
                prosrc: data.Users[firebase.auth().currentUser.uid].prosrc,
                likes: 0,
                text: document.getElementById('text').innerHTML
            });
            location.reload();
        } else {
            firebase.database().ref('Social/Posts/' + Object.keys(data.Social.Posts).length).update({
                user: firebase.auth().currentUser.uid,
                prosrc: data.Users[firebase.auth().currentUser.uid].prosrc,
                likes: 0,
                text: document.getElementById('text').innerHTML,
                src: fileName
            });
            location.reload();
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
            } else {
                document.getElementById("myModal").style.display = "none";
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
}
function fillPics() {
    firebase.database().ref('Users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
        var data = snapshot.val();
        document.getElementById('topRight').src = "Icons/" + data.prosrc + ".png";
        document.getElementById('myAccount').src = "Icons/" + data.prosrc + ".png";
        if(data.prosrc == 7 || data.prosrc == 1 || data.prosrc == 2) {
            document.getElementById('topRight').style.backgroundColor = "black";
            document.getElementById('myAccount').style.backgroundColor = "black";
        } else {
            document.getElementById('topRight').style.backgroundColor = "white";
            document.getElementById('myAccount').style.backgroundColor = "white";
        }
        var assignments = document.createTextNode(" " + data.tester.completed + " Assignments Completed")
        document.getElementById('assign').appendChild(assignments);
        document.getElementById('balance').innerHTML = data.tester.currentMoney;
    });
}
var fileButton = document.getElementById('file');
fileButton.addEventListener('change', function(e){
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('posts/' + file.name);
    storageRef.put(file).then(function(snapshot) {
        var file = fileButton.files[0];
        fileName = file.name;
    });
});