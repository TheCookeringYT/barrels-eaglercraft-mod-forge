// Register the Barrel block
ModAPI.addEventListener("update", () => {
    // Check if the custom block is being placed or interacted with
    // Note: Advanced block registration often requires modifying the internal block registry
});

// Example of displaying a message when a 'Barrel' is interacted with
ModAPI.addEventListener("useblock", (event) => {
    if (event.blockName === "Barrel") {
        ModAPI.displayToChat({msg: "War Machine said to Thor, cheese whiz?"});
        // Logic for opening a GUI/Container would go here
    }
});

// Basic 'Hello World' mod style used by EaglerForge
ModAPI.addEventListener("load", () => {
    console.log("Barrel Mod Loaded!");
});
