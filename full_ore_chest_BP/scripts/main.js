/**
 * Full Ore Chest Addon - Main Script
 * Sistema que preenche automaticamente baús com minérios
 * Compatível com Minecraft Bedrock 1.21.132+
 * 
 * @version 1.1.0
 * @author YourName
 * @license MIT
 */

import { world, system, ItemStack } from '@minecraft/server';

// ==================== CONFIGURAÇÕES GLOBAIS ====================

const CONFIG = {
  // Quantidade de itens por stack
  STACK_SIZE: 64,
  
  // Número de slots no baú (máx: 27 para baú simples)
  CHEST_SLOTS: 27,
  
  // Delay (em ticks) antes de preencher o baú após colocação
  FILL_DELAY: 5,
  
  // Timeout (em ms) para limpar baús não colocados da fila
  QUEUE_TIMEOUT: 10000,
  
  // Intervalo (em ticks) para executar limpeza da fila
  CLEANUP_INTERVAL: 200,
  
  // Ativar logs detalhados no console
  DEBUG_MODE: false,
  
  // Ativar efeitos visuais e sonoros
  ENABLE_EFFECTS: true,
  
  // Ativar comandos de teste
  ENABLE_TEST_COMMANDS: true
};

// Configuração dos tipos de baú e seus conteúdos
const CHEST_CONFIGS = {
  'addons:chest_iron': {
    itemType: 'minecraft:iron_ingot',
    displayName: '§7Baú de Ferro Cheio',
    particleColor: '§7',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: CONFIG.STACK_SIZE
  },
  'addons:chest_gold': {
    itemType: 'minecraft:gold_ingot',
    displayName: '§6Baú de Ouro Cheio',
    particleColor: '§6',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: CONFIG.STACK_SIZE
  },
  'addons:chest_diamond': {
    itemType: 'minecraft:diamond',
    displayName: '§bBaú de Diamante Cheio',
    particleColor: '§b',
    particleType: 'minecraft:enchanting_table_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: CONFIG.STACK_SIZE
  },
  'addons:chest_coal': {
    itemType: 'minecraft:coal',
    displayName: '§8Baú de Carvão Cheio',
    particleColor: '§8',
    particleType: 'minecraft:critical_hit_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: CONFIG.STACK_SIZE
  },
  'addons:chest_netherite': {
    itemType: 'minecraft:netherite_ingot',
    displayName: '§5Baú de Netherite Cheio',
    particleColor: '§5',
    particleType: 'minecraft:soul_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: CONFIG.STACK_SIZE
  },
  'addons:chest_emerald': {
    itemType: 'minecraft:emerald',
    displayName: '§aБaú de Esmeralda Cheio',
    particleColor: '§a',
    particleType: 'minecraft:villager_happy',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: CONFIG.STACK_SIZE
  },
  'addons:chest_copper': {
    itemType: 'minecraft:copper_ingot',
    displayName: '§cBaú de Cobre Cheio',
    particleColor: '§c',
    particleType: 'minecraft:lava_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: CONFIG.STACK_SIZE
  },
  
  // ===== BLOCOS DE MINÉRIOS =====
  'addons:chest_iron_block': {
    itemType: 'minecraft:iron_block',
    displayName: '§7Baú de Bloco de Ferro',
    particleColor: '§7',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_gold_block': {
    itemType: 'minecraft:gold_block',
    displayName: '§6Baú de Bloco de Ouro',
    particleColor: '§6',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_diamond_block': {
    itemType: 'minecraft:diamond_block',
    displayName: '§bBaú de Bloco de Diamante',
    particleColor: '§b',
    particleType: 'minecraft:enchanting_table_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_emerald_block': {
    itemType: 'minecraft:emerald_block',
    displayName: '§aBaú de Bloco de Esmeralda',
    particleColor: '§a',
    particleType: 'minecraft:villager_happy',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_netherite_block': {
    itemType: 'minecraft:netherite_block',
    displayName: '§5Baú de Bloco de Netherite',
    particleColor: '§5',
    particleType: 'minecraft:soul_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  
  // ===== MADEIRAS =====
  'addons:chest_oak_log': {
    itemType: 'minecraft:oak_log',
    displayName: '§eBaú de Tronco de Carvalho',
    particleColor: '§e',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_birch_log': {
    itemType: 'minecraft:birch_log',
    displayName: '§fBaú de Tronco de Bétula',
    particleColor: '§f',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_spruce_log': {
    itemType: 'minecraft:spruce_log',
    displayName: '§8Baú de Tronco de Pinheiro',
    particleColor: '§8',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_jungle_log': {
    itemType: 'minecraft:jungle_log',
    displayName: '§2Baú de Tronco da Selva',
    particleColor: '§2',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_acacia_log': {
    itemType: 'minecraft:acacia_log',
    displayName: '§6Baú de Tronco de Acácia',
    particleColor: '§6',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_dark_oak_log': {
    itemType: 'minecraft:dark_oak_log',
    displayName: '§8Baú de Tronco de Carvalho Escuro',
    particleColor: '§8',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  
  // ===== FLORES =====
  'addons:chest_poppy': {
    itemType: 'minecraft:poppy',
    displayName: '§cBaú de Papoulas',
    particleColor: '§c',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_dandelion': {
    itemType: 'minecraft:dandelion',
    displayName: '§eBaú de Dentes-de-leão',
    particleColor: '§e',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_blue_orchid': {
    itemType: 'minecraft:blue_orchid',
    displayName: '§9Baú de Orquídeas Azuis',
    particleColor: '§9',
    particleType: 'minecraft:villager_happy',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_allium': {
    itemType: 'minecraft:allium',
    displayName: '§dBaú de Allium',
    particleColor: '§d',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_tulip': {
    itemType: 'minecraft:red_tulip',
    displayName: '§cBaú de Tulipas Vermelhas',
    particleColor: '§c',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_oxeye_daisy': {
    itemType: 'minecraft:oxeye_daisy',
    displayName: '§fBaú de Margaridas',
    particleColor: '§f',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_cornflower': {
    itemType: 'minecraft:cornflower',
    displayName: '§9Baú de Centáureas',
    particleColor: '§9',
    particleType: 'minecraft:villager_happy',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_lily_valley': {
    itemType: 'minecraft:lily_of_the_valley',
    displayName: '§fBaú de Lírio do Vale',
    particleColor: '§f',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_sunflower': {
    itemType: 'minecraft:sunflower',
    displayName: '§eBaú de Girassóis',
    particleColor: '§e',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_rose_bush': {
    itemType: 'minecraft:rose_bush',
    displayName: '§cBaú de Roseiras',
    particleColor: '§c',
    particleType: 'minecraft:villager_happy',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  // === PEDRAS ===
  'addons:chest_cobblestone': {
    itemType: 'minecraft:cobblestone',
    displayName: '§7Baú de Pedregulho',
    particleColor: '§7',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_stone': {
    itemType:  'minecraft:stone',
    displayName: '§7Baú de Pedra',
    particleColor: '§7',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_granite': {
    itemType: 'minecraft:granite',
    displayName: '§cBaú de Granito',
    particleColor: '§c',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_diorite': {
    itemType: 'minecraft:diorite',
    displayName: '§fBaú de Diorito',
    particleColor: '§f',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_andesite': {
    itemType: 'minecraft:andesite',
    displayName: '§8Baú de Andesito',
    particleColor: '§8',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_calcite': {
    itemType: 'minecraft:calcite',
    displayName: '§fBaú de Calcita',
    particleColor: '§f',
    particleType: 'minecraft:villager_happy',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_tuff': {
    itemType: 'minecraft:tuff',
    displayName: '§7Baú de Tufo',
    particleColor: '§7',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_deepslate': {
    itemType: 'minecraft:deepslate',
    displayName: '§8Baú de Ardósia',
    particleColor: '§8',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_basalt': {
    itemType: 'minecraft:basalt',
    displayName: '§8Baú de Basalto',
    particleColor: '§8',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_blackstone': {
    itemType: 'minecraft:blackstone',
    displayName: '§0Baú de Pedra Negra',
    particleColor: '§0',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  // === NETHER ===
  'addons:chest_netherrack': {
    itemType: 'minecraft:netherrack',
    displayName: '§cBaú de Netherrack',
    particleColor: '§c',
    particleType: 'minecraft:lava_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_soul_sand': {
    itemType: 'minecraft:soul_sand',
    displayName: '§5Baú de Areia das Almas',
    particleColor: '§5',
    particleType: 'minecraft:soul_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_soul_soil': {
    itemType: 'minecraft:soul_soil',
    displayName: '§5Baú de Solo das Almas',
    particleColor: '§5',
    particleType: 'minecraft:soul_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_glowstone': {
    itemType: 'minecraft:glowstone',
    displayName: '§eBaú de Pedra Luminosa',
    particleColor: '§e',
    particleType: 'minecraft:obsidian_glow_dust_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_nether_brick': {
    itemType: 'minecraft:nether_brick',
    displayName: '§4Baú de Tijolo do Nether',
    particleColor: '§4',
    particleType: 'minecraft:lava_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_quartz': {
    itemType: 'minecraft:quartz',
    displayName: '§fBaú de Quartzo',
    particleColor: '§f',
    particleType: 'minecraft:villager_happy',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_crimson_planks': {
    itemType: 'minecraft:crimson_planks',
    displayName: '§4Baú de Tábuas Carmesim',
    particleColor: '§4',
    particleType: 'minecraft:villager_angry',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_warped_planks': {
    itemType: 'minecraft:warped_planks',
    displayName: '§3Baú de Tábuas Distorcidas',
    particleColor: '§3',
    particleType: 'minecraft:water_splash_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  // === END ===
  'addons:chest_end_stone': {
    itemType: 'minecraft:end_stone',
    displayName: '§eBaú de Pedra do End',
    particleColor: '§e',
    particleType: 'minecraft:obsidian_tear_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_purpur_block': {
    itemType: 'minecraft:purpur_block',
    displayName: '§dBaú de Bloco de Purpur',
    particleColor: '§d',
    particleType: 'minecraft:portal_reverse_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_chorus_fruit': {
    itemType: 'minecraft:chorus_fruit',
    displayName: '§dBaú de Fruta Chorus',
    particleColor: '§d',
    particleType: 'minecraft:portal_reverse_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_ender_pearl': {
    itemType: 'minecraft:ender_pearl',
    displayName: '§3Baú de Pérola do End',
    particleColor: '§3',
    particleType: 'minecraft:portal_directional',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 16
  },
  // === MINERAIS ===
  'addons:chest_redstone': {
    itemType: 'minecraft:redstone',
    displayName: '§cBaú de Redstone',
    particleColor: '§c',
    particleType: 'minecraft:redstone_ore_dust_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_lapis_lazuli': {
    itemType: 'minecraft:lapis_lazuli',
    displayName: '§1Baú de Lápis-Lazúli',
    particleColor: '§1',
    particleType: 'minecraft:water_drip_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_amethyst_shard': {
    itemType: 'minecraft:amethyst_shard',
    displayName: '§dBaú de Fragmento de Ametista',
    particleColor: '§d',
    particleType: 'minecraft:obsidian_tear_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  // === CONSTRUÇÃO ===
  'addons:chest_obsidian': {
    itemType: 'minecraft:obsidian',
    displayName: '§5Baú de Obsidiana',
    particleColor: '§5',
    particleType: 'minecraft:obsidian_glow_dust_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_glass': {
    itemType: 'minecraft:glass',
    displayName: '§fBaú de Vidro',
    particleColor: '§f',
    particleType: 'minecraft:villager_happy',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_brick': {
    itemType: 'minecraft:brick',
    displayName: '§cBaú de Tijolos',
    particleColor: '§c',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_terracotta': {
    itemType: 'minecraft:terracotta',
    displayName: '§6Baú de Terracota',
    particleColor: '§6',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_wool': {
    itemType: 'minecraft:wool',
    displayName: '§fBaú de Lã',
    particleColor: '§f',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  // === ALIMENTOS ===
  'addons:chest_apple': {
    itemType: 'minecraft:apple',
    displayName: '§cBaú de Maçãs',
    particleColor: '§c',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_carrot': {
    itemType: 'minecraft:carrot',
    displayName: '§6Baú de Cenouras',
    particleColor: '§6',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_potato': {
    itemType: 'minecraft:potato',
    displayName: '§eBaú de Batatas',
    particleColor: '§e',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_wheat': {
    itemType: 'minecraft:wheat',
    displayName: '§eBaú de Trigo',
    particleColor: '§e',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  // === DROPS DE MOBS ===
  'addons:chest_gunpowder': {
    itemType: 'minecraft:gunpowder',
    displayName: '§8Baú de Pólvora',
    particleColor: '§8',
    particleType: 'minecraft:campfire_smoke_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_bone': {
    itemType: 'minecraft:bone',
    displayName: '§fBaú de Ossos',
    particleColor: '§f',
    particleType: 'minecraft:bleach',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_string': {
    itemType: 'minecraft:string',
    displayName: '§fBaú de Linhas',
    particleColor: '§f',
    particleType: 'minecraft:villager_happy',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_slime_ball': {
    itemType: 'minecraft:slime_ball',
    displayName: '§aBaú de Bolas de Slime',
    particleColor: '§a',
    particleType: 'minecraft:water_splash_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_spider_eye': {
    itemType: 'minecraft:spider_eye',
    displayName: '§4Baú de Olhos de Aranha',
    particleColor: '§4',
    particleType: 'minecraft:redstone_ore_dust_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_rotten_flesh': {
    itemType: 'minecraft:rotten_flesh',
    displayName: '§2Baú de Carne Podre',
    particleColor: '§2',
    particleType: 'minecraft:villager_angry',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_phantom_membrane': {
    itemType: 'minecraft:phantom_membrane',
    displayName: '§bBaú de Membranas de Phantom',
    particleColor: '§b',
    particleType: 'minecraft:soul_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_blaze_rod': {
    itemType: 'minecraft:blaze_rod',
    displayName: '§6Baú de Varas de Blaze',
    particleColor: '§6',
    particleType: 'minecraft:lava_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_ghast_tear': {
    itemType: 'minecraft:ghast_tear',
    displayName: '§fBaú de Lágrimas de Ghast',
    particleColor: '§f',
    particleType: 'minecraft:water_drip_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_prismarine_shard': {
    itemType: 'minecraft:prismarine_shard',
    displayName: '§3Baú de Fragmentos de Prismarinho',
    particleColor: '§3',
    particleType: 'minecraft:water_splash_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  // === AQUÁTICOS ===
  'addons:chest_prismarine': {
    itemType: 'minecraft:prismarine',
    displayName: '§3Baú de Prismarinho',
    particleColor: '§3',
    particleType: 'minecraft:water_splash_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_sea_lantern': {
    itemType: 'minecraft:sea_lantern',
    displayName: '§bBaú de Lanterna do Mar',
    particleColor: '§b',
    particleType: 'minecraft:water_drip_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_sponge': {
    itemType: 'minecraft:sponge',
    displayName: '§eBaú de Esponjas',
    particleColor: '§e',
    particleType: 'minecraft:water_splash_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_ice': {
    itemType: 'minecraft:ice',
    displayName: '§bBaú de Gelo',
    particleColor: '§b',
    particleType: 'minecraft:blue_flame_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_packed_ice': {
    itemType: 'minecraft:packed_ice',
    displayName: '§9Baú de Gelo Compactado',
    particleColor: '§9',
    particleType: 'minecraft:ice_evaporation_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  // === TERRENO ===
  'addons:chest_sandstone': {
    itemType: 'minecraft:sandstone',
    displayName: '§eBaú de Arenito',
    particleColor: '§e',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_sand': {
    itemType: 'minecraft:sand',
    displayName: '§eBaú de Areia',
    particleColor: '§e',
    particleType: 'minecraft:falling_dust_scaffolding_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_clay': {
    itemType: 'minecraft:clay',
    displayName: '§7Baú de Argila',
    particleColor: '§7',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_mud': {
    itemType: 'minecraft:mud',
    displayName: '§8Baú de Lama',
    particleColor: '§8',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_gravel': {
    itemType: 'minecraft:gravel',
    displayName: '§7Baú de Cascalho',
    particleColor: '§7',
    particleType: 'minecraft:falling_dust_scaffolding_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  // === TIJOLOS ===
  'addons:chest_stone_bricks': {
    itemType: 'minecraft:stonebrick',
    displayName: '§7Baú de Tijolos de Pedra',
    particleColor: '§7',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_mossy_stone_bricks': {
    itemType: 'minecraft:mossy_stonebrick',
    displayName: '§2Baú de Tijolos de Pedra Musgosos',
    particleColor: '§2',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_cracked_stone_bricks': {
    itemType: 'minecraft:cracked_stonebrick',
    displayName: '§8Baú de Tijolos de Pedra Rachados',
    particleColor: '§8',
    particleType: 'minecraft:falling_dust_concrete_powder_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_prismarine_bricks': {
    itemType: 'minecraft:prismarine_bricks',
    displayName: '§3Baú de Tijolos de Prismarinho',
    particleColor: '§3',
    particleType: 'minecraft:water_splash_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_end_bricks': {
    itemType: 'minecraft:end_bricks',
    displayName: '§eBaú de Tijolos do End',
    particleColor: '§e',
    particleType: 'minecraft:portal_reverse_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_nether_bricks': {
    itemType: 'minecraft:nether_brick_block',
    displayName: '§4Baú de Tijolos do Nether',
    particleColor: '§4',
    particleType: 'minecraft:lava_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_red_nether_bricks': {
    itemType: 'minecraft:red_nether_brick',
    displayName: '§cBaú de Tijolos do Nether Vermelhos',
    particleColor: '§c',
    particleType: 'minecraft:lava_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  // === BLOCOS ESPECIAIS ===
  'addons:chest_magma': {
    itemType: 'minecraft:magma',
    displayName: '§6Baú de Magma',
    particleColor: '§6',
    particleType: 'minecraft:lava_particle',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_hay': {
    itemType: 'minecraft:hay_block',
    displayName: '§eBaú de Feno',
    particleColor: '§e',
    particleType: 'minecraft:crop_growth_emitter',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  },
  'addons:chest_bone_block': {
    itemType: 'minecraft:bone_block',
    displayName: '§fBaú de Blocos de Osso',
    particleColor: '§f',
    particleType: 'minecraft:bleach',
    slots: CONFIG.CHEST_SLOTS,
    stackSize: 64
  }
};

// ==================== GERENCIAMENTO DE ESTADO ====================

// Armazena baús que foram colocados e precisam ser preenchidos
const chestsToFill = new Map();

// Estatísticas do addon (opcional para debug/analytics)
const stats = {
  chestsPlaced: 0,
  chestsFilled: 0,
  errors: 0,
  startTime: Date.now()
};

// ==================== FUNÇÕES AUXILIARES ====================

/**
 * Log centralizado com níveis
 * @param {string} level - Nível do log (INFO, WARN, ERROR, DEBUG)
 * @param {string} message - Mensagem a ser logada
 * @param {any} data - Dados adicionais
 */
function log(level, message, data = null) {
  const prefix = `[Full Ore Chest]`;
  const timestamp = new Date().toISOString();
  
  if (level === 'DEBUG' && !CONFIG.DEBUG_MODE) return;
  
  const fullMessage = data 
    ? `${prefix} [${level}] ${message} | ${JSON.stringify(data)}`
    : `${prefix} [${level}] ${message}`;
  
  if (level === 'ERROR') {
    console.error(fullMessage);
  } else if (level === 'WARN') {
    console.warn(fullMessage);
  } else {
    console.warn(fullMessage);
  }
}

/**
 * Valida se um bloco é um baú válido
 * @param {Block} block - Bloco a ser validado
 * @returns {boolean}
 */
function isValidChest(block) {
  if (!block || !block.typeId) return false;
  return block.typeId === 'minecraft:chest';
}

/**
 * Valida se um jogador tem permissão para usar o addon
 * @param {Player} player - Jogador a ser validado
 * @returns {boolean}
 */
function hasPermission(player) {
  // Por padrão, todos têm permissão
  // Pode ser customizado para verificar tags, etc
  return player && player.isValid();
}

/**
 * Gera uma chave única para localização de bloco
 * @param {Vector3} location - Localização do bloco
 * @returns {string}
 */
function getLocationKey(location) {
  return `${Math.floor(location.x)},${Math.floor(location.y)},${Math.floor(location.z)}`;
}

// ==================== LISTENERS DE EVENTOS ====================

/**
 * Detecta quando um jogador usa um item (coloca um baú)
 */
function setupItemUseListener() {
  world.beforeEvents.itemUse.subscribe((event) => {
    const { source, itemStack } = event;
    
    if (!itemStack || !hasPermission(source)) return;
    
    const itemTypeId = itemStack.typeId;
    
    // Verifica se é um dos baús especiais
    for (const [tagName, config] of Object.entries(CHEST_CONFIGS)) {
      if (itemTypeId.includes(tagName.split(':')[1])) {
        try {
          // Obtém a localização onde o bloco será colocado
          const blockFromView = source.getBlockFromViewDirection();
          if (!blockFromView || !blockFromView.block) continue;
          
          const targetLocation = blockFromView.block.location;
          
          // Calcula a posição onde o baú será colocado
          const face = blockFromView.face;
          const offset = getOffsetFromFace(face);
          const finalLocation = {
            x: targetLocation.x + offset.x,
            y: targetLocation.y + offset.y,
            z: targetLocation.z + offset.z
          };
          
          const locationKey = getLocationKey(finalLocation);
          
          // Adiciona à fila de preenchimento
          chestsToFill.set(locationKey, {
            config: config,
            player: source,
            timestamp: Date.now(),
            itemTypeId: itemTypeId
          });
          
          log('DEBUG', 'Baú adicionado à fila', { locationKey, type: tagName });
          
        } catch (error) {
          log('ERROR', 'Erro ao processar uso de item', { error: error.message });
          stats.errors++;
        }
      }
    }
  });
}

/**
 * Retorna o offset baseado na face do bloco
 * @param {string} face - Face do bloco
 * @returns {Vector3}
 */
function getOffsetFromFace(face) {
  const offsets = {
    'North': { x: 0, y: 0, z: -1 },
    'South': { x: 0, y: 0, z: 1 },
    'East': { x: 1, y: 0, z: 0 },
    'West': { x: -1, y: 0, z: 0 },
    'Up': { x: 0, y: 1, z: 0 },
    'Down': { x: 0, y: -1, z: 0 }
  };
  return offsets[face] || { x: 0, y: 0, z: 0 };
}

/**
 * Detecta quando um bloco é colocado (baú)
 */
function setupBlockPlaceListener() {
  world.afterEvents.playerPlaceBlock.subscribe((event) => {
    const { block, player } = event;
    
    try {
      // Verifica se é um baú
      if (!isValidChest(block)) return;
      
      const locationKey = getLocationKey(block.location);
      
      log('DEBUG', 'Baú colocado, verificando fila', { locationKey });
      
      // Verifica se este baú está na lista para ser preenchido
      if (chestsToFill.has(locationKey)) {
        const chestData = chestsToFill.get(locationKey);
        
        stats.chestsPlaced++;
        
        // Agenda preenchimento para próximo tick
        system.runTimeout(() => {
          fillChestWithOre(block, chestData.config, player);
        }, CONFIG.FILL_DELAY);
        
        // Remove da fila
        chestsToFill.delete(locationKey);
        log('DEBUG', 'Baú removido da fila e agendado para preenchimento', { locationKey });
      }
    } catch (error) {
      log('ERROR', 'Erro ao processar colocação de bloco', { error: error.message });
      stats.errors++;
    }
  });
}

/**
 * Preenche o baú com os minérios
 */
function fillChestWithOre(block, config, player) {
  try {
    // Valida se o bloco ainda existe e é um baú
    if (!block || !isValidChest(block)) {
      log('WARN', 'Bloco não é mais um baú válido');
      player.sendMessage('§cErro: Baú não encontrado!');
      return;
    }
    
    // Tenta obter o container do baú
    const inventoryComponent = block.getComponent('inventory');
    if (!inventoryComponent || !inventoryComponent.container) {
      log('ERROR', 'Não foi possível acessar o inventário do baú');
      player.sendMessage('§cErro: Não foi possível acessar o baú! Tente novamente.');
      stats.errors++;
      return;
    }
    
    const container = inventoryComponent.container;
    
    // Valida se o container tem o tamanho esperado
    if (container.size < config.slots) {
      log('WARN', 'Container menor que esperado', { size: container.size, expected: config.slots });
    }
    
    // Preenche todos os slots do baú
    const itemStack = new ItemStack(config.itemType, config.stackSize);
    let filledSlots = 0;
    let failedSlots = 0;
    
    for (let i = 0; i < Math.min(config.slots, container.size); i++) {
      try {
        container.setItem(i, itemStack);
        filledSlots++;
      } catch (e) {
        // Se houver erro, registra e tenta o próximo slot
        failedSlots++;
        log('DEBUG', `Falha ao preencher slot ${i}`, { error: e.message });
        continue;
      }
    }
    
    // Verifica se conseguiu preencher ao menos alguns slots
    if (filledSlots === 0) {
      player.sendMessage('§cErro: Não foi possível preencher nenhum slot do baú!');
      log('ERROR', 'Nenhum slot foi preenchido');
      stats.errors++;
      return;
    }
    
    stats.chestsFilled++;
    
    // Mensagem de sucesso com detalhes
    const totalItems = filledSlots * config.stackSize;
    player.sendMessage(`${config.particleColor}✔ ${config.displayName} preenchido!`);
    player.sendMessage(`§7└─ ${filledSlots} slots × ${config.stackSize} = §f${totalItems} itens`);
    
    if (failedSlots > 0) {
      player.sendMessage(`§e⚠ ${failedSlots} slots não puderam ser preenchidos`);
    }
    
    // Efeitos visuais e sonoros
    if (CONFIG.ENABLE_EFFECTS) {
      playChestEffects(block, player, config);
    }
    
    log('INFO', 'Baú preenchido com sucesso', { 
      type: config.displayName, 
      slots: filledSlots,
      failed: failedSlots 
    });
    
  } catch (error) {
    player.sendMessage(`§cErro crítico ao preencher baú: ${error.message}`);
    log('ERROR', 'Erro crítico no fillChestWithOre', { error: error.message, stack: error.stack });
    stats.errors++;
  }
}

/**
 * Adiciona efeitos visuais e sonoros
 */
function playChestEffects(block, player, config) {
  try {
    const { x, y, z } = block.location;
    const dimension = block.dimension;
    
    // Múltiplas partículas baseadas no tipo do baú
    const particleType = config.particleType || 'minecraft:enchanting_table_particle';
    
    // Partículas em círculo ao redor do baú
    for (let angle = 0; angle < 360; angle += 45) {
      const rad = angle * (Math.PI / 180);
      const offsetX = Math.cos(rad) * 0.5;
      const offsetZ = Math.sin(rad) * 0.5;
      
      system.runTimeout(() => {
        try {
          dimension.spawnParticle(particleType, {
            x: x + 0.5 + offsetX,
            y: y + 0.8,
            z: z + 0.5 + offsetZ
          });
        } catch (e) {
          log('DEBUG', 'Erro ao spawnar partícula', { error: e.message });
        }
      }, angle / 45);
    }
    
    // Partícula central mais intensa
    dimension.spawnParticle('minecraft:villager_happy', {
      x: x + 0.5,
      y: y + 1.2,
      z: z + 0.5
    });
    
    // Som de experiência
    player.playSound('random.orb', { volume: 0.5, pitch: 1.2 });
    
    // Som de baú abrindo (atrasado)
    system.runTimeout(() => {
      try {
        player.playSound('random.chestopen', { volume: 0.3, pitch: 1.0 });
      } catch (e) {
        log('DEBUG', 'Erro ao tocar som', { error: e.message });
      }
    }, 10);
    
    // Som de nível up (se for baú raro)
    if (['diamond', 'netherite', 'emerald'].some(type => config.displayName.includes(type))) {
      system.runTimeout(() => {
        try {
          player.playSound('random.levelup', { volume: 0.2, pitch: 1.5 });
        } catch (e) {
          log('DEBUG', 'Erro ao tocar som especial', { error: e.message });
        }
      }, 15);
    }
    
  } catch (error) {
    log('WARN', 'Erro ao adicionar efeitos', { error: error.message });
  }
}

/**
 * Sistema de limpeza de baús antigos na fila
 */
function setupCleanupSystem() {
  system.runInterval(() => {
    const now = Date.now();
    let cleanedCount = 0;
    
    for (const [key, data] of chestsToFill.entries()) {
      if (now - data.timestamp > CONFIG.QUEUE_TIMEOUT) {
        chestsToFill.delete(key);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      log('DEBUG', `Limpeza de fila: ${cleanedCount} itens expirados removidos`);
    }
    
    // Log periódico de estatísticas (a cada ~5 minutos em modo debug)
    if (CONFIG.DEBUG_MODE && (now - stats.startTime) % 300000 < CONFIG.CLEANUP_INTERVAL * 50) {
      logStats();
    }
  }, CONFIG.CLEANUP_INTERVAL);
}

/**
 * Exibe estatísticas do addon
 */
function logStats() {
  const uptime = Math.floor((Date.now() - stats.startTime) / 1000);
  log('INFO', '=== Estatísticas do Addon ===');
  log('INFO', `Uptime: ${uptime}s`);
  log('INFO', `Baús colocados: ${stats.chestsPlaced}`);
  log('INFO', `Baús preenchidos: ${stats.chestsFilled}`);
  log('INFO', `Erros: ${stats.errors}`);
  log('INFO', `Baús na fila: ${chestsToFill.size}`);
  log('INFO', '============================');
}

/**
 * Comando de teste para dar baús aos jogadores
 */
function setupTestCommands() {
  if (!CONFIG.ENABLE_TEST_COMMANDS) {
    log('INFO', 'Comandos de teste desativados');
    return;
  }
  
  world.beforeEvents.chatSend.subscribe((event) => {
    const { sender, message } = event;
    
    // Comando para obter baús
    if (message.startsWith('!getchest')) {
      event.cancel = true;
      
      const args = message.split(' ');
      const chestType = args[1]?.toLowerCase() || 'iron';
      const amount = Math.min(parseInt(args[2]) || 1, 64);
      
      const itemMap = {
        // Minérios
        'iron': 'addons:chest_iron_full',
        'gold': 'addons:chest_gold_full',
        'diamond': 'addons:chest_diamond_full',
        'coal': 'addons:chest_coal_full',
        'netherite': 'addons:chest_netherite_full',
        'emerald': 'addons:chest_emerald_full',
        'copper': 'addons:chest_copper_full',
        // Blocos de Minérios
        'iron_block': 'addons:chest_iron_block_full',
        'ironblock': 'addons:chest_iron_block_full',
        'gold_block': 'addons:chest_gold_block_full',
        'goldblock': 'addons:chest_gold_block_full',
        'diamond_block': 'addons:chest_diamond_block_full',
        'diamondblock': 'addons:chest_diamond_block_full',
        'emerald_block': 'addons:chest_emerald_block_full',
        'emeraldblock': 'addons:chest_emerald_block_full',
        'netherite_block': 'addons:chest_netherite_block_full',
        'netheriteblock': 'addons:chest_netherite_block_full',
        // Madeiras
        'oak': 'addons:chest_oak_log_full',
        'oak_log': 'addons:chest_oak_log_full',
        'birch': 'addons:chest_birch_log_full',
        'birch_log': 'addons:chest_birch_log_full',
        'spruce': 'addons:chest_spruce_log_full',
        'spruce_log': 'addons:chest_spruce_log_full',
        'jungle': 'addons:chest_jungle_log_full',
        'jungle_log': 'addons:chest_jungle_log_full',
        'acacia': 'addons:chest_acacia_log_full',
        'acacia_log': 'addons:chest_acacia_log_full',
        'dark_oak': 'addons:chest_dark_oak_log_full',
        'darkoak': 'addons:chest_dark_oak_log_full',
        // Flores
        'poppy': 'addons:chest_poppy_full',
        'dandelion': 'addons:chest_dandelion_full',
        'blue_orchid': 'addons:chest_blue_orchid_full',
        'orchid': 'addons:chest_blue_orchid_full',
        'allium': 'addons:chest_allium_full',
        'tulip': 'addons:chest_tulip_full',
        'daisy': 'addons:chest_oxeye_daisy_full',
        'oxeye': 'addons:chest_oxeye_daisy_full',
        'cornflower': 'addons:chest_cornflower_full',
        'lily': 'addons:chest_lily_valley_full',
        'lily_valley': 'addons:chest_lily_valley_full',
        'sunflower': 'addons:chest_sunflower_full',
        'rose': 'addons:chest_rose_bush_full',
        'rose_bush': 'addons:chest_rose_bush_full',
        // Pedras
        'cobblestone': 'addons:chest_cobblestone_full',
        'cobble': 'addons:chest_cobblestone_full',
        'stone': 'addons:chest_stone_full',
        'granite': 'addons:chest_granite_full',
        'diorite': 'addons:chest_diorite_full',
        'andesite': 'addons:chest_andesite_full',
        'calcite': 'addons:chest_calcite_full',
        'tuff': 'addons:chest_tuff_full',
        'deepslate': 'addons:chest_deepslate_full',
        'basalt': 'addons:chest_basalt_full',
        'blackstone': 'addons:chest_blackstone_full',
        // Nether
        'netherrack': 'addons:chest_netherrack_full',
        'soul_sand': 'addons:chest_soul_sand_full',
        'soulsand': 'addons:chest_soul_sand_full',
        'soul_soil': 'addons:chest_soul_soil_full',
        'soulsoil': 'addons:chest_soul_soil_full',
        'glowstone': 'addons:chest_glowstone_full',
        'nether_brick': 'addons:chest_nether_brick_full',
        'netherbrick': 'addons:chest_nether_brick_full',
        'quartz': 'addons:chest_quartz_full',
        'crimson_planks': 'addons:chest_crimson_planks_full',
        'crimson': 'addons:chest_crimson_planks_full',
        'warped_planks': 'addons:chest_warped_planks_full',
        'warped': 'addons:chest_warped_planks_full',
        // End
        'end_stone': 'addons:chest_end_stone_full',
        'endstone': 'addons:chest_end_stone_full',
        'purpur_block': 'addons:chest_purpur_block_full',
        'purpur': 'addons:chest_purpur_block_full',
        'chorus_fruit': 'addons:chest_chorus_fruit_full',
        'chorus': 'addons:chest_chorus_fruit_full',
        'ender_pearl': 'addons:chest_ender_pearl_full',
        'enderpearl': 'addons:chest_ender_pearl_full',
        'pearl': 'addons:chest_ender_pearl_full',
        // Minerais
        'redstone': 'addons:chest_redstone_full',
        'lapis_lazuli': 'addons:chest_lapis_lazuli_full',
        'lapis': 'addons:chest_lapis_lazuli_full',
        'amethyst_shard': 'addons:chest_amethyst_shard_full',
        'amethyst': 'addons:chest_amethyst_shard_full',
        // Construção
        'obsidian': 'addons:chest_obsidian_full',
        'glass': 'addons:chest_glass_full',
        'brick': 'addons:chest_brick_full',
        'terracotta': 'addons:chest_terracotta_full',
        'wool': 'addons:chest_wool_full',
        // Alimentos
        'apple': 'addons:chest_apple_full',
        'carrot': 'addons:chest_carrot_full',
        'potato': 'addons:chest_potato_full',
        'wheat': 'addons:chest_wheat_full',
        // Drops de Mobs
        'gunpowder': 'addons:chest_gunpowder_full',
        'bone': 'addons:chest_bone_full',
        'string': 'addons:chest_string_full',
        'slime_ball': 'addons:chest_slime_ball_full',
        'slime': 'addons:chest_slime_ball_full',
        'spider_eye': 'addons:chest_spider_eye_full',
        'rotten_flesh': 'addons:chest_rotten_flesh_full',
        'flesh': 'addons:chest_rotten_flesh_full',
        'phantom_membrane': 'addons:chest_phantom_membrane_full',
        'phantom': 'addons:chest_phantom_membrane_full',
        'blaze_rod': 'addons:chest_blaze_rod_full',
        'blaze': 'addons:chest_blaze_rod_full',
        'ghast_tear': 'addons:chest_ghast_tear_full',
        'ghast': 'addons:chest_ghast_tear_full',
        'prismarine_shard': 'addons:chest_prismarine_shard_full',
        // Aquáticos
        'prismarine': 'addons:chest_prismarine_full',
        'sea_lantern': 'addons:chest_sea_lantern_full',
        'sponge': 'addons:chest_sponge_full',
        'ice': 'addons:chest_ice_full',
        'packed_ice': 'addons:chest_packed_ice_full',
        'packedice': 'addons:chest_packed_ice_full',
        // Terreno
        'sandstone': 'addons:chest_sandstone_full',
        'sand': 'addons:chest_sand_full',
        'clay': 'addons:chest_clay_full',
        'mud': 'addons:chest_mud_full',
        'gravel': 'addons:chest_gravel_full',
        // Tijolos
        'stone_bricks': 'addons:chest_stone_bricks_full',
        'stonebricks': 'addons:chest_stone_bricks_full',
        'mossy_stone_bricks': 'addons:chest_mossy_stone_bricks_full',
        'mossy_bricks': 'addons:chest_mossy_stone_bricks_full',
        'cracked_stone_bricks': 'addons:chest_cracked_stone_bricks_full',
        'cracked_bricks': 'addons:chest_cracked_stone_bricks_full',
        'prismarine_bricks': 'addons:chest_prismarine_bricks_full',
        'end_bricks': 'addons:chest_end_bricks_full',
        'nether_bricks': 'addons:chest_nether_bricks_full',
        'netherbricks': 'addons:chest_nether_bricks_full',
        'red_nether_bricks': 'addons:chest_red_nether_bricks_full',
        'red_bricks': 'addons:chest_red_nether_bricks_full',
        // Blocos Especiais
        'magma': 'addons:chest_magma_full',
        'hay': 'addons:chest_hay_full',
        'hay_block': 'addons:chest_hay_full',
        'bone_block': 'addons:chest_bone_block_full'
      };
      
      const itemId = itemMap[chestType];
      
      if (itemId) {
        try {
          const item = new ItemStack(itemId, amount);
          sender.getComponent('inventory').container.addItem(item);
          sender.sendMessage(`§a✔ Você recebeu ${amount}x baú de ${chestType}!`);
          log('DEBUG', `Comando executado: ${sender.name} recebeu ${amount}x ${chestType}`);
        } catch (e) {
          sender.sendMessage('§cErro ao dar item: ' + e.message);
          log('ERROR', 'Erro ao executar comando getchest', { error: e.message });
        }
      } else {
        sender.sendMessage('§cTipo inválido!');
        sender.sendMessage('§7Categorias: §fminérios, blocos, madeiras, flores');
        sender.sendMessage('§7Use §f!tipos §7para ver lista completa');
        sender.sendMessage('§7Exemplo: §f!getchest diamond 5');
      }
    }
    
    // Comando para listar tipos
    if (message === '!tipos' || message === '!types') {
      event.cancel = true;
      sender.sendMessage('§e╔══════════════════════════════════╗');
      sender.sendMessage('§e║    §6TIPOS DE BAÚS (82)§e           ║');
      sender.sendMessage('§e╚══════════════════════════════════╝');
      sender.sendMessage('');
      sender.sendMessage('§6§l⛏ MINÉRIOS (7):');
      sender.sendMessage('§7iron, gold, diamond, coal,');
      sender.sendMessage('§7netherite, emerald, copper');
      sender.sendMessage('');
      sender.sendMessage('§6§l📦 BLOCOS DE MINÉRIOS (5):');
      sender.sendMessage('§7iron_block, gold_block, diamond_block,');
      sender.sendMessage('§7emerald_block, netherite_block');
      sender.sendMessage('');
      sender.sendMessage('§6§l🌳 MADEIRAS (6):');
      sender.sendMessage('§7oak, birch, spruce, jungle,');
      sender.sendMessage('§7acacia, dark_oak');
      sender.sendMessage('');
      sender.sendMessage('§6§l🌸 FLORES (10):');
      sender.sendMessage('§7poppy, dandelion, orchid, allium, tulip,');
      sender.sendMessage('§7daisy, cornflower, lily, sunflower, rose');
      sender.sendMessage('');
      sender.sendMessage('§6§l🗻 PEDRAS (10):');
      sender.sendMessage('§7cobblestone, stone, granite, diorite,');
      sender.sendMessage('§7andesite, calcite, tuff, deepslate,');
      sender.sendMessage('§7basalt, blackstone');
      sender.sendMessage('');
      sender.sendMessage('§6§l🔥 NETHER (8):');
      sender.sendMessage('§7netherrack, soul_sand, soul_soil,');
      sender.sendMessage('§7glowstone, nether_brick, quartz,');
      sender.sendMessage('§7crimson, warped');
      sender.sendMessage('');
      sender.sendMessage('§6§l🌌 END (4):');
      sender.sendMessage('§7end_stone, purpur, chorus, pearl');
      sender.sendMessage('');
      sender.sendMessage('§6§l💎 MINERAIS (3):');
      sender.sendMessage('§7redstone, lapis, amethyst');
      sender.sendMessage('');
      sender.sendMessage('§6§l🏗 CONSTRUÇÃO (5):');
      sender.sendMessage('§7obsidian, glass, brick, terracotta, wool');
      sender.sendMessage('');
      sender.sendMessage('§6§l🍎 ALIMENTOS (4):');
      sender.sendMessage('§7apple, carrot, potato, wheat');
      sender.sendMessage('');
      sender.sendMessage('§6§l💀 DROPS DE MOBS (10):');
      sender.sendMessage('§7gunpowder, bone, string, slime, spider_eye,');
      sender.sendMessage('§7flesh, phantom, blaze, ghast, prismarine_shard');
      sender.sendMessage('');
      sender.sendMessage('§6§l🌊 AQUÁTICOS (5):');
      sender.sendMessage('§7prismarine, sea_lantern, sponge,');
      sender.sendMessage('§7ice, packed_ice');
      sender.sendMessage('');
      sender.sendMessage('§6§l🏜 TERRENO (5):');
      sender.sendMessage('§7sandstone, sand, clay, mud, gravel');
      sender.sendMessage('');
      sender.sendMessage('§8Use: §f!getchest <tipo> [qtd]');
    }
    
    // Comando de ajuda
    if (message === '!help' || message === '!ajuda') {
      event.cancel = true;
      sender.sendMessage('§e╔═══════════════════════════════╗');
      sender.sendMessage('§e║ §6Full Ore Chest Addon v2.2.0 §e║');
      sender.sendMessage('§e╚═══════════════════════════════╝');
      sender.sendMessage('');
      sender.sendMessage('§6§lCrafting:');
      sender.sendMessage('§71 Baú + 1 Item = Baú Cheio');
      sender.sendMessage('§7📋 13 Categorias | 92 Tipos!');
      sender.sendMessage('');
      sender.sendMessage('§6§lComandos:');
      sender.sendMessage('§7!getchest <tipo> [qtd]');
      sender.sendMessage('§7  92 tipos em 13 categorias!');
      sender.sendMessage('§7  Exemplo: §f!getchest diamond 5');
      sender.sendMessage('');
      sender.sendMessage('§7!tipos §8- Lista completa (92 tipos)');
      sender.sendMessage('§7!stats §8- Ver estatísticas');
      sender.sendMessage('§7!help §8- Mostrar esta ajuda');
    }
    
    // Comando de estatísticas
    if (message === '!stats' || message === '!estatisticas') {
      event.cancel = true;
      const uptime = Math.floor((Date.now() - stats.startTime) / 1000);
      sender.sendMessage('§e═══ Estatísticas do Addon ═══');
      sender.sendMessage(`§7Tempo ativo: §f${uptime}s`);
      sender.sendMessage(`§7Baús colocados: §f${stats.chestsPlaced}`);
      sender.sendMessage(`§7Baús preenchidos: §f${stats.chestsFilled}`);
      sender.sendMessage(`§7Erros: §f${stats.errors}`);
      sender.sendMessage(`§7Na fila: §f${chestsToFill.size}`);
      sender.sendMessage('§e═══════════════════════════════');
    }
  });
}

// ==================== INICIALIZAÇÃO ====================

/**
 * Inicialização do addon
 */
function initialize() {
  try {
    log('INFO', '=== Iniciando Full Ore Chest Addon v1.1.0 ===');
    log('INFO', `Configuração: Debug=${CONFIG.DEBUG_MODE}, Effects=${CONFIG.ENABLE_EFFECTS}`);
    
    setupItemUseListener();
    log('INFO', 'Listener de uso de item configurado');
    
    setupBlockPlaceListener();
    log('INFO', 'Listener de colocação de bloco configurado');
    
    setupCleanupSystem();
    log('INFO', 'Sistema de limpeza configurado');
    
    setupTestCommands();
    log('INFO', 'Comandos de teste configurados');
    
    log('INFO', `Total de tipos de baú: ${Object.keys(CHEST_CONFIGS).length}`);
    
    // Mensagem de boas-vindas
    system.runTimeout(() => {
      world.sendMessage('§6╔════════════════════════════════════╗');
      world.sendMessage('§6║ §eФull Ore Chest §7v2.2.0 §aativo! §6║');
      world.sendMessage('§6╚════════════════════════════════════╝');
      world.sendMessage('§7Use §f!ajuda §7ou §f!tipos §7para comandos');
      world.sendMessage('§7✨ §e92 tipos§7 em §613 categorias§7!');
      world.sendMessage('§7⛏🌸🗻🔥🌌💎🏗🍎💀🌊🏜🧱⭐');
    }, 100);
    
    log('INFO', 'Addon inicializado com sucesso!');
    
  } catch (error) {
    log('ERROR', 'Falha crítica na inicialização', { error: error.message, stack: error.stack });
    world.sendMessage('§c[Full Ore Chest] Erro crítico ao inicializar! Verifique os logs.');
  }
}

// ==================== INÍCIO DO ADDON ====================

try {
  initialize();
} catch (error) {
  console.error('[Full Ore Chest] ERRO FATAL:', error);
  world.sendMessage('§4[Full Ore Chest] ERRO FATAL! Addon não foi carregado.');
}
