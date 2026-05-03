// ============================================================
// Eaglercraft 1.12 - Barrel Block Mod
// Adds a craftable Barrel block with 27-slot inventory (like a chest)
// ============================================================

(function() {
  "use strict";

  // ---- Constants ----
  var MOD_ID    = "barrel_mod";
  var MOD_NAME  = "Barrel Mod";
  var MOD_VER   = "1.0.0";

  var BARREL_BLOCK_ID   = 245;   // pick an unused block ID
  var BARREL_ITEM_ID    = 245;
  var BARREL_INV_SIZE   = 27;    // 3 rows × 9 columns, same as a chest
  var BARREL_HARDNESS   = 2.5;
  var BARREL_RESISTANCE = 2.5;
  var BARREL_SOUND      = "wood";

  // ---- Texture pixel data (16×16 barrel top / side / bottom) ----
  var TEX_SIDE = [
    "7B5B3A","7B5B3A","56381E","7B5B3A","7B5B3A","7B5B3A","56381E","7B5B3A",
    "7B5B3A","7B5B3A","56381E","7B5B3A","7B5B3A","7B5B3A","56381E","7B5B3A",
    "8B6B4A","8B6B4A","56381E","8B6B4A","8B6B4A","8B6B4A","56381E","8B6B4A",
    "8B6B4A","8B6B4A","56381E","8B6B4A","8B6B4A","8B6B4A","56381E","8B6B4A",
    "56381E","56381E","56381E","56381E","56381E","56381E","56381E","56381E",
    "56381E","56381E","56381E","56381E","56381E","56381E","56381E","56381E",
    "7B5B3A","7B5B3A","56381E","7B5B3A","7B5B3A","7B5B3A","56381E","7B5B3A",
    "7B5B3A","7B5B3A","56381E","7B5B3A","7B5B3A","7B5B3A","56381E","7B5B3A",
    "8B6B4A","8B6B4A","56381E","8B6B4A","8B6B4A","8B6B4A","56381E","8B6B4A",
    "8B6B4A","8B6B4A","56381E","8B6B4A","8B6B4A","8B6B4A","56381E","8B6B4A",
    "7B5B3A","7B5B3A","56381E","7B5B3A","7B5B3A","7B5B3A","56381E","7B5B3A",
    "7B5B3A","7B5B3A","56381E","7B5B3A","7B5B3A","7B5B3A","56381E","7B5B3A",
    "56381E","56381E","56381E","56381E","56381E","56381E","56381E","56381E",
    "56381E","56381E","56381E","56381E","56381E","56381E","56381E","56381E",
    "8B6B4A","8B6B4A","56381E","8B6B4A","8B6B4A","8B6B4A","56381E","8B6B4A",
    "8B6B4A","8B6B4A","56381E","8B6B4A","8B6B4A","8B6B4A","56381E","8B6B4A"
  ];

  var TEX_TOP = [
    "56381E","56381E","56381E","56381E","56381E","56381E","56381E","56381E",
    "56381E","56381E","56381E","56381E","56381E","56381E","56381E","56381E",
    "56381E","7B5B3A","7B5B3A","7B5B3A","7B5B3A","7B5B3A","7B5B3A","7B5B3A",
    "7B5B3A","7B5B3A","7B5B3A","7B5B3A","7B5B3A","7B5B3A","7B5B3A","56381E",
    "56381E","7B5B3A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A",
    "8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","7B5B3A","56381E",
    "56381E","7B5B3A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A",
    "8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","7B5B3A","56381E",
    "56381E","7B5B3A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A",
    "8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","7B5B3A","56381E",
    "56381E","7B5B3A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A",
    "8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","7B5B3A","56381E",
    "56381E","7B5B3A","8B6B4A","8B6B4A","8B6B4A","44AA44","44AA44","8B6B4A",
    "8B6B4A","44AA44","44AA44","8B6B4A","8B6B4A","8B6B4A","7B5B3A","56381E",
    "56381E","7B5B3A","8B6B4A","8B6B4A","8B6B4A","44AA44","44AA44","8B6B4A",
    "8B6B4A","44AA44","44AA44","8B6B4A","8B6B4A","8B6B4A","7B5B3A","56381E",
    "56381E","7B5B3A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A",
    "8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","7B5B3A","56381E",
    "56381E","7B5B3A","8B6B4A","8B6B4A","8B6B4A","44AA44","44AA44","8B6B4A",
    "8B6B4A","44AA44","44AA44","8B6B4A","8B6B4A","8B6B4A","7B5B3A","56381E",
    "56381E","7B5B3A","8B6B4A","8B6B4A","8B6B4A","44AA44","44AA44","8B6B4A",
    "8B6B4A","44AA44","44AA44","8B6B4A","8B6B4A","8B6B4A","7B5B3A","56381E",
    "56381E","7B5B3A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A",
    "8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","7B5B3A","56381E",
    "56381E","7B5B3A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A",
    "8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","8B6B4A","7B5B3A","56381E",
    "56381E","7B5B3A","7B5B3A","7B5B3A","7B5B3A","7B5B3A","7B5B3A","7B5B3A",
    "7B5B3A","7B5B3A","7B5B3A","7B5B3A","7B5B3A","7B5B3A","7B5B3A","56381E",
    "56381E","56381E","56381E","56381E","56381E","56381E","56381E","56381E",
    "56381E","56381E","56381E","56381E","56381E","56381E","56381E","56381E"
  ];

  // ---- Helpers ----
  function hexToRgb(hex) {
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
  }

  function createTextureFromHexArray(hexArr, size) {
    var canvas  = document.createElement("canvas");
    canvas.width  = size;
    canvas.height = size;
    var ctx = canvas.getContext("2d");
    var imgData = ctx.createImageData(size, size);
    for (var i = 0; i < hexArr.length; i++) {
      var rgb = hexToRgb(hexArr[i]);
      imgData.data[i * 4]     = rgb[0];
      imgData.data[i * 4 + 1] = rgb[1];
      imgData.data[i * 4 + 2] = rgb[2];
      imgData.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);
    return canvas;
  }

  // ---- Barrel Tile Entity (inventory storage) ----
  function BarrelTileEntity(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.customName = "Barrel";
    this.slots = new Array(BARREL_INV_SIZE);
    for (var i = 0; i < BARREL_INV_SIZE; i++) {
      this.slots[i] = null;   // { id, count, damage }
    }
  }

  BarrelTileEntity.prototype.getSlot = function(index) {
    if (index < 0 || index >= BARREL_INV_SIZE) return null;
    return this.slots[index];
  };

  BarrelTileEntity.prototype.setSlot = function(index, itemStack) {
    if (index < 0 || index >= BARREL_INV_SIZE) return;
    this.slots[index] = itemStack;
  };

  BarrelTileEntity.prototype.toNBT = function() {
    var items = [];
    for (var i = 0; i < BARREL_INV_SIZE; i++) {
      if (this.slots[i] !== null) {
        items.push({
          Slot:   i,
          id:     this.slots[i].id,
          Count:  this.slots[i].count,
          Damage: this.slots[i].damage || 0
        });
      }
    }
    return {
      id:         MOD_ID + ":barrel",
      x:          this.x,
      y:          this.y,
      z:          this.z,
      CustomName: this.customName,
      Items:      items
    };
  };

  BarrelTileEntity.fromNBT = function(nbt) {
    var te = new BarrelTileEntity(nbt.x, nbt.y, nbt.z);
    if (nbt.CustomName) te.customName = nbt.CustomName;
    if (nbt.Items) {
      for (var i = 0; i < nbt.Items.length; i++) {
        var item = nbt.Items[i];
        te.slots[item.Slot] = {
          id:     item.id,
          count:  item.Count,
          damage: item.Damage || 0
        };
      }
    }
    return te;
  };

  // ---- Registry of placed barrel tile entities ----
  var barrelTileEntities = {};

  function posKey(x, y, z) {
    return x + "," + y + "," + z;
  }

  function getBarrelTE(x, y, z) {
    return barrelTileEntities[posKey(x, y, z)] || null;
  }

  function setBarrelTE(x, y, z, te) {
    barrelTileEntities[posKey(x, y, z)] = te;
  }

  function removeBarrelTE(x, y, z) {
    delete barrelTileEntities[posKey(x, y, z)];
  }

  // ---- Block Registration ----
  function registerBarrelBlock(api) {
    api.registerBlock({
      id:          BARREL_BLOCK_ID,
      name:        "barrel",
      displayName: "Barrel",
      hardness:    BARREL_HARDNESS,
      resistance:  BARREL_RESISTANCE,
      soundType:   BARREL_SOUND,
      material:    "wood",
      harvestTool: "axe",
      harvestLevel: 0,
      isOpaque:    true,
      renderType:  "standard",
      textures: {
        top:    MOD_ID + ":barrel_top",
        bottom: MOD_ID + ":barrel_top",
        north:  MOD_ID + ":barrel_side",
        south:  MOD_ID + ":barrel_side",
        east:   MOD_ID + ":barrel_side",
        west:   MOD_ID + ":barrel_side"
      },
      drops: [{ id: BARREL_ITEM_ID, count: 1 }],

      onBlockPlaced: function(world, x, y, z, player) {
        var te = new BarrelTileEntity(x, y, z);
        setBarrelTE(x, y, z, te);
      },

      onBlockDestroyed: function(world, x, y, z) {
        var te = getBarrelTE(x, y, z);
        if (te) {
          // Drop all stored items
          for (var i = 0; i < BARREL_INV_SIZE; i++) {
            if (te.slots[i] !== null) {
              world.spawnItem(x, y, z, te.slots[i]);
            }
          }
          removeBarrelTE(x, y, z);
        }
      },

      onBlockActivated: function(world, x, y, z, player) {
        var te = getBarrelTE(x, y, z);
        if (!te) {
          te = new BarrelTileEntity(x, y, z);
          setBarrelTE(x, y, z, te);
        }
        openBarrelGUI(player, te);
        return true;
      }
    });
  }

  // ---- Crafting Recipe Registration ----
  function registerBarrelRecipe(api) {
    // Shaped recipe:
    //   P S P
    //   P   P
    //   P S P
    // P = oak planks (id 5), S = oak slab (id 126 or 44:2)
    api.registerShapedRecipe({
      result: { id: BARREL_ITEM_ID, count: 1 },
      pattern: [
        "PSP",
        "P P",
        "PSP"
      ],
      key: {
        P: { id: 5,  damage: 0 },   // oak planks
        S: { id: 44, damage: 2 }    // oak wood slab
      }
    });
  }

  // ---- GUI / Inventory Screen ----
  function openBarrelGUI(player, tileEntity) {
    var gui = {
      type:  "container",
      title: tileEntity.customName || "Barrel",
      rows:  3,
      slots: []
    };

    // Barrel inventory slots (0-26)
    for (var i = 0; i < BARREL_INV_SIZE; i++) {
      gui.slots.push({
        index:    i,
        x:        8 + (i % 9) * 18,
        y:        18 + Math.floor(i / 9) * 18,
        source:   "tileEntity",
        stack:    tileEntity.getSlot(i),
        onChanged: (function(slot) {
          return function(newStack) {
            tileEntity.setSlot(slot, newStack);
          };
        })(i)
      });
    }

    // Player inventory (27-53) and hotbar (54-62)
    for (var p = 0; p < 27; p++) {
      gui.slots.push({
        index:  BARREL_INV_SIZE + p,
        x:      8 + (p % 9) * 18,
        y:      84 + Math.floor(p / 9) * 18,
        source: "playerInventory",
        playerSlot: p + 9
      });
    }
    for (var h = 0; h < 9; h++) {
      gui.slots.push({
        index:  BARREL_INV_SIZE + 27 + h,
        x:      8 + h * 18,
        y:      142,
        source: "playerInventory",
        playerSlot: h
      });
    }

    if (typeof player.openGUI === "function") {
      player.openGUI(gui);
    }
  }

  // ---- Texture Registration ----
  function registerTextures(api) {
    var sideCanvas = createTextureFromHexArray(TEX_SIDE, 16);
    var topCanvas  = createTextureFromHexArray(TEX_TOP,  16);

    api.registerTexture(MOD_ID + ":barrel_side", sideCanvas);
    api.registerTexture(MOD_ID + ":barrel_top",  topCanvas);
  }

  // ---- Creative Tab ----
  function registerCreativeTab(api) {
    api.addToCreativeTab("decorations", {
      id:   BARREL_ITEM_ID,
      name: "Barrel"
    });
  }

  // ---- Save / Load Hooks ----
  function onWorldSave(api) {
    var data = {};
    for (var key in barrelTileEntities) {
      if (barrelTileEntities.hasOwnProperty(key)) {
        data[key] = barrelTileEntities[key].toNBT();
      }
    }
    api.saveModData(MOD_ID, JSON.stringify(data));
  }

  function onWorldLoad(api) {
    var raw = api.loadModData(MOD_ID);
    if (!raw) return;
    var data = JSON.parse(raw);
    barrelTileEntities = {};
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        barrelTileEntities[key] = BarrelTileEntity.fromNBT(data[key]);
      }
    }
  }

  // ---- Mod Entry Point ----
  function init(api) {
    console.log("[" + MOD_NAME + " v" + MOD_VER + "] Initializing...");

    registerTextures(api);
    registerBarrelBlock(api);
    registerBarrelRecipe(api);
    registerCreativeTab(api);

    api.on("worldSave", function() { onWorldSave(api); });
    api.on("worldLoad", function() { onWorldLoad(api); });

    console.log("[" + MOD_NAME + " v" + MOD_VER + "] Loaded successfully!");
  }

  // ---- Register with Eaglercraft Mod Loader ----
  if (typeof ModAPI !== "undefined") {
    ModAPI.register({
      id:      MOD_ID,
      name:    MOD_NAME,
      version: MOD_VER,
      init:    init
    });
  } else if (typeof registerMod === "function") {
    registerMod(MOD_ID, MOD_NAME, MOD_VER, init);
  } else {
    console.warn("[" + MOD_NAME + "] No mod loader detected. "
      + "Attach to the Eaglercraft ModAPI manually.");
    window.BarrelMod = { init: init };
  }

})();
