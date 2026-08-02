/* ================================================================
   [CRYSTAL.NET] — Конфигурация Firebase
   ----------------------------------------------------------------
   ШАГ 1. Создайте проект в Firebase Console:
          https://console.firebase.google.com

   ШАГ 2. В разделе Build -> Realtime Database создайте базу данных
          (пока подойдёт тестовый режим, затем установите правила
          из файла firebase.rules.json).

   ШАГ 3. В настройках проекта (шестерёнка -> Project settings ->
          Your apps) добавьте веб-приложение и скопируйте сюда ключи.

   ШАГ 4. Включите провайдер входа (Build -> Authentication ->
          Sign-in method):
            - Google  : просто включите "Google".
            - GitHub  : создайте OAuth App на github.com (Settings ->
                        Developer settings -> OAuth Apps), укажите в
                        Authorization callback URL:
                        https://YOUR_PROJECT_ID.firebaseapp.com/__/auth/handler
                        и впишите Client ID / Secret в Firebase.

   ШАГ 5. Деплой: Vercel или Cloudflare Pages (см. README.md).
   ================================================================ */

window.CRYSTAL_CONFIG = {
  /* Ключи из консоли Firebase (Web app). Оставьте пустыми,
     чтобы игра работала в офлайн-демо-режиме без сети. */
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
  },

  /* Провайдер входа: "google" | "github" | "anonymous"
     "anonymous" работает без настройки OAuth — удобно для теста. */
  authProvider: 'google',

  /* true  — использовать Firebase (если заполнены ключи)
     false — всегда офлайн-демо-режим */
  enabled: true
};
