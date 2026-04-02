# ⚡ GUIDE RAPIDE - GitHub Setup

## 🎯 Objectif

Publier votre dashboard sur GitHub avec :
- ✅ Branche `teste` pour les tests
- ✅ Hébergement sur GitHub Pages
- ✅ Branche `main` protégée (vous contrôlez les merges)

---

## 🚀 3 ÉTAPES SIMPLES

### ÉTAPE 1 : Nettoyer ✨
```bash
cleanup.bat
```
**Résultat :** Ne garde que webapp.html, app.js et les README

### ÉTAPE 2 : Créer le Repository 🌐

1. Sur [GitHub.com](https://github.com), cliquez "New repository"
2. Nom : `KiksDashboard`
3. Public ou Private (votre choix)
4. **NE PAS** cocher "Add README"
5. Créez !

### ÉTAPE 3 : Publier 📤

**Copiez-collez ces commandes** (remplacez USERNAME par votre nom GitHub) :

```bash
git checkout -b teste
git add webapp.html app.js README.md README_WEBAPP.md .gitignore
git commit -m "Application web standalone prête"
git remote add origin https://github.com/USERNAME/KiksDashboard.git
git push -u origin teste
```

---

## 🌐 Activer GitHub Pages (Hébergement Gratuit)

1. Sur GitHub, repo **Settings** → **Pages**
2. **Branch** : sélectionnez `teste`
3. **Folder** : `/` (root)
4. **Save**

⏰ Attendez 2-3 minutes

✅ Votre site : `https://USERNAME.github.io/KiksDashboard/webapp.html`

---

## 🔒 Protéger Main (Optionnel)

Settings → Branches → Add rule :
- Branch name : `main`
- ✅ Require pull request reviews

Résultat : Seul vous pouvez merger `teste` → `main`

---

## 📝 Quand Vous Voulez Merger

### Option 1 : Via GitHub (Recommandé)
1. Créez une Pull Request : `teste` → `main`
2. Reviewez
3. Cliquez "Merge"

### Option 2 : Ligne de commande
```bash
git checkout main
git merge teste
git push origin main
```

---

## ✅ CHECKLIST

```
☐ Exécuter cleanup.bat
☐ Créer repo sur GitHub
☐ git checkout -b teste
☐ git add + commit + push
☐ Activer Pages (Branch: teste)
☐ Tester l'URL
☐ (Optionnel) Protéger main
```

---

## 🆘 Problèmes ?

**Git pas installé ?**
→ [Télécharger Git](https://git-scm.com/downloads)

**Username/Password demandés ?**
→ Utilisez un [Personal Access Token](https://github.com/settings/tokens)

**Page 404 sur GitHub Pages ?**
→ Attendez 5 minutes, puis videz le cache

---

## 🎉 C'EST TOUT !

Votre dashboard sera en ligne sur GitHub Pages automatiquement !

URL finale : `https://USERNAME.github.io/KiksDashboard/webapp.html`

---

**Questions ? Consultez GIT_SETUP.md pour les détails**
