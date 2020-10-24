if (window.localStorage) {
    if (!localStorage.getItem("userAgreed")) {
        $("#agree").show();
        $("#form").hide();
        $("#already").hide()
    } else {
        $("#agree").hide();
        $("#form").hide();
        $("#already").show()
    }
}

$("#accBtn").on("click", async function(event) {
    console.log('accept')
    event.preventDefault();
    // Make a server call if you want to handle it in server side here
    await $("#agree").addClass('closed');
    await $("#agree").hide();
    document.getElementById('body').style.backgroundColor = 'rgba(0, 0, 0, 0.85)'
    $("#form").show()
});

function loginCheck(event) {
    var discordTag = this.elements.discordTag.value;
    if (discordTag.toString().includes('#')) {
        localStorage.setItem("userAgreed", true);
        return true;
    } else {
        event.preventDefault();
        alert('Please make sure you have entered your username and tag.')
        return false;
    }
}

document.getElementById('agreeForm').addEventListener('submit', loginCheck);