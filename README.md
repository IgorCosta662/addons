# 📦 Full Ore Chest Addon - Minecraft Bedrock 1.21.132

## 🎯 Descrição
Addon que adiciona baús especiais que já nascem totalmente preenchidos com minérios quando colocados no mundo!

### ✨ Características
- **28 tipos de baús**: Minérios, Blocos de Minérios, Madeiras e Flores!
- **27 stacks completos** (64 itens por slot) automaticamente
- **Efeitos visuais únicos** para cada tipo (partículas + sons)
- **Receitas simples**: 1 baú + 1 item = baú cheio
- **Sistema de estatísticas** para monitoramento
- **100% automático**: Basta colocar o baú e ele já vem preenchido!

### 📦 Categorias
- ⛏️ **Minérios**: Ferro, Ouro, Diamante, Carvão, Netherite, Esmeralda, Cobre
- 🧱 **Blocos**: Blocos de Ferro, Ouro, Diamante, Esmeralda, Netherite
- 🌳 **Madeiras**: Carvalho, Bétula, Pinheiro, Selva, Acácia, Carvalho Escuro
- 🌸 **Flores**: Papoula, Dente-de-leão, Orquídea, Tulipa, Margarida, Girassol e mais!

---

## 📋 Instalação

### Windows 10/11
1. Localize a pasta do Minecraft:
   ```
   %localappdata%\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang
   ```

2. Copie as pastas do addon:
   - `full_ore_chest_BP` → `behavior_packs\`
   - `full_ore_chest_RP` → `resource_packs\`

3. Abra o Minecraft Bedrock Edition

4. Crie um mundo novo (ou edite um existente):
   - Ative **Experimental Features** → **Beta APIs**
   - Ative **Experimental Features** → **Holiday Creator Features** (se disponível)
   - Em **Behavior Packs**, ative: `Full Ore Chest - Behavior Pack`
   - Em **Resource Packs**, ative: `Full Ore Chest - Resource Pack`

5. Entre no mundo e aproveite! 🎮

### Android
1. Transfira as pastas para:
   ```
   /sdcard/Android/data/com.mojang.minecraftpe/files/games/com.mojang/
   ```
   - `full_ore_chest_BP` → `behavior_packs\`
   - `full_ore_chest_RP` → `resource_packs\`

2. Abra o Minecraft e siga os passos 4-5 acima

### iOS
1. Use um app de gerenciamento de arquivos (ex: Documents by Readdle)
2. Navegue até:
   ```
   On My iPhone/Minecraft/games/com.mojang/
   ```
3. Transfira as pastas e siga os passos 4-5

---

## 🎮 Como Usar

### Crafting
Coloque na mesa de trabalho (qualquer ordem):

| Receita | Resultado |
|---------|-----------|
| 1 Baú + 1 Barra de Ferro | 🗃️ Baú de Ferro Cheio |
| 1 Baú + 1 Barra de Ouro | 🗃️ Baú de Ouro Cheio |
| 1 Baú + 1 Diamante | 🗃️ Baú de Diamante Cheio |
| 1 Baú + 1 Carvão | 🗃️ Baú de Carvão Cheio |
| 1 Baú + 1 Esmeralda | 🗃️ Baú de Esmeralda Cheio |
| 1 Baú + 1 Barra de Cobre | 🗃️ Baú de Cobre Cheio |
| 1 Baú + 1 Barra de Netherite | 🗃️ Baú de Netherite Cheio |

### Colocando o Baú
1. Pegue o baú especial craftado
2. Coloque-o no chão como um baú normal
3. ✨ **BOOM!** O baú já nasce com 27 stacks completos do item!

### Comandos (Teste)
- `!getchest <tipo> [qtd]` - Recebe baús de qualquer tipo
  - Exemplo: `!getchest diamond 5` - Recebe 5 baús de diamante
  - Exemplo: `!getchest oak 10` - Recebe 10 baús de carvalho
  - Exemplo: `!getchest poppy 3` - Recebe 3 baús de papoulas
- `!tipos` ou `!types` - Lista todos os tipos de baús disponíveis
- `!stats` - Mostra estatísticas do addon
- `!ajuda` ou `!help` - Mostra ajuda completa no chat

---

## ⚙️ Requisitos Técnicos

### Versão
- **Minecraft Bedrock Edition**: 1.21.0 ou superior
- **Testado em**: 1.21.132

### Configurações Obrigatórias
Ao criar/editar o mundo, ATIVE:
- ✅ **Beta APIs** (experimental)
- ✅ **Holiday Creator Features** (experimental)
- ✅ **Cheats** (apenas para usar comandos de teste)

---

## 🛠️ Estrutura do Addon

### Behavior Pack (`full_ore_chest_BP/`)
```
├── manifest.json              # Configuração do pack
├── pack_icon.png             # Ícone do pack (adicione uma imagem 256x256)
├── items/                    # Itens customizados
│   ├── chest_iron_full.json
│   ├── chest_gold_full.json
│   ├── chest_diamond_full.json
│   ├── chest_coal_full.json
│   └── chest_netherite_full.json
├── recipes/                  # Receitas de crafting
│   ├── chest_iron_full.json
│   ├── chest_gold_full.json
│   ├── chest_diamond_full.json
│   ├── chest_coal_full.json
│   └── chest_netherite_full.json
├── scripts/                  # Scripts JavaScript
│   └── main.js              # Lógica principal do addon
└── texts/                    # Traduções
    ├── en_US.lang
    └── pt_BR.lang
