document.getElementById('calculateBtn').addEventListener('click', calculateFuelCost);

function calculateFuelCost() {
    const distance = parseFloat(document.getElementById('distance').value);
    const mileage = parseFloat(document.getElementById('mileage').value);
    const fuelPrice = parseFloat(document.getElementById('fuelPrice').value);

    const distanceUnit = document.getElementById('distanceUnit').value;
    const mileageUnit = document.getElementById('mileageUnit').value;
    const currencyUnit = document.getElementById('currencyUnit').value;

    const resultElement = document.getElementById('result');

    if (isNaN(distance) || isNaN(mileage) || isNaN(fuelPrice) || distance < 0 || mileage <= 0 || fuelPrice < 0) {
        resultElement.textContent = 'Please enter valid positive numbers for all fields.';
        resultElement.style.color = '#dc3545'; // Red color for error
        return;
    }

    let litersNeeded;

    // Convert all inputs to a common base (e.g., km and liters) for calculation
    let convertedDistance = distance;
    let convertedMileage = mileage;

    if (distanceUnit === 'miles') {
        convertedDistance = distance * 1.60934; // Convert miles to km
    }

    if (mileageUnit === 'mpg') {
        // Convert miles/gallon to km/liter
        // 1 mile = 1.60934 km
        // 1 gallon = 3.78541 liters
        convertedMileage = (mileage * 1.60934) / 3.78541; // km/liter
    }

    // Calculation: total_liters = distance_km / mileage_km_per_liter
    litersNeeded = convertedDistance / convertedMileage;

    let totalCost;
    let currencySymbol;

    if (currencyUnit === 'INR') {
        totalCost = litersNeeded * fuelPrice;
        currencySymbol = '₹';
    } else if (currencyUnit === 'USD') {
        // If fuel price is in USD per gallon, and we calculated litersNeeded,
        // we need to convert litersNeeded back to gallons for the USD price.
        const gallonsNeeded = litersNeeded / 3.78541;
        totalCost = gallonsNeeded * fuelPrice;
        currencySymbol = '$';
    }

    resultElement.textContent = `${currencySymbol} ${totalCost.toFixed(2)}`;
    resultElement.style.color = '#28a745'; // Green color for success
}

document.getElementById('calculateBtn').addEventListener('click', calculateFuelCost);

function calculateFuelCost() {
    const distance = parseFloat(document.getElementById('distance').value);
    const mileage = parseFloat(document.getElementById('mileage').value);
    const fuelPrice = parseFloat(document.getElementById('fuelPrice').value);

    const distanceUnit = document.getElementById('distanceUnit').value;
    const mileageUnit = document.getElementById('mileageUnit').value;
    const currencyUnit = document.getElementById('currencyUnit').value;

    const fuelQuantityElement = document.getElementById('fuelQuantity');
    const totalCostElement = document.getElementById('totalCost');

    if (isNaN(distance) || isNaN(mileage) || isNaN(fuelPrice) || distance < 0 || mileage <= 0 || fuelPrice < 0) {
        fuelQuantityElement.textContent = 'Invalid Input';
        totalCostElement.textContent = 'Invalid Input';
        fuelQuantityElement.style.color = '#dc3545'; // Red color for error
        totalCostElement.style.color = '#dc3545';
        return;
    }

    let litersNeeded;

    // Convert all inputs to a common base (e.g., km and km/liter) for calculation
    let convertedDistance = distance;
    let convertedMileage = mileage; // This will be km/liter

    if (distanceUnit === 'miles') {
        convertedDistance = distance * 1.60934; // Convert miles to km
    }

    if (mileageUnit === 'mpg') {
        // Convert miles/gallon to km/liter
        // 1 mile = 1.60934 km
        // 1 gallon = 3.78541 liters
        convertedMileage = (mileage * 1.60934) / 3.78541; // km/liter
    }

    // Calculate total liters needed based on km and km/liter
    litersNeeded = convertedDistance / convertedMileage;

    let displayQuantity;
    let quantityUnit;

    // Determine the display unit for fuel quantity based on original mileage unit
    if (mileageUnit === 'mpg') {
        displayQuantity = litersNeeded / 3.78541; // Convert liters back to gallons for display
        quantityUnit = 'Gallons';
    } else { // km/l
        displayQuantity = litersNeeded; // Already in liters
        quantityUnit = 'Liters';
    }

    let totalCost;
    let currencySymbol;

    if (currencyUnit === 'INR') {
        totalCost = litersNeeded * fuelPrice; // Fuel price in INR per liter
        currencySymbol = '₹';
    } else if (currencyUnit === 'USD') {
        // If fuel price is in USD per gallon, and we calculated litersNeeded,
        // we need to convert litersNeeded to gallons for the USD price calculation.
        const gallonsForCostCalculation = litersNeeded / 3.78541;
        totalCost = gallonsForCostCalculation * fuelPrice; // Fuel price in USD per gallon
        currencySymbol = '$';
    }

    fuelQuantityElement.textContent = `${displayQuantity.toFixed(2)} ${quantityUnit}`;
    totalCostElement.textContent = `${currencySymbol} ${totalCost.toFixed(2)}`;

    fuelQuantityElement.style.color = '#28a745'; // Green color
    totalCostElement.style.color = '#28a745';
}