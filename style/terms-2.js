function loginCheck(event) {
    var usr = this.elements.userName.value;
    var psw = this.elements.passWord.value;
    var username = "admin";
    var password = "admin";
    if ((usr == username) && (psw == password)) {
        alert("True Info - submitting form");
    } else {
        location = "http://www.google.com";
        event.preventDefault();
    }
}

document.getElementById('loginForm').addEventListener('submit', loginCheck);