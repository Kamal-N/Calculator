function addAppliance() {
    const applianceRow = document.createElement('div');
    applianceRow.classList.add('form-group', 'appliance-row');

    const applianceSelect = document.createElement('select');
    applianceSelect.classList.add('appliance-select');
    applianceSelect.innerHTML = `
        <option value="" disabled selected>Select Appliance</option>
        <option value="fan">Ceiling Fan (75W)</option>
        <option value="small-tvs">Small TV (50W)</option>
        <option value="medium-tvs">Medium TV (100W)</option>
        <option value="large-tvs">Large TV (150W)</option>
        <option value="fridge">Medium Refrigerator (200W)</option>
        <option value="laptops">Laptop (50W)</option>
        <option value="desktops">Desktop (150W)</option>
        <option value="ac">Small AC Unit (500W)</option>
        <option value="heaters">Small Heater (750W)</option>
        <option value="microwave">Microwave (1000W)</option>
        <option value="washing-machine">Washing Machine (500W)</option>
        <option value="dishwasher">Dishwasher (1200W)</option>
        <option value="oven">Electric Oven (2000W)</option>
        <option value="toaster">Toaster (800W)</option>
        <option value="vacuum">Vacuum Cleaner (600W)</option>
    `;

    const applianceCount = document.createElement('input');
    applianceCount.type = 'number';
    applianceCount.classList.add('appliance-quantity');
    applianceCount.value = '1';

    const applianceUsage = document.createElement('input');
    applianceUsage.type = 'number';
    applianceUsage.classList.add('appliance-hourly-usage');
    applianceUsage.value = '5';

    const applianceNameDiv = document.createElement('div');
    applianceNameDiv.classList.add('appliance-name');
    applianceNameDiv.appendChild(applianceSelect);

    const applianceCountDiv = document.createElement('div');
    applianceCountDiv.classList.add('appliance-count');
    applianceCountDiv.appendChild(applianceCount);

    const applianceUsageDiv = document.createElement('div');
    applianceUsageDiv.classList.add('appliance-usage');
    applianceUsageDiv.appendChild(applianceUsage);

    applianceRow.appendChild(applianceNameDiv);
    applianceRow.appendChild(applianceCountDiv);
    applianceRow.appendChild(applianceUsageDiv);

    const additionalAppliances = document.getElementById('additional-appliances');
    additionalAppliances.appendChild(applianceRow);
}

function calculateSystem() {
    const appliances = document.querySelectorAll('.appliance-row');
    let totalPower = 0;
    let dailyEnergy = 0;

    appliances.forEach(appliance => {
        const select = appliance.querySelector('.appliance-select');
        const quantity = appliance.querySelector('.appliance-quantity').value;
        const hours = appliance.querySelector('.appliance-hourly-usage').value;

        if (!select.value) {
            return; // Skip if no appliance is selected
        }

        const powerRatings = {
            'fan': 75,
            'small-tvs': 50,
            'medium-tvs': 100,
            'large-tvs': 150,
            'fridge': 200,
            'laptops': 50,
            'desktops': 150,
            'ac': 500,
            'heaters': 750,
            'microwave': 1000,
            'washing-machine': 500,
            'dishwasher': 1200,
            'oven': 2000,
            'toaster': 800,
            'vacuum': 600
        };

        const power = powerRatings[select.value] * quantity;
        const energy = power * hours;

        totalPower += power;
        dailyEnergy += energy;
    });

    const sunHours = document.getElementById('sun-hours').value;
    const batteryType = document.getElementById('battery-type').value;

    const solarPanels = Math.ceil(dailyEnergy / sunHours / 300); // assuming each panel produces 300W
    let batteryCapacity;
    switch (batteryType) {
        case '150ah-12v':
            batteryCapacity = 150 * 12;
            break;
        case '150ah-24v':
            batteryCapacity = 150 * 24;
            break;
        case '200ah-12v':
            batteryCapacity = 200 * 12;
            break;
        case '200ah-24v':
            batteryCapacity = 200 * 24;
            break;
    }
    const batteries = Math.ceil(dailyEnergy / batteryCapacity);

    const inverter = totalPower * 1.25; // 25% buffer

    document.getElementById('total-power').innerText = `Total Power Consumption: ${totalPower} W`;
    document.getElementById('daily-energy').innerText = `Total Daily Energy Consumption: ${dailyEnergy} Wh`;
    document.getElementById('solar-panels').innerText = `Required Solar Panels: ${solarPanels}`;
    document.getElementById('battery').innerText = `Required Batteries: ${batteries}`;
    document.getElementById('inverter').innerText = `Recommended Inverter Capacity: ${inverter} W`;
}
