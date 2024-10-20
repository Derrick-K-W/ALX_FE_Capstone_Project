// API key from ExchangeRate-API
const API_KEY = 'f17643aba338e8d802ed27f7'; 
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;  

// Currency list with their respective flags (using Unicode emoji)
const currencyFlags = {
  'USD': '🇺🇸', 'EUR': '🇪🇺', 'GBP': '🇬🇧', 'JPY': '🇯🇵', 'AUD': '🇦🇺',
  'CAD': '🇨🇦', 'CHF': '🇨🇭', 'CNY': '🇨🇳', 'SEK': '🇸🇪', 'NZD': '🇳🇿'
};

// Get DOM elements
const amountInput = document.getElementById('amount');
const convertedInput = document.getElementById('converted');
const amountCurrency = document.getElementById('amountCurrency');
const convertedCurrency = document.getElementById('convertedCurrency');
const swapButton = document.querySelector('.fa-right-left'); 
const chevronAmount = document.querySelector('.chevron-amount'); 
const chevronConverted = document.querySelector('.chevron-converted');

// Store exchange rates
let exchangeRates = {};

// Fetch exchange rates when the page loads
async function fetchExchangeRates() {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
    
    const data = await response.json();
    exchangeRates = data.conversion_rates;
    
    
    populateCurrencyDropdowns();
  } catch (error) {
    alert(`Error fetching exchange rates: ${error.message}`);
  }
}


function populateCurrencyDropdowns() {
  const currencies = Object.keys(exchangeRates);
  
  currencies.forEach(currency => {
    
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.innerHTML = `${currencyFlags[currency] || ''} ${currency}`;
    
   
    const option2 = document.createElement('option');
    option2.value = currency;
    option2.innerHTML = `${currencyFlags[currency] || ''} ${currency}`;
    
    amountCurrency.appendChild(option1);
    convertedCurrency.appendChild(option2);
  });
  
  // Default selections
  amountCurrency.value = 'USD';
  convertedCurrency.value = 'EUR';
}

// Convert currency when input or selection changes
function convertCurrency() {
  const amountValue = parseFloat(amountInput.value);
  const fromCurrency = amountCurrency.value;
  const toCurrency = convertedCurrency.value;
  
  if (!amountValue || !fromCurrency || !toCurrency || !exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
    return;
  }
  
  const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
  const convertedValue = (amountValue * rate).toFixed(2);
  
  convertedInput.value = convertedValue;
}

// Swap currencies when the arrow button is clicked
function swapCurrencies() {
  const tempCurrency = amountCurrency.value;
  amountCurrency.value = convertedCurrency.value;
  convertedCurrency.value = tempCurrency;
  
  convertCurrency(); 
}

// Event listeners for input and currency selection changes
amountInput.addEventListener('input', convertCurrency);
amountCurrency.addEventListener('change', convertCurrency);
convertedCurrency.addEventListener('change', convertCurrency);

// Event listener to the swap button (left-right arrow icon)
swapButton.addEventListener('click', swapCurrencies);

// Chevron icons functionality (trigger dropdown focus)
chevronAmount.addEventListener('click', function() {
  amountCurrency.focus(); 
});

chevronConverted.addEventListener('click', function() {
  convertedCurrency.focus(); 
});

// Fetch exchange rates on page load
fetchExchangeRates();



// Get the globe icon and dropdown elements
const globeIcon = document.querySelector('.globe-icon');
const languageDropdown = document.getElementById('languageDropdown');

// Toggle the visibility of the dropdown when the globe icon is clicked
globeIcon.addEventListener('click', function() {
    languageDropdown.classList.toggle('hidden');
});

// Handle language selection
languageDropdown.addEventListener('click', function(e) {
    if (e.target.tagName === 'li') {
        const selectedLanguage = e.target.getAttribute('data-lang');
        console.log(`Selected language: ${selectedLanguage}`);
        
        languageDropdown.classList.add('hidden');
    }
});

// Close the dropdown if clicked outside
window.addEventListener('click', function(e) {
    if (!globeIcon.contains(e.target) && !languageDropdown.contains(e.target)) {
        languageDropdown.classList.add('hidden');
    }
});


 // JavaScript to handle the dropdown toggle
 document.getElementById('helpBtn').addEventListener('click', function() {
  var dropdown = document.getElementById('helpDropdown');
  dropdown.classList.toggle('show');
});

// Close the dropdown if clicked outside
window.onclick = function(event) {
  if (!event.target.matches('#helpBtn') && !event.target.matches('.fa-chevron-down')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
};