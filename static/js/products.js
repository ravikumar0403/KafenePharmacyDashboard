const URL = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products"

var productData = []
if(localStorage.getItem("isLoggedIn")){
    $.get(URL, data => {
        productData = data;
        generateTableRow(productData)
    });
}else{
    alert("Please Login to access this page")
    window.location.replace(window.location.origin + "/index.html")
}

function generateTableRow(products){
    $("table tbody").html("")
    $(".filter-options p").html(`Count: ${products.length}`)
    for(var i=0;i<products.length;i++){
        $("table tbody").append(`
        <tr class="tableRow">
            <td class="tableData greyText">${products[i].id}</td>
            <td class="tableData">${products[i].medicineName}</td>
            <td class="tableData greyText">${products[i].medicineBrand}</td>
            <td class="tableData">${getFormattedDate(products[i].expiryDate)}</td>
            <td class="tableData greyText">$${products[i].unitPrice}</td>
            <td class="tableData greyText">${products[i].stock}</td>
        </tr>
    `)
    }
}

function getFormattedDate(dateStr){
    date = dateStr.split("-")
    return date[0] + " "+date[1]+", "+date[2]
}

$('.filter-checkbox').change(() => {
    let expiredCheck = $("#expired").prop('checked')
    let stockCheck = $("#stock").prop('checked')

    var filteredList = productData.filter((value, key) => {
        if (!expiredCheck && expiry(value.expiryDate)) return false
        if (!stockCheck && value.stock < 100) return false
        return true;
    })
    generateTableRow(filteredList)
})

function expiry(dateStr){
    var monthsObj = {
        "Jan" : 1,
        "Feb" : 2,
        "Mar" : 3,
        "Apr" : 4,
        "May" : 5,
        "Jun" : 6,
        "Jul" : 7,
        "Aug" : 8,
        "Sep" : 9,
        "Oct" : 10,
        "Nov" : 11,
        "Dec" : 12
    }
    let [day, month, year] = dateStr.split("-")
    var expiryDate = new Date(year, monthsObj[month], day);
    var today = new Date();
    return(expiryDate.getTime() < today.getTime());
}