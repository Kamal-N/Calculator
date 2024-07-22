const applianceWattages = {
    'bulb': 10,
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

function addAppliance() {
    const newRow = document.createElement('div');
    newRow.className = 'form-group appliance-row';
    newRow.innerHTML = `
        <div class="appliance-name">
            <select class="appliance-select">
                <option value="" disabled selected>Select Appliance</option>
                <option value="bulb">LED Bulb (10W)</option>
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
            </select>
        </div>
        <div class="appliance-count">
            <input type="number" class="appliance-quantity" value="1">
        </div>
        <div class="appliance-usage">
            <input type="number" class="appliance-hourly-usage" value="5">
        </div>
    `;
    const additionalAppliances = document.getElementById('additional-appliances');
    additionalAppliances.appendChild(newRow);
}

function calculateSystem() {
    const appliances = document.getElementsByClassName('appliance-row');
    let totalPower = 0;
    let totalDailyEnergy = 0;

    for (let appliance of appliances) {
        const applianceType = appliance.querySelector('.appliance-select').value;
        if (!applianceType) continue; // Skip if no appliance selected

        const applianceQuantity = appliance.querySelector('.appliance-quantity').value;
        const applianceUsage = appliance.querySelector('.appliance-hourly-usage').value;

        const appliancePower = applianceWattages[applianceType];
        totalPower += appliancePower * applianceQuantity;
        totalDailyEnergy += appliancePower * applianceQuantity * applianceUsage;
    }

    const peakSunHours = document.getElementById('sun-hours').value;
    const panelSize = document.getElementById('panel-size').value;
    const totalEnergyPerDay = totalDailyEnergy;
    const requiredPanels = Math.ceil(totalEnergyPerDay / (panelSize * peakSunHours));

    const batteryType = document.getElementById('battery-type').value;
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

    const requiredBatteries = Math.ceil(totalDailyEnergy / batteryCapacity);
    const recommendedInverter = totalPower * 1.25;

    document.getElementById('total-power').innerText = `Total Power Consumption: ${totalPower} W`;
    document.getElementById('daily-energy').innerText = `Total Daily Energy Consumption: ${totalDailyEnergy} Wh`;
    document.getElementById('solar-panels').innerText = `Required Solar Panels: ${requiredPanels}`;
    document.getElementById('battery').innerText = `Required Batteries: ${requiredBatteries}`;
    document.getElementById('inverter').innerText = `Recommended Inverter Capacity: ${recommendedInverter} W`;
}
