# 📤 Guia para Push para GitHub

## Passo 1: Criar repositório no GitHub

1. Vá para https://github.com/new
2. Preencha os detalhes:
   - **Nome do repositório:** `barcelona-trip`
   - **Descrição:** `Barcelona Trip Itinerary - 15-18 July 2026`
   - **Visibilidade:** Public (se quiser partilhar)
   - **Não inicializar com README** (já temos um)

3. Clique em "Create repository"

## Passo 2: Adicionar remote e fazer push

Execute estes comandos na pasta do projeto:

```bash
# Adicionar o remote (substitua USERNAME pelo seu username do GitHub)
git remote add origin https://github.com/USERNAME/barcelona-trip.git

# Mudar o branch para main (opcional, mas recomendado)
git branch -M main

# Fazer push
git push -u origin main
```

## Passo 3: Ativar GitHub Pages (opcional)

1. Vá para o repositório no GitHub
2. Clique em "Settings"
3. No menu esquerdo, clique em "Pages"
4. Em "Build and deployment", selecione:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Clique em "Save"

O seu website estará disponível em:
`https://USERNAME.github.io/barcelona-trip`

## Passo 4: Clonar em outro computador

```bash
git clone https://github.com/USERNAME/barcelona-trip.git
cd barcelona-trip
```

## Comandos Git Úteis

```bash
# Ver o estado do repositório
git status

# Ver histórico de commits
git log --oneline

# Criar um novo branch
git checkout -b nova-feature

# Fazer commit de mudanças
git add .
git commit -m "Descrição da mudança"

# Ver remotes
git remote -v

# Ver branches
git branch -a
```

## Estrutura do Repositório

```
barcelona-trip/
├── .git/                 # Arquivo git (não modificar)
├── .gitignore           # Ficheiros ignorados
├── index.html           # Página principal
├── style.css            # Estilos
├── script.js            # Interatividade
├── README.md            # Documentação
└── GITHUB_SETUP.md      # Este ficheiro
```

## Dúvidas Frequentes

**P: Como adicionar mais pessoas ao repositório?**
R: Settings → Collaborators → Add people

**P: Como fazer pull requests?**
R: Crie um branch, faça commit, push, e abra um PR no GitHub

**P: Como apagar o repositório?**
R: Settings → Danger Zone → Delete this repository

---

Boa sorte com a sua viagem! 🌍✈️
