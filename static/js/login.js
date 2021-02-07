var obj = {}

if(localStorage.getItem("isLoggedIn")){
    window.location.replace(window.location.origin + "/orders.html")
}
document.getElementById("loginBtn").addEventListener("click", function (e) {
    e.preventDefault()
    var username = e.target.parentElement.children[1].value
    var password = e.target.parentElement.children[2].value
    const url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login"
    if (username === password) {
        $.ajax({
            type: "POST",
            url: url,
            data: {
                username: username,
                password: password
            },
            success: (success) => {
                localStorage.setItem('isLoggedIn', true)
                alert('Login Successfull')
                window.location.href = 'orders.html'
            }
        });
    } else {
        alert('Incorrect Username and Password... Please try Again...')
    }
});