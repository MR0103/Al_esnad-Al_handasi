// ==UserScript==
// @name         Mitsubishi Auto Login Bridge
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  تسجيل دخول تلقائي ديناميكي لشاشات التبريد عبر الهاش
// @match        http://10.15.16.230/control/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    const checkExist = setInterval(function() {
        const usernameField = document.getElementById('id_user_name');
        const passwordField = document.getElementById('id_password');
        const loginButton = document.getElementById('btn_login');

        if (usernameField && passwordField && loginButton) {
            clearInterval(checkExist);

            const hash = window.location.hash;
            if (hash && hash.startsWith('#autologin:')) {
                const parts = hash.substring(11).split(':');
                if (parts.length >= 2) {
                    const user = decodeURIComponent(parts[0]);
                    const pass = decodeURIComponent(parts[1]);

                    window.location.replace(window.location.href.split('#')[0]);

                    usernameField.value = user;
                    passwordField.value = pass;

                    usernameField.dispatchEvent(new Event('input', { bubbles: true }));
                    passwordField.dispatchEvent(new Event('input', { bubbles: true }));

                    setTimeout(() => {
                        loginButton.click();
                    }, 250);
                }
            }
        }
    }, 100);
})();
