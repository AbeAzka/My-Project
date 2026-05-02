let api = `https://v6.exchangerate-api.com/v6/a4be16428fb66dc35c0cf0b8/latest/USD`;
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("exchangeRate");

currencies = ["USD", "EUR", "GBP", "JPY", "AUD",  "IDR", "SGD", "HKD", "CAD", "CHF", "CNY", "SEK", "NZD", "NOK", "KRW", "TRY", "RUB", "INR", "BRL", "ZAR", "MXN", "DKK", "PLN", "TWD", "THB", "MYR", "CZK", "HUF", "ILS", "CLP", "PHP", "AED", "COP", "SAR", "RON"];

currencies.forEach(currency => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromCurrency.add(option);
});

currencies.forEach(currency => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toCurrency.add(option);
});

fromCurrency.value = "USD";
toCurrency.value = "IDR";

let convertCurrency = () => {
    const amount = document.getElementById("amount").value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (amount.length !=0 ){
        fetch(api)
        .then(response => response.json())
        .then(data => {
            let fromExchangeRate = data.conversion_rates[from];
            let toExchangeRate = data.conversion_rates[to];
            let convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
            result.textContent = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
        }).catch(error => {
            console.error("Error fetching exchange rates:", error);
            //alert("Failed to fetch exchange rates. Please try again later.");
        });
    }else{
        //alert("Please enter a valid amount.");
    }
};

document.querySelector("#calcBtn").addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);