```

### Resource Pack (`full_ore_chest_RP/`)
```
├── manifest.json              # Configuração do pack
├── pack_icon.png             # Ícone do pack (adicione uma imagem 256x256)
├── textures/                 # Texturas
│   ├── item_texture.json    # Mapeamento de texturas
│   └── items/               # Texturas dos itens (adicione PNGs 16x16)
│       └── README.txt       # Instruções para texturas
└── texts/                    # Traduções
    ├── en_US.lang
    └── pt_BR.lang
```

---

## 🎨 Customização

### Adicionar Texturas
1. Crie imagens PNG 16x16 para cada baú
2. Nomeie como: `chest_iron_full.png`, `chest_gold_full.png`, etc.
3. Coloque em: `full_ore_chest_RP/textures/items/`
4. Use a textura do baú vanilla como base e adicione cores!

### Modificar Quantidade de Itens
Edite `full_ore_chest_BP/scripts/main.js`:
```javascript
// Linha ~15
slots: 27  // Altere para o número desejado (máx: 27)
```

### Adicionar Mais Minérios
1. Crie novo item JSON em `items/`
2. Crie nova receita em `recipes/`
3. Adicione configuração em `main.js` no objeto `CHEST_CONFIGS`

---

## 🐛 Troubleshooting

### O baú não preenche automaticamente
- ✅ Verifique se **Beta APIs** está ativado
- ✅ Certifique-se de que ambos os packs (BP e RP) estão ativos
- ✅ Espere 2-3 segundos após colocar o baú

### Receitas não aparecem
- ✅ Reinicie o Minecraft
- ✅ Verifique se o Behavior Pack está ativado
- ✅ Tente em um mundo novo

### Item não tem textura
- ✅ Adicione arquivos PNG em `textures/items/`
- ✅ Verifique se o Resource Pack está ativado
- ✅ Reinicie o jogo

### Script não funciona
- ✅ Ative **Beta APIs** nas configurações do mundo
- ✅ Verifique o log de erros no jogo
- ✅ Certifique-se de estar em um mundo com cheats ativados (para comandos)

---

## 📝 Changelog

### v1.2.0 (10/02/2026)
- ✨ **21 NOVOS TIPOS DE BAÚS**:
  - 🧱 5 Blocos de Minérios (iron_block, gold_block, diamond_block, emerald_block, netherite_block)
  - 🌳 6 Madeiras (oak, birch, spruce, jungle, acacia, dark_oak)
  - 🌸 10 Flores (poppy, dandelion, orchid, allium, tulip, daisy, cornflower, lily, sunflower, rose)
- 🎮 Novo comando `!tipos` para listar todos os baús
- 📊 Total de 28 tipos de baús em 4 categorias!
- 🔧 Sistema de mapeamento de comandos expandido
- 📝 42 novos arquivos JSON (items + recipes)

### v1.1.0 (10/02/2026)
- ✨ **Novos baús**: Esmeralda e Cobre
- 📊 Sistema de estatísticas (!stats)
- 🔧 Configurações centralizadas
- 🛡️ Validações robustas e tratamento de erros
- 🎨 Efeitos visuais aprimorados (partículas únicas por tipo)
- 📝 Sistema de logging detalhado
- 💬 Feedback melhorado (contador de itens)
- 🐛 Correção de bugs de sincronização
- ⚡ Performance otimizada

## 📝 Changelog

### v1.2.0 (10/02/2026)
- ✨ **21 NOVOS TIPOS DE BAÚS**:
  - 🧱 5 Blocos de Minérios (iron_block, gold_block, diamond_block, emerald_block, netherite_block)
  - 🌳 6 Madeiras (oak, birch, spruce, jungle, acacia, dark_oak)
  - 🌸 10 Flores (poppy, dandelion, orchid, allium, tulip, daisy, cornflower, lily, sunflower, rose)
- 🎮 Novo comando `!tipos` para listar todos os baús
- 📊 Total de 28 tipos de baús em 4 categorias!
- 🔧 Sistema de mapeamento de comandos expandido
- 📝 42 novos arquivos JSON (items + recipes)

### v1.1.0 (10/02/2026)
- ✨ **Novos baús**: Esmeralda e Cobre
- 📊 Sistema de estatísticas (!stats)
- 🔧 Configurações centralizadas
- 🛡️ Validações robustas e tratamento de erros
- 🎨 Efeitos visuais aprimorados (partículas únicas por tipo)
- 📝 Sistema de logging detalhado
- 💬 Feedback melhorado (contador de itens)
- 🐛 Correção de bugs de sincronização
- ⚡ Performance otimizada

### v1.0.0 (06/02/2026)
- ✨ Lançamento inicial
- 🎁 5 tipos de baús (Ferro, Ouro, Diamante, Carvão, Netherite)
- ⚡ Preenchimento automático com 27 stacks
- 🎨 Efeitos de partículas e som
- 🎮 Comandos de teste
- 🌐 Suporte para PT-BR e EN-US

---

## 🎯 Recursos Futuros (Planejados)

- [x] Suporte para Netherite (adicionado!)
- [ ] Suporte para Esmeralda, Cobre
- [ ] Baús de minérios brutos
- [ ] Configuração de quantos slots preencher
- [ ] Sistema de upgrades (baú pequeno → grande)
- [ ] Partículas customizadas por tipo
- [ ] Som especial ao abrir pela primeira vez

---

## 📜 Licença & Créditos

**Criado por**: YourName  
**Versão**: 1.0.0  
**Compatível com**: Minecraft Bedrock 1.21.132+

### Permissões
- ✅ Uso pessoal
- ✅ Uso em servidores (com créditos)
- ✅ Modificação (mantenha os créditos)
- ❌ Redistribuição como próprio

---

## 💬 Suporte

Encontrou um bug? Tem sugestões?
- Crie uma issue no GitHub
- Comente no vídeo/post onde encontrou este addon
- Entre em contato via Discord

---

## 🌟 Apoie o Projeto

Se gostou do addon:
- ⭐ Dê uma estrela no GitHub
- 👍 Deixe um like no vídeo
- 📤 Compartilhe com seus amigos
- 💰 Considere fazer uma doação

---

**Divirta-se minerando! ⛏️💎**
