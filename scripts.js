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
    additionalAppliances.insertBefore(applianceRow, additionalAppliances.firstChild);
}
