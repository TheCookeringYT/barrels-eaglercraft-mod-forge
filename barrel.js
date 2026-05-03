(function BarrelMod() {
    // 1. Initial Load Event
    ModAPI.addEventListener("load", () => {
        ModAPI.displayToChat({msg: "§6Barrel Mod Loaded!"});
    });

    // 2. Block Registration (Conceptual - actual method depends on your version of EaglerForge)
    // Note: Most EaglerForge versions require patching the block registry directly
    const barrelBlockID = "Barrel";
    
    // 3. Right-Click Interaction Listener
    ModAPI.addEventListener("useblock", (event) => {
        // Check if the interacted block is your custom barrel
        if (event.blockName === barrelBlockID) {
            // Cancel standard block interaction
            event.preventDefault();
            
            // Logic to open a storage GUI (e.g., Chest GUI)
            ModAPI.displayToChat({msg: "Opening Barrel..."});
            
            // Example command execution to simulate an inventory if logic is not fully exposed
            ModAPI.player.sendChatMessage("/openbarrel"); 
        }
    });

    // 4. Custom Hook for Rendering (Optional)
    ModAPI.addEventListener("drawhud", () => {
        // Example: Display 'Barrel Mod Active' on screen
        // ModAPI.drawStringWithShadow({msg: "Barrel Mod Active", x: 10, y: 10, color: 0xFFAA00});
    });

})();
