(function () {
    var STORAGE_KEY = 'cookie-consent';
    var GTAG_ID = 'AW-17199031590';

    function loadGtag() {
        if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;

        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        window.gtag = gtag;

        gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
        });

        gtag('js', new Date());
        gtag('config', GTAG_ID);

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GTAG_ID;
        document.head.appendChild(script);
    }

    function grantConsent() {
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
            });
        }
    }

    function disableGtag() {
        window['ga-disable-' + GTAG_ID] = true;
        window.gtag = function () {};

        var scripts = document.querySelectorAll('script[src*="googletagmanager.com"]');
        for (var i = 0; i < scripts.length; i++) {
            scripts[i].remove();
        }
    }

    function showBanner() {
        document.getElementById('cookie-banner').style.display = 'block';
    }

    function hideBanner() {
        document.getElementById('cookie-banner').style.display = 'none';
    }

    var saved = localStorage.getItem(STORAGE_KEY);

    if (saved === 'refuz') {
        hideBanner();
    } else {
        loadGtag();

        if (saved === 'accept') {
            grantConsent();
            hideBanner();
        } else {
            showBanner();
        }
    }

    document.getElementById('cookie-accept').addEventListener('click', function () {
        localStorage.setItem(STORAGE_KEY, 'accept');
        loadGtag();
        grantConsent();
        hideBanner();
    });

    document.getElementById('cookie-refuz').addEventListener('click', function () {
        localStorage.setItem(STORAGE_KEY, 'refuz');
        disableGtag();
        hideBanner();
    });

    var settingsLink = document.getElementById('cookie-settings-link');
    if (settingsLink) {
        settingsLink.addEventListener('click', function (e) {
            e.preventDefault();
            showBanner();
        });
    }
})();
