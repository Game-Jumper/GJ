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
var canReset = false;
function scan() {
    firebase.database().ref('Social/Posts').on('value', function(snapshot) {
        console.log("begin")
        var posts = document.getElementsByClassName('auto-update');
        if(canReset == false) {
            canReset = true;
        } else {
            location.reload();
        }
    });
}
function loadPosts() {
    console.log("ran")
    firebase.database().ref().once('value').then(function(snapshot) {
        var data = snapshot.val().Social.Posts;
        var users = snapshot.val().Users;
        for(var i = Object.keys(data).length - 1; i > -1; i--) (function(i) {
            var postContain = document.createElement("div");
            postContain.classList.add("w3-container");
            postContain.classList.add("w3-card");
            postContain.classList.add("w3-white");
            postContain.classList.add("w3-round");
            postContain.classList.add("w3-margin");
            postContain.classList.add("auto-update");
            document.getElementById('postContainer').appendChild(postContain);
            postContain.appendChild(document.createElement("br"));
            var postProImg = document.createElement("img");
            postProImg.src = "Icons/" + users[data[i].user].prosrc + ".png";
            postProImg.classList.add("w3-left");
            postProImg.classList.add("w3-circle");
            postProImg.classList.add("w3-margin-right");
            postProImg.style.width = "60px";
            postContain.appendChild(postProImg);
            var postLikes = document.createElement("span");
            postLikes.classList.add("w3-right");
            postLikes.classList.add("w3-opacity");
            postLikes.innerHTML = data[i].likesCount + " Likes";
            postContain.appendChild(postLikes);
            var postName = document.createElement("h4");
            postName.innerHTML = users[data[i].user].name;
            postName.onmouseover = function() {
                this.style.cursor = "pointer";
            }
            postName.onclick = function() {
                showProfile(data[i].user);
            }
            postContain.appendChild(postName);
            postContain.appendChild(document.createElement("br"));
            var hr = document.createElement("hr");
            hr.classList.add("w3-clear");
            postContain.appendChild(hr);
            if(data[i].src != null) {
                var img = document.createElement("img");
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
        })(i);
        scan();
    });
}
function likePost(num) {
    firebase.database().ref('Social/Posts/' + num).once('value').then(function(snapshot) {
        var data = snapshot.val();
        for(var i = 0; i < Object.keys(data.likes).length - 1; i++) {
            if(data.likes[i] == firebase.auth().currentUser.uid) {
                alert("You have already liked this post");
            } else if(i == Object.keys(data.likes).length - 2) {
                firebase.database().ref('Social/Posts/' + num).update({
                    [Object.keys(data.likes).length - 1]: firebase.auth().currentUser.uid
                });
                firebase.database().ref('Social/Posts/' + num).update({
                    likesCount: data.likesCount += 1
                });
            }
        }
    });
}
function post() {
    firebase.database().ref().once('value').then(function(snapshot) {
        var data = snapshot.val();
        for(var i = 0; i < 16; i++) {
            if(data.Social.Posts[i + 1].src == null) {
                firebase.database().ref('Social/Posts/' + i).set({
                    user: data.Social.Posts[i + 1].user,
                    likesCount: data.Social.Posts[i + 1].likesCount,
                    text: data.Social.Posts[i + 1].text,
                    likes: data.Social.Posts[i + 1].likes
                });
                console.log(data.Social.Posts[i + 1].likes)
            } else {
                firebase.database.ref('Social/Posts/' + i).update({
                    user: data.Social.Posts[i + 1].user,
                    likesCount: data.Social.Posts[i + 1].likesCount,
                    text: data.Social.Posts[i + 1].text,
                    likes: data.Social.Posts[i + 1].likes,
                    src: data.Social.Posts[i + 1].src
                });
            }
        }
        if(document.getElementById("file").files.length == 0) {
            firebase.database().ref('Social/Posts/16').update({
                user: firebase.auth().currentUser.uid,
                likesCount: 0,
                text: document.getElementById('text').innerHTML
            });
            firebase.database().ref('Social/Posts/16/likes').update({
                placeholder: true
            });
            document.getElementById('text').innerHTML = "";
        } else {
            firebase.database().ref('Social/Posts/16').update({
                user: firebase.auth().currentUser.uid,
                likesCount: 0,
                text: document.getElementById('text').innerHTML,
                src: fileName
            });
            firebase.database().ref('Social/Posts/16/likes').update({
                placeholder: true
            });
            document.getElementById('text').innerHTML = "";
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
                document.getElementById('signIn').style.display = "none";
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
            fillPics();
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
    location.reload();
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
        var assignments = document.createTextNode(" " + data.tester.completed + " Assignments Completed");
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
function openPics() {
    document.getElementById('myModal').style.display = "block";
    document.getElementById('signIn').style.display = "none";
    document.getElementById('profilePic').style.display = "block";
}
function showProfile(uid) {
    firebase.database().ref().once('value').then(function(snapshot) {
        var data = snapshot.val();
        document.getElementById('profilePix').style.display = "none";
        document.getElementById('clipboard').style.display = "block";
        if(data.Users[uid].admin == true) {
            document.getElementById('clipboard').appendChild(document.createTextNode(' Admin'));
        } else {
            document.getElementById('clipboard').appendChild(document.createTextNode(' Tester'));
        }
        document.getElementById('assign').style.display = "none";
        var pHolder = document.createElement("p");
        pHolder.id = "pHolder";
        var innerI = document.createElement("i");
        innerI.classList.add("fa");
        innerI.classList.add("fa-check-circle");
        innerI.classList.add("fa-fw");
        innerI.classList.add("w3-margin-right");
        innerI.classList.add("w3-text-theme");
        pHolder.appendChild(innerI);
        var assignText = document.createTextNode(" " + data.Users[uid].tester.completed + " Assignments Completed");
        pHolder.appendChild(assignText);
        document.getElementById('profileContainer').appendChild(pHolder);
        document.getElementById('proName').innerHTML = data.Users[uid].name;
        document.getElementById('myAccount').src = "Icons/" + data.Users[uid].prosrc + ".png";
        document.getElementById('balance').innerHTML = data.Users[uid].tester.currentMoney;
    });
}
function fillMyAccount() {
    firebase.database().ref().once('value').then(function(snapshot) {
        var uid = firebase.auth().currentUser.uid;
        var data = snapshot.val();
        document.getElementById('profilePix').style.display = "block";
        document.getElementById('clipboard').style.display = "none";
        document.getElementById('assign').style.display = "block";
        document.getElementById('profileContainer').removeChild(document.getElementById('pHolder'));
        document.getElementById('proName').innerHTML = "My Profile";
        document.getElementById('myAccount').src = "Icons/" + data.Users[uid].prosrc + ".png";
        document.getElementById('balance').innerHTML = data.Users[uid].tester.currentMoney;
    });
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
    console.log("start")
    loadPosts();
}