
const hexInput = document.getElementById("hex-code-input");
const inputColor = document.getElementById("input-box");
const outputColor = document.getElementById("output-box");
const outputColorLabel = document.getElementById("output-box-label")
const slider = document.getElementById("hex-alteration-slider");
const sliderPercentage = document.getElementById("hex-alteration-slider-percentage");
const toggleLighten = document.getElementById("toggle-lighten");
const toggleDarken = document.getElementById("toggle-darken");
const toggleButton = document.getElementById("toggle-button");

// Validate hex input - To be updated to control the characters are in between 0-9 and a-f
const isValidHex = (hex) => {
    if(!hex) return false;
    
    const strippedHex = hex.replace("#", "");
    return strippedHex.length === 3 || strippedHex.length === 6;
}

// Change color of input color box background is hex is valid 
hexInput.addEventListener("keyup", () => {
    const hex = hexInput.value;
    if(!isValidHex(hex)) return;

    const strippedHex = hex.replace("#", "");

    inputColor.style.backgroundColor = "#" + strippedHex;
})

// Convert hex value to RGB value
const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null;

    let strippedHex = hex.replace("#", "");

    if(strippedHex.length ===3) {
        strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2];
    }
    
    const r = parseInt(strippedHex.substring(0,2), 16);
    const g = parseInt(strippedHex.substring(2,4), 16);
    const b = parseInt(strippedHex.substring(4,6), 16);

    return {r,g,b}
}

// Convert RGB value to hex value
function convertRGBToHex(r,g,b) {
    // Validate input
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        throw new Error('Invalid RGB values. Each value should be between 0 and 255');
    }

    // Convert each component to two-digit hexadecimal string
    const red = r.toString(16).padStart(2, '0');
    const green = g.toString(16).padStart(2, '0');
    const blue = b.toString(16).padStart(2, '0');

    // Concatenate the components and return the result
    return `#${red}${green}${blue}`;
}

// Alter hex value based on percentage

const alterColor = (hex, percentage) => {
    const {r,g,b} = convertHexToRGB(hex);
    const amount = Math.floor((percentage/100) * 255);
    const newR = controlWithin0To255(r,amount);
    const newG = controlWithin0To255(g,amount);
    const newB = controlWithin0To255(b,amount);
    return convertRGBToHex(newR,newG,newB);
}

// Control altered RGB value within range

const controlWithin0To255 = (hex, amount) => {
    // const newHex = hex + amount; 
    // if(newHex > 255) return 255;
    // if(newHex < 0) return 0;
    // return newHex;
    return Math.min(255, Math.max(0, hex + amount));
}

// Displays slider value in percentage and update output color box background
slider.addEventListener("input", () => {
    if(!isValidHex(hexInput.value)) return;

    sliderPercentage.textContent = `${slider.value}%`;

    // Calcute whether additive or negative addition based on toggle select
    const valueAddition = toggleButton.classList.contains("toggled") ? -slider.value : slider.value;

    const alteredHex = alterColor(hexInput.value, valueAddition);

    outputColor.style.backgroundColor = alteredHex;
    outputColorLabel.textContent = `Altered Text: ${alteredHex}`;
})

//Toggle button
toggleButton.addEventListener("click", () => {
    if (toggleLighten.classList.contains("toggle-label-deselected")) {
        toggleLighten.classList.remove("toggle-label-deselected");
        toggleDarken.classList.add("toggle-label-deselected");
        toggleButton.classList.remove("toggled");
    }
    else {
        toggleLighten.classList.add("toggle-label-deselected");
        toggleDarken.classList.remove("toggle-label-deselected");
        toggleButton.classList.add("toggled");
    }
})