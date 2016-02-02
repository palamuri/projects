var cartype = "Compact";
var carprice = 29.99;
var surcharge = 10;
var numofdays = 0;
var city = "sanfrancisco";
var discountapplied = 0;

function selectCity(e) {
    var surchargeElement = document.getElementById("surcharge");
    city = e.value;
    if ((e.value === "losangeles") || (e.value === "sanfrancisco")) {
        surchargeElement.innerHTML = "15";
        surcharge = 15;        
    }
    else {
        surchargeElement.innerHTML = "10";
        surcharge = 10;
    }
}

function cartypeselected(e) {
    var midsizecarimage = document.getElementById("midsizecarimage");
    var compactcarimage = document.getElementById("compactcarimage");
    var luxurycarimage = document.getElementById("luxurycarimage");
    var carwash = document.getElementById("carwash");
    midsizecarimage.style.display = "none";
    compactcarimage.style.display = "none";
    luxurycarimage.style.display = "none";
    carwash.style.display = "none";
    if (e.value === "MidSize") {
        midsizecarimage.style.display = "";
        cartype = "MidSize";
        carprice = 39.99;
    } else if (e.value === "Compact") {
        compactcarimage.style.display = "";
        cartype = "Compact";
        carprice = 29.99;
    } else {
        luxurycarimage.style.display = "";
        carwash.style.display = "";
        cartype = "Luxury";
        carprice = 49.99;
    }
}

// Validate data
function onSubmit() {
    var startDate = document.getElementById("startDate").valueAsDate;
    // startDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), ))
    startDate = new Date(startDate.getTime() + startDate.getTimezoneOffset() * 60 * 1000);
    var endDate = document.getElementById("endDate").valueAsDate;
    endDate = new Date(endDate.getTime() + endDate.getTimezoneOffset() * 60 * 1000);
    var quotation = document.getElementById("quotation");
    var currentDate = new Date();
    var currentDateStr = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
    var startDateStr = startDate.getMonth() + "/" + startDate.getDate() + "/" + startDate.getFullYear();
    var errorMessages = [];

    if (startDate)
        if (startDate < currentDate) {
            errorMessages.push("Start Date is in the Past. Please select a valid date after " + currentDateStr);
        }
    if (endDate < currentDate) {
        errorMessages.push("End Date is in the Past. Please select a valid date after " + currentDateStr);
    }

    if (endDate < startDate) {
        errorMessages.push("End Date can not be before Start Date. Please select a valid date after " + startDateStr);
    }


    var errorDiv = document.getElementById("errors");
    var quotation = document.getElementById("quotation");
    quotation.style.display = "";

    var errorMsgStr = "";
    for (var i = 0; i < errorMessages.length; i++) {
        errorMsgStr += errorMessages[i] + "<br>";
    }
    errorDiv.innerHTML = errorMsgStr;

    var successquotation = document.getElementById("successquotation");

    if (errorMessages.length <= 0) {
        var quotationmessage = "<h3>Quotation selected: </h3><br> City: " + city + "<br>";

        quotationmessage += "Sur Charge: " + surcharge + "%<br>";
        quotationmessage += "Car Type: " + cartype + "<br>";
        quotationmessage += "Car Price per day: $" + carprice + "<br>";
        var totalcarprice = numofdays * carprice;
        totalcarprice = totalcarprice + ((totalcarprice * surcharge) / 100);
        quotationmessage += "Total Car Price including surcharge " + numofdays + "days: $" + totalcarprice + "<br>";
        quotationmessage += "Discount Applied " + discountapplied + "%<br>";
        totalcarprice = totalcarprice - ((totalcarprice * discountapplied) / 100);
        quotationmessage += "Final Price after discount $" + totalcarprice + "<br>";

        var collisioninsurance = document.getElementById("collisioninsurance");
        var collisioninsuranceprice = 0;
        if (collisioninsurance.checked) {

            if (cartype === "compact") {
                collisioninsuranceprice += (numofdays * 17);
            } else if (cartype === "midsize") {
                collisioninsuranceprice += (numofdays * 22);
            } else {
                collisioninsuranceprice += (numofdays * 28);
            }
            quotationmessage += "Collision insurance $" + collisioninsuranceprice + "<br>";
        }
        var numprepaid = document.getElementById("numprepaidgiftcard").value;
       
        var totalprepaid = numprepaid * 100;
        quotationmessage += "Prepaid Giftcards 100$ selected " + numprepaid + ": $" + totalprepaid + "<br>";

        var carwash = document.getElementById("dailycarwash");
        if (carwash.checked) {
            quotationmessage += "Carwash Selected: $50 <br>";
        }
        var carwashprice = 0;
        if(carwash.checked) {
            carwashprice = 50;
        }
        quotationmessage += "Total price: " + (totalcarprice + totalprepaid + carwashprice) + "<br>";
        successquotation.innerHTML = quotationmessage;

    } else {
        successquotation.innerHTML = "";
        successquotation.style.display="none";
    }
}

function onLoad() {
    var startDate = document.getElementById("startDate");
    var endDate = document.getElementById("endDate");
    startDate.valueAsDate = new Date();
    endDate.valueAsDate = new Date();
}

function dayschanged(e) {
    numofdays = e.value;
    var discount = document.getElementById("discount");
    if (numofdays >= 15 && numofdays < 30) {
        discount.innerHTML = 10;
        discountapplied = 10;
    } else if (numofdays >= 30) {
        discount.innerHTML = 20;
        discountapplied = 20;
    } else {
        discount.innerHTML = 0;
        discountapplied = 0;

    }

    return false;
}
window.onload = onLoad;