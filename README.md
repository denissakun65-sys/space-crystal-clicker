# 💎 [CRYSTAL.NET] — Многопользовательский 3D-кликер

Футуристичная 3D-игра-кликер на чистом JavaScript, HTML5 и CSS3 (SPA в одном `index.html`)
с **реальным онлайном** на базе Firebase: живой чат, онлайн-счётчик и глобальный лидерборд.

- 🎮 3D-кристалл на Three.js (`MeshPhysicalMaterial`, неон, частицы при клике)
- 🛒 Рынок с экспоненциальным ростом цен (`Цена = База * 1.15^уровень`)
- 💬 Живой глобальный чат между реальными игроками
- 🟢 Реальный счётчик игроков онлайн (Firebase Realtime Database, присутствие через `onDisconnect`)
- 🏆 Глобальный лидерборд по балансу
- 👤 Вход через Google / GitHub OAuth (или анонимно)
- 💾 Автосохранение в LocalStorage каждые 5 секунд
- 📱 Адаптивность: на мобильных меню уходит вниз, `user-select: none`

---

## 🚀 Быстрый старт (без настройки сети)

Просто откройте `index.html` в браузере — пока в `config.js` не заполнены ключи Firebase,
игра работает в **офлайн-демо-режиме**: онлайн, чат и лидерборд имитируются ботами.
Так игру можно запустить мгновенно, не создавая ничего.

> 💡 **Про фейковые уведомления.** По умолчанию демо-активность (сообщения ботов в чате
> и лента «⚡ …») **выключена**, чтобы не путать её с реальным онлайном. Если нужно живое
> демо — включите переключатель «Демо-активность (боты)» на странице **Сеть**. В реальном
> режиме (когда Firebase настроен) фейковые боты отключаются автоматически.

---

## 🛠️ Настройка реального онлайна (пошагово)

### 1. Создайте Firebase-проект
1. Перейдите на https://console.firebase.google.com и нажмите «Добавить проект».
2. Введите имя (например, `crystal-net`), согласитесь и создайте.

### 2. Включите Authentication
1. В меню слева: **Build → Authentication → Sign-in method**.
2. Включите нужные провайдеры:
   - **Google** — просто нажмите «Включить» и сохраните.
   - **GitHub** — зайдите на https://github.com → **Settings → Developer settings → OAuth Apps → New OAuth App**. В поле *Authorization callback URL* укажите:
     ```
     https://YOUR_PROJECT_ID.firebaseapp.com/__/auth/handler
     ```
     (замените `YOUR_PROJECT_ID`). Скопируйте Client ID / Client Secret обратно в Firebase.
   - **Анонимный режим** — включите «Anonymous». Он работает без внешних OAuth-приложений (удобно для теста).

### 3. Создайте Realtime Database
1. **Build → Realtime Database → Create Database**.
2. Выберите регион и стартовый режим **Test mode** (потом замените правила).
3. Скопируйте URL базы (вид `https://PROJECT_ID-default-rtdb.firebaseio.com`) — он понадобится для `databaseURL`.

### 4. Получите ключи веб-приложения
1. **Project settings (шестерёнка) → Your apps → Add app → Web**.
2. Скопируйте объект конфигурации (`apiKey`, `authDomain`, `databaseURL`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`).

### 5. Заполните `config.js`
Впишите ключи в `window.CRYSTAL_CONFIG.firebase` и выберите `authProvider`:
```js
authProvider: 'google',   // 'google' | 'github' | 'anonymous'
```
Если всё заполнено корректно — игра автоматически перейдёт из демо-режима в реальный онлайн.

### 6. Установите правила безопасности
Откройте **Build → Realtime Database → Rules** и вставьте содержимое файла
[`firebase.rules.json`](firebase.rules.json). Это разрешает игрокам читать общие данные
и писать только в собственные узлы, а в чат — только со своим uid.

### 7. Ограничьте авторизованные домены (рекомендуется)
**Authentication → Settings → Authorized domains** — добавьте домены вашего деплоя
(например `crystal-net.vercel.app`), чтобы ключи нельзя было использовать с чужих сайтов.

---

## ☁️ Деплой на Vercel / Cloudflare Pages

Проект — чистая статика (нет сборки), поэтому подходит любой статический хостинг.

### Vercel
```bash
# 1. Установите CLI (или зайдите на vercel.com и импортируйте репозиторий)
npm i -g vercel

# 2. Из папки проекта запустите деплой
cd crystal-net
vercel --prod
```
Либо просто импортируйте GitHub-репозиторий на https://vercel.com — сборка не нужна.

### Cloudflare Pages
1. Зайдите на https://dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git**.
2. Выберите репозиторий, в поле *Build command* поставьте пусто, *Build output directory* — `.`
   (или просто `index.html`).
3. Deploy. Файл [`vercel.json`](vercel.json) для Cloudflare не нужен, но и не мешает.

---

## 🗂️ Структура проекта

```
crystal-net/
├── index.html            # Игра (SPA) + интеграция Firebase
├── config.js             # Ключи Firebase и настройки (заполните!)
├── firebase.rules.json   # Правила безопасности Realtime Database
├── vercel.json           # Настройка Vercel
├── .gitignore
└── README.md
```

---

## 🧠 Как работает реальный онлайн

| Фича | Механизм |
|------|----------|
| Онлайн-счётчик | Каждый игрок пишет себя в узел `online/<uid>` и ставит `onDisconnect().remove()`. Число онлайна = количество записей в узле. |
| Живой чат | Сообщения в узел `messages/<pushId>`; все слушают `onChildAdded`. |
| Лидерборд | Баланс пишется в `players/<uid>`; чтение топ-10 через `orderByChild('balance') + limitToLast(10)`. |
| Авторизация | Firebase Auth: Google / GitHub / anonymous. |

При падении/закрытии вкладки запись автоматически удаляется сервером (`onDisconnect`),
плюс клиент раз в минуту чистит «зависшие» записи старше 2 минут.

---

## ⚙️ Технические детали
- **Three.js r128** — подключён через CDN (cdnjs).
- **Firebase SDK 10.7.1** — подключён как ES-модуль через CDN gstatic.
- Пассивный доход: `CPS / 10` каждые 100 мс.
- Автосохранение в LocalStorage каждые 5 сек + при `beforeunload`/скрытии вкладки.
- Кнопка «Сбросить прогресс» в Лаборатории с `confirm()`.

---

## 📝 Лицензия
Свободно используйте, модифицируйте и дорабатывайте. Сделано для портфолио и GitHub. ✨
