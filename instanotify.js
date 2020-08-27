// ==UserScript==
// @name         InstaNotify
// @namespace    https://github.com/TangSteven/InstagramBots
// @version      1.0.0
// @description  Notifications without following bot for Instagram
// @author       Steven
// @match        https://www.instagram.com/username/
// @require      https://steventang.tk/bot/steven.bot.js
// ==/UserScript==
function instanotify() {
    var old_posts = localStorage.getItem('steven.bot.instafollow.posts') || 0;
    var current_posts = Number.parseInt(document.querySelector('main header section ul span span').textContent);
    if (old_posts != current_posts) {
        var notify;
        if (Notification.permission === 'granted') {
            notify = new Notification('@username posted!', {
                icon: 'https://www.instagram.com/static/images/ico/favicon-192.png/b407fa101800.png',
            });
            notify.onclick = function() {
                window.focus();
                this.close();
            };
        }
        localStorage.setItem('steven.bot.instafollow.posts', current_posts);
    }
}
steven.bot(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    if (Notification.permission !== 'denied' || Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
}, instanotify, 600000, {
    name: 'InstaNotify',
    version: '1.0.0',
    reload: true,
    reload_url: 'https://www.instagram.com/username/'
});