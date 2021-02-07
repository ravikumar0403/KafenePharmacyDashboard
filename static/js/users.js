const URL = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users"
var userData = []

if(localStorage.getItem("isLoggedIn")){
    $.get(URL, data => {
        userData = data;
        generateTableRow(userData)
    });
}else{
    alert("Please Login to access this page")
    window.location.href = "./index.html";
}

function generateTableRow(users){
    $("table tbody").html("")
    $(".filter-options p").html(`Count: ${users.length}`)
    for(var i=0;i<users.length;i++){
        $("table tbody").append(`
        <tr class="tableRow">
            <td class="tableData greyText">${users[i].id}</td>
            <td class="tableData"><img src="${users[i].profilePic}"</td>
            <td class="tableData">${users[i].fullName}</td>
            <td class="tableData">${getFormattedDate(users[i].dob)}</td>
            <td class="tableData greyText">${users[i].gender}</td>
            <td class="tableData">${users[i].currentCity}, ${users[i].currentCountry}</td>
        </tr>
    `)
    }
}

function getFormattedDate(dateStr){
    date = dateStr.split("-")
    return date[0] + " "+date[1]+", "+date[2]    
}


var form = document.getElementsByClassName("searchForm")[0]
form.addEventListener("submit", function(e){
    e.preventDefault()
    var searchValue = $("#searchInput").val()
    if (searchValue == null || searchValue.length < 2) {
        alert("Please enter at least 2 characters")
    }else{
        var baseUrl = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName="
        var searchUrl = baseUrl + searchValue
        $.get(searchUrl, data => {
            // userData = data;
            if (data.length === 0){
                $("table tbody").html("<p style='text-align:center'>No results matching your search</p>")
            }else{
                generateTableRow(data)
            }
        });
    }

})

$("#reset").click(() => {
    generateTableRow(userData)
})