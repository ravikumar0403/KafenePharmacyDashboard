const URL = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders"

var orderData = []
if(localStorage.getItem("isLoggedIn")){
    $.get(URL, data => {
        orderData = data;
        generateTableRow(orderData)
    });
}else{
    alert("Please Login to access this page")
    window.location.href = "./index.html";
}

function generateTableRow(orders){
    $("table tbody").html("")
    $(".filter-options p").html(`Count: ${orders.length}`)
    for(var i=0;i<orders.length;i++){
        $("table tbody").append(`
        <tr class="tableRow">
            <td class="tableData greyText">${orders[i].id}</td>
            <td class="tableData">${orders[i].customerName}</td>
            <td class="tableData">${getFormattedDate(orders[i].orderDate)} </br><span class = "greyText">${orders[i].orderTime}</span></td>
            <td class="tableData greyText">$${orders[i].amount}</td>
            <td class="tableData">${orders[i].orderStatus}</td>
        </tr>
    `)
    }
}

function getFormattedDate(dateStr){
    date = dateStr.split("-")
    return date[0] + " "+date[1]+", "+date[2]    
}

$('.filter-checkbox').change(() => {
    let newValue = $("#new").prop('checked')
    let packValue = $("#packed").prop('checked')
    let transitValue = $("#intransit").prop('checked')
    let deliverValue = $("#delivered").prop('checked')

    var filteredList = orderData.filter((value, key) => {
        if (newValue && value.orderStatus === 'New') return true
        if (packValue && value.orderStatus === 'Packed') return true
        if (transitValue && value.orderStatus === 'InTransit') return true
        if (deliverValue && value.orderStatus === 'Delivered') return true
        return false
    })
    generateTableRow(filteredList)
})
