function generatePassword() {
    const uniqueNames = ["Zyrex,", "Vortex", "Nebula", "Quantum", "Eclipse", "Phoenix", "Nova", "Cosmic", "Stellar", "Lunar", "Solar", "Galactic", "Meteor", "Comet", "Astro", "Orbit", "Celestial", "Supernova", "Gravity", "Cosmos"];
    const randomName = uniqueNames[Math.floor(Math.random() * uniqueNames.length)];
    document.getElementById("password").value = randomName;
    
    const lengthinput = document.getElementById("length");
    const length = parseInt(lengthinput.value);

    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let extraChars = "";
    for (let i=0;i<length;i++) {
        const randomindex = Math.floor(Math.random() * charset.length);
        extraChars = extraChars + charset[randomindex];
    
    }

    const final_Password = randomName + "-" + extraChars;
    const pass_Field = document.getElementById("password");
    pass_Field.value = final_Password;
}

function copyPassword() {
    const passwordField = document.getElementById("password");
    passwordField.select();
    passwordField.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    alert("Password copied to clipboard: " + passwordField.value);
}