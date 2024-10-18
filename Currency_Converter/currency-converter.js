// API key from ExchangeRate-API
const API_KEY = 'f17643aba338e8d802ed27f7';  // Your API key
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;  // Corrected API URL with the API_KEY

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
const swapButton = document.querySelector('.fa-right-left'); // Swap icon
const chevronAmount = document.querySelector('.chevron-amount'); // Chevron for amount currency
const chevronConverted = document.querySelector('.chevron-converted'); // Chevron for converted currency

// Store exchange rates
let exchangeRates = {};

// Fetch exchange rates when the page loads
async function fetchExchangeRates() {
  try {
    const response = await fetch(API_URL);  // Use API_URL here
    if (!response.ok) throw new Error('Failed to fetch exchange rates');
    
    const data = await response.json();
    exchangeRates = data.conversion_rates;
    
    // Populate currency dropdowns
    populateCurrencyDropdowns();
  } catch (error) {
    alert(`Error fetching exchange rates: ${error.message}`);
  }
}

// Populate dropdown lists with currency options and flags
function populateCurrencyDropdowns() {
  const currencies = Object.keys(exchangeRates);
  
  currencies.forEach(currency => {
    // Create options for "Amount" currency dropdown
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.innerHTML = `${currencyFlags[currency] || ''} ${currency}`;
    
    // Create options for "Converted" currency dropdown
    const option2 = document.createElement('option');
    option2.value = currency;
    option2.innerHTML = `${currencyFlags[currency] || ''} ${currency}`;
    
    amountCurrency.appendChild(option1);
    convertedCurrency.appendChild(option2);
  });
  
  // Set default selections
  amountCurrency.value = 'USD';
  convertedCurrency.value = 'EUR';
}

// Convert currency when input or selection changes
function convertCurrency() {
  const amountValue = parseFloat(amountInput.value);
  const fromCurrency = amountCurrency.value;
  const toCurrency = convertedCurrency.value;
  
  if (!amountValue || !fromCurrency || !toCurrency || !exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
    return; // Skip calculation if input is invalid
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
  
  convertCurrency(); // Recalculate after the swap
}

// Add event listeners for input and currency selection changes
amountInput.addEventListener('input', convertCurrency);
amountCurrency.addEventListener('change', convertCurrency);
convertedCurrency.addEventListener('change', convertCurrency);

// Add event listener to the swap button (left-right arrow icon)
swapButton.addEventListener('click', swapCurrencies);

// Make chevron icons functional (trigger dropdown click)
chevronAmount.addEventListener('click', function() {
  amountCurrency.dispatchEvent(new MouseEvent('mousedown'));  // Trigger dropdown on chevron click
});

chevronConverted.addEventListener('click', function() {
  convertedCurrency.dispatchEvent(new MouseEvent('mousedown'));  // Trigger dropdown on chevron click
});

// Fetch exchange rates on page load
fetchExchangeRates();


// Get the globe icon and dropdown elements
const globeIcon = document.querySelector('.globe-icon');
const languageDropdown = document.getElementById('languageDropdown');

// Toggle the visibility of the dropdown when the globe icon is clicked
globeIcon.addEventListener('click', function() {
    languageDropdown.classList.toggle('hidden'); // Toggle the "hidden" class
});

// Handle language selection
languageDropdown.addEventListener('click', function(e) {
    if (e.target.tagName === 'li') {
        const selectedLanguage = e.target.getAttribute('data-lang');
        console.log(`Selected language: ${selectedLanguage}`);
        // Add functionality here to switch the language (if needed)
        languageDropdown.classList.add('hidden'); // Hide the dropdown after selection
    }
});

// Close the dropdown if clicked outside
window.addEventListener('click', function(e) {
    if (!globeIcon.contains(e.target) && !languageDropdown.contains(e.target)) {
        languageDropdown.classList.add('hidden'); // Close the dropdown if clicked outside
    }
});
