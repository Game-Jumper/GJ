function check(form) {
    if(form.userid.value == "tester" && form.pwd.value == "Fzc6Q") {
        window.open('tester.html');
    }
    else {
        alert("Invalid Login Credentials");
    }
}