/* ================================================================
   [CRYSTAL.NET] — Конфигурация Firebase
   ----------------------------------------------------------------
   Ключи уже заполнены. База данных и вход должны быть включены
   в Firebase Console (см. README.md и подсказки ниже).
   ================================================================ */

window.CRYSTAL_CONFIG = {
  /* Ключи из консоли Firebase (Web app). */
  firebase: {
    apiKey: "AIzaSyCodqKf0kTc1tx22QcYm9lhiF4LkUDR1HM",
    authDomain: "crystal-net.firebaseapp.com",
    databaseURL: "https://crystal-net-default-rtdb.firebaseio.com",
    projectId: "crystal-net",
    storageBucket: "crystal-net.firebasestorage.app",
    messagingSenderId: "587925379925",
    appId: "1:587925379925:web:a61396ee7a94152a046ddc",
    measurementId: "G-ELXZ3M2TJ2"
  },

  /* Провайдер входа: "google" | "github" | "anonymous"
     Включите выбранный провайдер в Firebase Console (Authentication). */
  authProvider: 'google',

  /* Контакт для вопросов по сайту */
  contactEmail: 'imrealzproject@gmail.com',

  /* true  — использовать Firebase (ключи заполнены)
     false — всегда офлайн-демо-режим */
  enabled: true
};
