// TextureGenerator: Creates all placeholder pixel-art textures
export function createPlaceholderTextures(scene) {
    const g = scene.add.graphics();

    // --- FARUK (without armor) ---
    g.clear();
    // Body (royal blue tunic)
    g.fillStyle(0x1a3a6e); g.fillRect(8, 14, 16, 16);
    // Head (skin)
    g.fillStyle(0xf5c6a0); g.fillRect(10, 2, 12, 12);
    // Hair (dark brown)
    g.fillStyle(0x3a2a1a); g.fillRect(10, 1, 12, 4);
    g.fillRect(9, 2, 2, 6);
    // Eyes
    g.fillStyle(0xffffff); g.fillRect(13, 6, 4, 3); g.fillRect(19, 6, 4, 3);
    g.fillStyle(0x1a1a1a); g.fillRect(15, 7, 2, 2); g.fillRect(21, 7, 2, 2);
    g.fillStyle(0xffffff); g.fillRect(15, 7, 1, 1); g.fillRect(21, 7, 1, 1);
    // Beard (short)
    g.fillStyle(0x3a2a1a); g.fillRect(12, 11, 8, 3);
    // Crown
    g.fillStyle(0xFFD700); g.fillRect(11, 0, 10, 2);
    g.fillRect(11, -1, 2, 2); g.fillRect(15, -2, 2, 3); g.fillRect(19, -1, 2, 2);
    g.fillStyle(0xFF0000); g.fillRect(15, -1, 2, 1);
    // Legs
    g.fillStyle(0x2a2a4e); g.fillRect(10, 30, 6, 8); g.fillRect(16, 30, 6, 8);
    // Boots
    g.fillStyle(0x4a2a0a); g.fillRect(10, 36, 6, 4); g.fillRect(16, 36, 6, 4);
    // Arms
    g.fillStyle(0x1a3a6e); g.fillRect(4, 16, 4, 12); g.fillRect(24, 16, 4, 12);
    // Hands
    g.fillStyle(0xf5c6a0); g.fillRect(4, 26, 4, 4); g.fillRect(24, 26, 4, 4);
    g.generateTexture('faruk', 32, 42);

    // --- FARUK with ARMOR ---
    g.clear();
    // Armor body (silver/steel)
    g.fillStyle(0x8899aa); g.fillRect(8, 14, 16, 16);
    g.fillStyle(0xaabbcc); g.fillRect(10, 16, 12, 4); // chestplate shine
    // Head
    g.fillStyle(0xf5c6a0); g.fillRect(10, 2, 12, 12);
    g.fillStyle(0x3a2a1a); g.fillRect(10, 1, 12, 4); g.fillRect(9, 2, 2, 6);
    // Eyes
    g.fillStyle(0xffffff); g.fillRect(13, 6, 4, 3); g.fillRect(19, 6, 4, 3);
    g.fillStyle(0x1a1a1a); g.fillRect(15, 7, 2, 2); g.fillRect(21, 7, 2, 2);
    g.fillStyle(0xffffff); g.fillRect(15, 7, 1, 1); g.fillRect(21, 7, 1, 1);
    // Beard
    g.fillStyle(0x3a2a1a); g.fillRect(12, 11, 8, 3);
    // Crown
    g.fillStyle(0xFFD700); g.fillRect(11, 0, 10, 2);
    g.fillRect(11, -1, 2, 2); g.fillRect(15, -2, 2, 3); g.fillRect(19, -1, 2, 2);
    g.fillStyle(0xFF0000); g.fillRect(15, -1, 2, 1);
    // Armor legs
    g.fillStyle(0x667788); g.fillRect(10, 30, 6, 8); g.fillRect(16, 30, 6, 8);
    g.fillStyle(0x556677); g.fillRect(10, 36, 6, 4); g.fillRect(16, 36, 6, 4);
    // Armor arms + shoulder guards
    g.fillStyle(0x8899aa); g.fillRect(3, 16, 5, 12); g.fillRect(24, 16, 5, 12);
    g.fillStyle(0xaabbcc); g.fillRect(2, 14, 6, 4); g.fillRect(24, 14, 6, 4);
    // Gauntlets
    g.fillStyle(0x667788); g.fillRect(3, 26, 5, 4); g.fillRect(24, 26, 5, 4);
    // Cape (red, behind)
    g.fillStyle(0xcc2244); g.fillRect(7, 14, 2, 20); g.fillRect(23, 14, 2, 20);
    // Sword in right hand (blade up)
    g.fillStyle(0xcccccc); g.fillRect(27, 8, 2, 18); // blade
    g.fillStyle(0xeeeeee); g.fillRect(27, 10, 1, 14); // shine
    g.fillStyle(0xFFD700); g.fillRect(25, 24, 6, 2); // guard
    g.generateTexture('faruk-armor', 32, 42);

    // --- AYÇA (purple dress) ---
    g.clear();
    // Dress
    g.fillStyle(0x7b2d8e); g.fillRect(8, 14, 16, 18);
    g.fillStyle(0x9b4dae); g.fillRect(10, 20, 12, 8); // dress highlight
    // Head
    g.fillStyle(0xf5c6a0); g.fillRect(10, 2, 12, 12);
    // Hair (long, dark)
    g.fillStyle(0x2a1a0a); g.fillRect(9, 1, 14, 5);
    g.fillRect(8, 3, 3, 14); g.fillRect(21, 3, 3, 14);
    // Eyes (bigger, expressive)
    g.fillStyle(0xffffff); g.fillRect(13, 6, 4, 3); g.fillRect(19, 6, 4, 3);
    g.fillStyle(0x2a6e2a); g.fillRect(14, 7, 3, 2); g.fillRect(20, 7, 3, 2);
    g.fillStyle(0xffffff); g.fillRect(15, 7, 1, 1); g.fillRect(21, 7, 1, 1);
    // Lips
    g.fillStyle(0xe94560); g.fillRect(14, 11, 4, 1);
    // Crown/tiara
    g.fillStyle(0xFFD700); g.fillRect(11, 0, 10, 2);
    g.fillStyle(0xFF69B4); g.fillRect(15, -1, 2, 2);
    // Dress skirt widens
    g.fillStyle(0x7b2d8e); g.fillRect(6, 28, 20, 8);
    // Shoes
    g.fillStyle(0xFFD700); g.fillRect(10, 36, 5, 2); g.fillRect(17, 36, 5, 2);
    // Arms
    g.fillStyle(0x7b2d8e); g.fillRect(4, 16, 4, 10); g.fillRect(24, 16, 4, 10);
    g.fillStyle(0xf5c6a0); g.fillRect(4, 24, 4, 4); g.fillRect(24, 24, 4, 4);
    g.generateTexture('ayca', 32, 40);

    // --- AYÇA (white dress - ending) ---
    g.clear();
    g.fillStyle(0xffffff); g.fillRect(8, 14, 16, 18);
    g.fillStyle(0xeeeeff); g.fillRect(10, 20, 12, 8);
    g.fillStyle(0xf5c6a0); g.fillRect(10, 2, 12, 12);
    g.fillStyle(0x2a1a0a); g.fillRect(9, 1, 14, 5);
    g.fillRect(8, 3, 3, 14); g.fillRect(21, 3, 3, 14);
    g.fillStyle(0xffffff); g.fillRect(13, 6, 4, 3); g.fillRect(19, 6, 4, 3);
    g.fillStyle(0x2a6e2a); g.fillRect(14, 7, 3, 2); g.fillRect(20, 7, 3, 2);
    g.fillStyle(0xffffff); g.fillRect(15, 7, 1, 1); g.fillRect(21, 7, 1, 1);
    g.fillStyle(0xe94560); g.fillRect(14, 11, 4, 1);
    g.fillStyle(0xFFD700); g.fillRect(11, 0, 10, 2);
    g.fillStyle(0xFF69B4); g.fillRect(15, -1, 2, 2);
    g.fillStyle(0xffffff); g.fillRect(6, 28, 20, 8);
    g.fillStyle(0xFFD700); g.fillRect(10, 36, 5, 2); g.fillRect(17, 36, 5, 2);
    g.fillStyle(0xffffff); g.fillRect(4, 16, 4, 10); g.fillRect(24, 16, 4, 10);
    g.fillStyle(0xf5c6a0); g.fillRect(4, 24, 4, 4); g.fillRect(24, 24, 4, 4);
    g.generateTexture('ayca-white', 32, 40);

    // --- DRAGON (Angara Ejderhası) ---
    g.clear();
    // Body (dark green/black)
    g.fillStyle(0x1a3a1a); g.fillRect(10, 20, 44, 24);
    g.fillStyle(0x2a4a2a); g.fillRect(14, 22, 36, 16);
    // Head
    g.fillStyle(0x1a3a1a); g.fillRect(48, 10, 16, 16);
    g.fillStyle(0x2a4a2a); g.fillRect(50, 12, 12, 10);
    // Red eyes
    g.fillStyle(0xFF0000); g.fillRect(54, 14, 4, 4); g.fillRect(60, 14, 4, 4);
    g.fillStyle(0xFFFF00); g.fillRect(55, 15, 2, 2); g.fillRect(61, 15, 2, 2);
    // Horns
    g.fillStyle(0x4a3a2a); g.fillRect(50, 6, 3, 6); g.fillRect(59, 6, 3, 6);
    g.fillRect(50, 4, 2, 3); g.fillRect(60, 4, 2, 3);
    // Wings
    g.fillStyle(0x0a2a0a); g.fillRect(18, 4, 30, 16);
    g.fillStyle(0x1a3a1a); g.fillRect(20, 6, 8, 12);
    g.fillRect(30, 6, 8, 12); g.fillRect(40, 8, 6, 8);
    // Tail
    g.fillStyle(0x1a3a1a); g.fillRect(2, 28, 10, 6);
    g.fillRect(0, 30, 4, 4);
    g.fillStyle(0xFF4444); g.fillRect(0, 31, 3, 2); // tail spike
    // Legs
    g.fillStyle(0x1a3a1a);
    g.fillRect(16, 42, 6, 8); g.fillRect(28, 42, 6, 8);
    g.fillRect(38, 42, 6, 8); g.fillRect(48, 42, 6, 8);
    // Claws
    g.fillStyle(0x4a3a2a);
    g.fillRect(15, 48, 3, 3); g.fillRect(19, 48, 3, 3);
    g.fillRect(27, 48, 3, 3); g.fillRect(31, 48, 3, 3);
    // Belly (lighter)
    g.fillStyle(0x3a5a3a); g.fillRect(20, 32, 24, 10);
    // Teeth
    g.fillStyle(0xffffff);
    g.fillRect(58, 24, 2, 3); g.fillRect(62, 24, 2, 3);
    g.generateTexture('dragon', 66, 52);

    // --- PIRI REIS ---
    g.clear();
    // Robe (navy blue)
    g.fillStyle(0x1a2a5e); g.fillRect(8, 14, 16, 18);
    g.fillStyle(0x2a3a6e); g.fillRect(10, 16, 12, 6);
    // Head
    g.fillStyle(0xd4a574); g.fillRect(10, 2, 12, 12);
    // Turban (white)
    g.fillStyle(0xffffff); g.fillRect(9, 0, 14, 6);
    g.fillStyle(0xFF0000); g.fillRect(15, 1, 2, 3); // turban jewel
    // Older face - white beard
    g.fillStyle(0xcccccc); g.fillRect(12, 10, 8, 6);
    // Eyes
    g.fillStyle(0xffffff); g.fillRect(13, 6, 3, 3); g.fillRect(18, 6, 3, 3);
    g.fillStyle(0x1a1a1a); g.fillRect(14, 7, 2, 2); g.fillRect(19, 7, 2, 2);
    // Map scroll in hand
    g.fillStyle(0xd4a060); g.fillRect(26, 20, 6, 3);
    g.fillStyle(0xf0e0b0); g.fillRect(27, 18, 4, 8);
    // Legs/feet
    g.fillStyle(0x1a2a5e); g.fillRect(10, 32, 12, 6);
    g.fillStyle(0x3a2a0a); g.fillRect(10, 36, 5, 3); g.fillRect(17, 36, 5, 3);
    g.generateTexture('piri-reis', 34, 40);

    // --- PARGALI İBRAHİM ---
    g.clear();
    // Grand vizier robe (burgundy/wine)
    g.fillStyle(0x6e1a2a); g.fillRect(8, 14, 16, 18);
    g.fillStyle(0x8e2a3a); g.fillRect(10, 16, 12, 4);
    // Gold trim
    g.fillStyle(0xFFD700); g.fillRect(8, 14, 16, 1); g.fillRect(8, 31, 16, 1);
    // Head
    g.fillStyle(0xe8b88a); g.fillRect(10, 2, 12, 12);
    // Turban
    g.fillStyle(0xffffff); g.fillRect(9, 0, 14, 5);
    g.fillStyle(0xFFD700); g.fillRect(15, 0, 2, 3);
    // Eyes (cunning)
    g.fillStyle(0xffffff); g.fillRect(13, 6, 3, 3); g.fillRect(18, 6, 3, 3);
    g.fillStyle(0x1a1a1a); g.fillRect(14, 7, 2, 2); g.fillRect(19, 7, 2, 2);
    // Short beard
    g.fillStyle(0x2a1a0a); g.fillRect(12, 11, 8, 3);
    // Arms
    g.fillStyle(0x6e1a2a); g.fillRect(4, 16, 4, 12); g.fillRect(24, 16, 4, 12);
    // Legs
    g.fillStyle(0x4e1a2a); g.fillRect(10, 32, 6, 6); g.fillRect(16, 32, 6, 6);
    g.fillStyle(0x3a2a0a); g.fillRect(10, 36, 5, 3); g.fillRect(17, 36, 5, 3);
    g.generateTexture('pargali', 32, 40);

    // --- SÜMBÜL AĞA ---
    g.clear();
    // Gray robe
    g.fillStyle(0x666677); g.fillRect(8, 14, 16, 18);
    g.fillStyle(0x777788); g.fillRect(10, 16, 12, 4);
    // Head
    g.fillStyle(0xd4a574); g.fillRect(10, 2, 12, 12);
    // Simple hat
    g.fillStyle(0x555566); g.fillRect(10, 0, 12, 4);
    g.fillStyle(0x888899); g.fillRect(12, -1, 8, 2);
    // Friendly eyes
    g.fillStyle(0xffffff); g.fillRect(13, 6, 3, 3); g.fillRect(18, 6, 3, 3);
    g.fillStyle(0x1a1a1a); g.fillRect(14, 7, 2, 2); g.fillRect(19, 7, 2, 2);
    // Smile
    g.fillStyle(0xcc8866); g.fillRect(14, 11, 4, 1);
    // Arms
    g.fillStyle(0x666677); g.fillRect(4, 16, 4, 12); g.fillRect(24, 16, 4, 12);
    g.fillStyle(0xd4a574); g.fillRect(4, 26, 4, 4); g.fillRect(24, 26, 4, 4);
    // Legs
    g.fillStyle(0x555566); g.fillRect(10, 32, 6, 6); g.fillRect(16, 32, 6, 6);
    g.fillStyle(0x3a2a0a); g.fillRect(10, 36, 5, 3); g.fillRect(17, 36, 5, 3);
    g.generateTexture('sumbul-aga', 32, 40);

    // --- FISHERMAN ---
    g.clear();
    // Simple clothes (brown)
    g.fillStyle(0x6e4a2a); g.fillRect(8, 14, 16, 16);
    // Head
    g.fillStyle(0xd4a574); g.fillRect(10, 2, 12, 12);
    // Fisherman hat
    g.fillStyle(0x8B7355); g.fillRect(8, 0, 16, 4);
    g.fillRect(6, 3, 20, 2);
    // Eyes
    g.fillStyle(0xffffff); g.fillRect(13, 6, 3, 3); g.fillRect(18, 6, 3, 3);
    g.fillStyle(0x1a1a1a); g.fillRect(14, 7, 2, 2); g.fillRect(19, 7, 2, 2);
    // Scruffy beard
    g.fillStyle(0x8a7a6a); g.fillRect(12, 10, 8, 4);
    // Arms
    g.fillStyle(0x6e4a2a); g.fillRect(4, 16, 4, 10); g.fillRect(24, 16, 4, 10);
    g.fillStyle(0xd4a574); g.fillRect(4, 24, 4, 4); g.fillRect(24, 24, 4, 4);
    // Legs
    g.fillStyle(0x4a3a2a); g.fillRect(10, 30, 6, 8); g.fillRect(16, 30, 6, 8);
    g.fillStyle(0x3a2a1a); g.fillRect(10, 36, 6, 3); g.fillRect(16, 36, 6, 3);
    g.generateTexture('fisherman', 32, 40);

    // --- SOLDIER (kale askeri) ---
    g.clear();
    // Armor
    g.fillStyle(0x556677); g.fillRect(8, 14, 16, 16);
    g.fillStyle(0x667788); g.fillRect(10, 16, 12, 4);
    // Helmet
    g.fillStyle(0x556677); g.fillRect(9, 0, 14, 8);
    g.fillStyle(0x445566); g.fillRect(12, 0, 8, 2);
    // Face slit
    g.fillStyle(0x1a1a1a); g.fillRect(12, 5, 8, 2);
    g.fillStyle(0xe8b88a); g.fillRect(13, 5, 6, 2);
    // Eyes in helmet
    g.fillStyle(0xffffff); g.fillRect(14, 5, 2, 1); g.fillRect(18, 5, 2, 1);
    // Shield
    g.fillStyle(0x445566); g.fillRect(0, 16, 8, 14);
    g.fillStyle(0xFFD700); g.fillRect(2, 18, 4, 10);
    g.fillStyle(0xFF0000); g.fillRect(3, 20, 2, 6);
    // Sword
    g.fillStyle(0xcccccc); g.fillRect(26, 10, 2, 18);
    g.fillStyle(0xFFD700); g.fillRect(24, 26, 6, 2);
    // Legs
    g.fillStyle(0x445566); g.fillRect(10, 30, 6, 8); g.fillRect(16, 30, 6, 8);
    g.fillStyle(0x3a3a4a); g.fillRect(10, 36, 6, 3); g.fillRect(16, 36, 6, 3);
    g.generateTexture('soldier', 30, 40);

    // --- MONSTER (ada canavarı) ---
    g.clear();
    // Body (dark purple/demonic)
    g.fillStyle(0x4a1a4a); g.fillRect(6, 10, 20, 18);
    g.fillStyle(0x5a2a5a); g.fillRect(8, 12, 16, 10);
    // Head
    g.fillStyle(0x4a1a4a); g.fillRect(8, 0, 16, 12);
    // Red eyes
    g.fillStyle(0xFF0000); g.fillRect(11, 4, 4, 3); g.fillRect(19, 4, 4, 3);
    g.fillStyle(0xFFFF00); g.fillRect(12, 5, 2, 1); g.fillRect(20, 5, 2, 1);
    // Horns
    g.fillStyle(0x3a0a3a); g.fillRect(8, -2, 3, 4); g.fillRect(21, -2, 3, 4);
    // Teeth
    g.fillStyle(0xffffff);
    g.fillRect(12, 9, 2, 3); g.fillRect(14, 10, 2, 2);
    g.fillRect(18, 9, 2, 3); g.fillRect(16, 10, 2, 2);
    // Claws
    g.fillStyle(0x3a0a3a);
    g.fillRect(2, 14, 4, 8); g.fillRect(26, 14, 4, 8);
    g.fillStyle(0xcccccc);
    g.fillRect(1, 20, 2, 3); g.fillRect(27, 20, 2, 3);
    // Legs
    g.fillStyle(0x3a0a3a); g.fillRect(8, 28, 6, 8); g.fillRect(18, 28, 6, 8);
    g.generateTexture('monster', 32, 38);

    // --- GUARD (şehir koruması) ---
    g.clear();
    // Fancy armor (gold trimmed)
    g.fillStyle(0x3a4a6e); g.fillRect(8, 14, 16, 16);
    g.fillStyle(0xFFD700); g.fillRect(8, 14, 16, 1); g.fillRect(14, 14, 4, 16);
    // Helmet with plume
    g.fillStyle(0x3a4a6e); g.fillRect(9, 2, 14, 10);
    g.fillStyle(0xFF0000); g.fillRect(14, -2, 4, 6);
    // Face
    g.fillStyle(0xe8b88a); g.fillRect(12, 7, 8, 5);
    g.fillStyle(0xffffff); g.fillRect(14, 8, 2, 2); g.fillRect(18, 8, 2, 2);
    g.fillStyle(0x1a1a1a); g.fillRect(14, 9, 2, 1); g.fillRect(18, 9, 2, 1);
    // Spear
    g.fillStyle(0x8B7355); g.fillRect(28, 0, 2, 38);
    g.fillStyle(0xcccccc); g.fillRect(27, 0, 4, 5);
    // Arms
    g.fillStyle(0x3a4a6e); g.fillRect(4, 16, 4, 12); g.fillRect(24, 16, 4, 12);
    // Legs
    g.fillStyle(0x2a3a5e); g.fillRect(10, 30, 6, 8); g.fillRect(16, 30, 6, 8);
    g.fillStyle(0x3a2a0a); g.fillRect(10, 36, 6, 3); g.fillRect(16, 36, 6, 3);
    g.generateTexture('guard', 32, 40);

    // --- CROWD PERSON (halk figürü - erkek) ---
    g.clear();
    g.fillStyle(0x8a6a4a); g.fillRect(4, 8, 10, 12); // brown tunic
    g.fillStyle(0xd4a574); g.fillRect(5, 0, 8, 8); // head
    g.fillStyle(0x3a2a1a); g.fillRect(5, 0, 8, 3); // hair
    g.fillStyle(0x1a1a1a); g.fillRect(7, 4, 1, 1); g.fillRect(10, 4, 1, 1); // eyes
    g.fillStyle(0x6a4a2a); g.fillRect(4, 20, 4, 6); g.fillRect(10, 20, 4, 6); // legs
    g.generateTexture('crowd-man', 18, 28);

    // --- CROWD PERSON (halk figürü - kadın) ---
    g.clear();
    g.fillStyle(0x9a5a7a); g.fillRect(4, 8, 10, 14); // dress
    g.fillStyle(0xd4a574); g.fillRect(5, 0, 8, 8); // head
    g.fillStyle(0x2a1a0a); g.fillRect(4, 0, 10, 3); g.fillRect(3, 2, 3, 6); g.fillRect(12, 2, 3, 6); // hair
    g.fillStyle(0x1a1a1a); g.fillRect(7, 4, 1, 1); g.fillRect(10, 4, 1, 1);
    g.fillStyle(0x9a5a7a); g.fillRect(3, 18, 12, 6); // skirt
    g.generateTexture('crowd-woman', 18, 28);

    // --- TILES ---
    // Ground (grass)
    g.clear();
    g.fillStyle(0x3a8a3a); g.fillRect(0, 0, 64, 64);
    g.fillStyle(0x2a7a2a); g.fillRect(0, 0, 64, 8);
    g.fillStyle(0x5a4a2a); g.fillRect(0, 8, 64, 56);
    g.fillStyle(0x4a3a1a);
    for (let i = 0; i < 8; i++) g.fillRect(i * 8, 8 + i * 2, 4, 2);
    // Grass blades
    g.fillStyle(0x4aaa4a);
    g.fillRect(4, 0, 2, 6); g.fillRect(18, 0, 2, 5); g.fillRect(34, 0, 2, 7);
    g.fillRect(48, 0, 2, 4); g.fillRect(58, 0, 2, 6);
    g.generateTexture('ground', 64, 64);

    // Stone ground
    g.clear();
    g.fillStyle(0x666666); g.fillRect(0, 0, 64, 64);
    g.fillStyle(0x555555); g.fillRect(2, 2, 28, 28);
    g.fillStyle(0x777777); g.fillRect(34, 2, 28, 28);
    g.fillStyle(0x5a5a5a); g.fillRect(2, 34, 28, 28);
    g.fillStyle(0x6a6a6a); g.fillRect(34, 34, 28, 28);
    g.generateTexture('stone-ground', 64, 64);

    // Castle wall
    g.clear();
    g.fillStyle(0x5a5a6a); g.fillRect(0, 0, 64, 64);
    g.fillStyle(0x4a4a5a); g.fillRect(2, 2, 28, 14); g.fillRect(34, 2, 28, 14);
    g.fillStyle(0x6a6a7a); g.fillRect(10, 20, 28, 14); g.fillRect(42, 20, 20, 14);
    g.fillStyle(0x4a4a5a); g.fillRect(2, 38, 28, 14); g.fillRect(34, 38, 28, 14);
    g.fillStyle(0x3a3a4a); g.fillRect(0, 16, 64, 2); g.fillRect(0, 36, 64, 2);
    g.generateTexture('castle-wall', 64, 64);

    // Cave wall
    g.clear();
    g.fillStyle(0x2a2a2a); g.fillRect(0, 0, 64, 64);
    g.fillStyle(0x3a3a3a);
    g.fillRect(5, 5, 20, 15); g.fillRect(30, 10, 25, 20);
    g.fillRect(10, 35, 30, 20);
    g.fillStyle(0x1a1a1a);
    g.fillRect(0, 30, 64, 2); g.fillRect(20, 0, 2, 64);
    g.generateTexture('cave-wall', 64, 64);

    // --- OBJECTS ---
    // Tree
    g.clear();
    g.fillStyle(0x6e4a2a); g.fillRect(12, 30, 8, 30);
    g.fillStyle(0x2a6a2a); g.fillCircle(16, 20, 16);
    g.fillStyle(0x3a8a3a); g.fillCircle(16, 16, 12);
    g.fillStyle(0x4aaa4a); g.fillCircle(16, 14, 6);
    g.generateTexture('tree', 34, 60);

    // Dark tree (for dark forest)
    g.clear();
    g.fillStyle(0x3a2a1a); g.fillRect(12, 30, 8, 30);
    g.fillStyle(0x1a3a1a); g.fillCircle(16, 20, 16);
    g.fillStyle(0x0a2a0a); g.fillCircle(16, 16, 12);
    g.generateTexture('dark-tree', 34, 60);

    // Table
    g.clear();
    g.fillStyle(0x8B5A2B); g.fillRect(0, 0, 100, 8);
    g.fillStyle(0x6e4a2a); g.fillRect(4, 8, 6, 20);
    g.fillRect(90, 8, 6, 20);
    g.generateTexture('table', 100, 28);

    // Food plate
    g.clear();
    g.fillStyle(0xdddddd); g.fillCircle(12, 12, 10); // plate
    g.fillStyle(0xcccccc); g.fillCircle(12, 12, 8);
    g.fillStyle(0x8B4513); g.fillCircle(12, 10, 5); // meat
    g.fillStyle(0xcc6633); g.fillCircle(12, 10, 3);
    g.generateTexture('food-plate', 24, 24);

    // Wine goblet
    g.clear();
    g.fillStyle(0xFFD700); g.fillRect(4, 0, 6, 10); // cup
    g.fillRect(3, 10, 8, 2); // base
    g.fillStyle(0x8B0000); g.fillRect(5, 1, 4, 6); // wine
    g.generateTexture('goblet', 14, 14);

    // Boat
    g.clear();
    g.fillStyle(0x6e4a2a); g.fillRect(0, 16, 60, 14);
    g.fillStyle(0x5a3a1a); g.fillRect(2, 20, 56, 8);
    g.fillStyle(0x8B7355); g.fillRect(28, 0, 4, 16); // mast
    g.fillStyle(0xffffff); g.fillRect(30, 2, 20, 12); // sail
    g.fillStyle(0xeeeeee); g.fillRect(32, 4, 16, 8);
    g.fillStyle(0xFF0000); g.fillRect(38, 5, 4, 6); // crescent
    g.generateTexture('boat', 60, 32);

    // Heart
    g.clear();
    g.fillStyle(0xFF1744);
    g.fillCircle(6, 5, 5); g.fillCircle(14, 5, 5);
    g.fillTriangle(1, 7, 10, 18, 19, 7);
    g.generateTexture('heart', 20, 20);

    // Mini heart (for floating animation)
    g.clear();
    g.fillStyle(0xFF69B4);
    g.fillCircle(3, 3, 3); g.fillCircle(7, 3, 3);
    g.fillTriangle(0, 4, 5, 10, 10, 4);
    g.generateTexture('mini-heart', 10, 12);

    // Gold bag
    g.clear();
    g.fillStyle(0xFFD700); g.fillCircle(8, 10, 7);
    g.fillStyle(0xDAA520); g.fillCircle(8, 10, 5);
    g.fillStyle(0x8B6914); g.fillRect(5, 3, 6, 3);
    g.fillStyle(0xFFD700); g.fillRect(7, 2, 2, 1);
    g.generateTexture('gold', 16, 18);

    // Fireball
    g.clear();
    g.fillStyle(0xFF4400); g.fillCircle(8, 8, 7);
    g.fillStyle(0xFF8800); g.fillCircle(8, 8, 5);
    g.fillStyle(0xFFCC00); g.fillCircle(8, 8, 3);
    g.fillStyle(0xFFFF00); g.fillCircle(8, 8, 1);
    g.generateTexture('fireball', 16, 16);

    // Arrow
    g.clear();
    g.fillStyle(0x8B7355); g.fillRect(2, 6, 16, 2); // shaft
    g.fillStyle(0xcccccc); g.fillRect(16, 4, 4, 6); // head
    g.fillRect(18, 5, 3, 4);
    g.fillStyle(0xFF4444); g.fillRect(0, 4, 4, 6); // feather
    g.generateTexture('arrow', 22, 12);

    // Sword
    g.clear();
    g.fillStyle(0xcccccc); g.fillRect(8, 0, 4, 24); // blade
    g.fillStyle(0xeeeeee); g.fillRect(9, 2, 2, 18); // shine
    g.fillStyle(0xFFD700); g.fillRect(4, 22, 12, 3); // guard
    g.fillStyle(0x8B4513); g.fillRect(8, 25, 4, 8); // handle
    g.fillStyle(0xFFD700); g.fillRect(7, 32, 6, 2); // pommel
    g.generateTexture('sword', 20, 36);

    // Checkpoint flag
    g.clear();
    g.fillStyle(0x8B7355); g.fillRect(2, 0, 3, 40);
    g.fillStyle(0x888888); g.fillRect(5, 2, 14, 10);
    g.fillStyle(0x666666); g.fillRect(7, 4, 10, 6);
    g.generateTexture('checkpoint', 20, 42);

    // Checkpoint active
    g.clear();
    g.fillStyle(0xFFD700); g.fillRect(2, 0, 3, 40);
    g.fillStyle(0x00FF00); g.fillRect(5, 2, 14, 10);
    g.fillStyle(0x44FF44); g.fillRect(7, 4, 10, 6);
    g.generateTexture('checkpoint-active', 20, 42);

    // House
    g.clear();
    // Walls
    g.fillStyle(0xd4a574); g.fillRect(4, 16, 40, 28);
    g.fillStyle(0xc49464); g.fillRect(6, 18, 36, 24);
    // Roof
    g.fillStyle(0x8B4513); g.fillTriangle(24, 0, 0, 16, 48, 16);
    g.fillStyle(0x7a3a0a); g.fillTriangle(24, 4, 4, 16, 44, 16);
    // Door
    g.fillStyle(0x5a3a1a); g.fillRect(18, 28, 12, 16);
    g.fillStyle(0xFFD700); g.fillRect(26, 36, 2, 2);
    // Windows
    g.fillStyle(0x87CEEB); g.fillRect(8, 22, 8, 8);
    g.fillRect(32, 22, 8, 8);
    g.fillStyle(0x5a3a1a); g.fillRect(11, 22, 2, 8); g.fillRect(8, 25, 8, 2);
    g.fillRect(35, 22, 2, 8); g.fillRect(32, 25, 8, 2);
    g.generateTexture('house', 48, 46);

    // Debris / stone chunk
    g.clear();
    g.fillStyle(0x777777); g.fillRect(0, 0, 8, 6);
    g.fillStyle(0x666666); g.fillRect(1, 1, 6, 4);
    g.generateTexture('debris', 8, 6);

    // Star
    g.clear();
    g.fillStyle(0xffffff);
    g.fillRect(2, 0, 2, 6);
    g.fillRect(0, 2, 6, 2);
    g.generateTexture('star', 6, 6);

    // Confetti
    g.clear();
    g.fillStyle(0xFF69B4); g.fillRect(0, 0, 4, 4);
    g.generateTexture('confetti-pink', 4, 4);
    g.clear();
    g.fillStyle(0xFFD700); g.fillRect(0, 0, 4, 4);
    g.generateTexture('confetti-gold', 4, 4);
    g.clear();
    g.fillStyle(0x00BFFF); g.fillRect(0, 0, 4, 4);
    g.generateTexture('confetti-blue', 4, 4);

    // Flower
    g.clear();
    g.fillStyle(0x2a8a2a); g.fillRect(4, 6, 2, 8); // stem
    g.fillStyle(0xFF69B4);
    g.fillCircle(5, 4, 3);
    g.fillStyle(0xFFD700); g.fillCircle(5, 4, 1);
    g.generateTexture('flower', 10, 14);

    // --- ŞEKER AĞA (palace cook, plump) ---
    g.clear();
    // Big body (white chef robe)
    g.fillStyle(0xeeeedd); g.fillRect(6, 14, 20, 20);
    g.fillStyle(0xddddcc); g.fillRect(8, 16, 16, 6);
    // Big belly highlight
    g.fillStyle(0xffffff); g.fillRect(10, 22, 12, 8);
    // Head
    g.fillStyle(0xd4a574); g.fillRect(10, 2, 12, 12);
    // Chef hat (white, tall)
    g.fillStyle(0xffffff); g.fillRect(9, -4, 14, 8);
    g.fillRect(10, -6, 12, 4);
    g.fillStyle(0xeeeeee); g.fillRect(11, -5, 10, 2);
    // Rosy cheeks
    g.fillStyle(0xffaaaa); g.fillRect(11, 9, 3, 2); g.fillRect(18, 9, 3, 2);
    // Friendly eyes
    g.fillStyle(0xffffff); g.fillRect(13, 6, 3, 3); g.fillRect(18, 6, 3, 3);
    g.fillStyle(0x1a1a1a); g.fillRect(14, 7, 2, 2); g.fillRect(19, 7, 2, 2);
    // Mustache
    g.fillStyle(0x3a2a1a); g.fillRect(12, 10, 8, 2);
    // Big arms
    g.fillStyle(0xeeeedd); g.fillRect(2, 16, 4, 14); g.fillRect(26, 16, 4, 14);
    g.fillStyle(0xd4a574); g.fillRect(2, 28, 4, 4); g.fillRect(26, 28, 4, 4);
    // Legs (shorter, wider)
    g.fillStyle(0x6a5a4a); g.fillRect(8, 34, 8, 6); g.fillRect(16, 34, 8, 6);
    g.fillStyle(0x3a2a1a); g.fillRect(8, 38, 8, 3); g.fillRect(16, 38, 8, 3);
    g.generateTexture('seker-aga', 32, 42);

    // Baklava tray
    g.clear();
    g.fillStyle(0xCD853F); g.fillRect(0, 4, 40, 6); // tray
    g.fillStyle(0xB8860B); g.fillRect(2, 5, 36, 4);
    // Baklava pieces
    g.fillStyle(0xDAA520);
    for (let i = 0; i < 5; i++) {
        g.fillRect(4 + i * 7, 1, 6, 5);
        g.fillStyle(0xFFD700); g.fillRect(5 + i * 7, 2, 4, 2);
        g.fillStyle(0xDAA520);
    }
    g.generateTexture('baklava', 40, 12);

    // Clean up
    g.destroy();
}
