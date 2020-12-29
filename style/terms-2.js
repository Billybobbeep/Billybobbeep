function loginCheck(event) {
    let usr = this.elements.userName.value;
    let psw = this.elements.passWord.value;
    let username = "admin";
    let password = "admin";
    if ((usr == username) && (psw == password)) {
        alert("True Info - submitting form");
    } else {
        location = "http://www.google.com";
        event.preventDefault();
    }
}

document.getElementById('loginForm').addEventListener('submit', loginCheck);