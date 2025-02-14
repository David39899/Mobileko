(function() {
    console.log("✅ Skript cookie.js byl načten na stránce:", window.location.href);

    function sendConsent(consentType, consentValue) {
        window.dataLayer = window.dataLayer || [];

        if (Array.isArray(window.dataLayer) && window.dataLayer.some(event => event?.event === "cookieConsent" && event?.consent_type === consentType)) {
            console.log(`⚠️ Consent '${consentType}' už byl odeslán, přeskakuji...`);
            return;
        }

        window.dataLayer.push({
            'event': 'cookieConsent',
            'consent_type': consentType,
            'consent_value': consentValue
        });

        localStorage.setItem(consentType, consentValue);
        console.log(`✅ Odeslán event: ${consentType} = ${consentValue}`);
    }

    function checkConsent() {
        let storedUpdateConsent = localStorage.getItem('update_consent');
        if (storedUpdateConsent) {
            console.log(`🔄 Posílám uložený update_consent = ${storedUpdateConsent} na nové stránce.`);
            sendConsent('update_consent', storedUpdateConsent);
        }

        if (!localStorage.getItem('default_consent')) {
            sendConsent('default_consent', 'denied');
        }
    }

    let cookieCheckAttempts = 0;
    const maxCookieCheckAttempts = 10;

    function checkCookieBar() {
        if (localStorage.getItem('update_consent')) {
            console.log("✅ Souhlas už byl udělen, cookie lišta se nebude hledat.");
            return;
        }

        let cookieBar = document.querySelector(".js-siteCookies");
        if (cookieBar) {
            console.log("✅ Cookie lišta nalezena.");
            let acceptButton = cookieBar.querySelector(".js-cookiesConsentSubmit");
            let rejectButton = cookieBar.querySelector(".js-cookiesConsentReject");

            if (acceptButton) {
                acceptButton.addEventListener("click", function () {
                    console.log("✅ Uživatel souhlasil, odesílám update_consent = granted.");
                    sendConsent('update_consent', 'granted');
                });
            }

            if (rejectButton) {
                rejectButton.addEventListener("click", function () {
                    console.log("❌ Uživatel odmítl cookies, odesílám update_consent = denied.");
                    sendConsent('update_consent', 'denied');
                });
            }
        } else {
            console.log("⏳ Cookie lišta zatím nenačtena, opakuji kontrolu...");
            if (cookieCheckAttempts < maxCookieCheckAttempts) {
                cookieCheckAttempts++;
                setTimeout(checkCookieBar, 500);
            } else {
                console.log("⚠️ Cookie lišta nebyla nalezena ani po několika pokusech.");
            }
        }
    }

    function debounce(func, delay) {
        let timer;
        return function() {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, arguments), delay);
        };
    }

    function observeShoptetChanges() {
        let lastUrl = location.href;
        const debouncedCheck = debounce(() => {
            if (location.href !== lastUrl) {
                lastUrl = location.href;
                console.log("🔄 Detekována změna stránky:", lastUrl);
                checkConsent();
                checkCookieBar();
            }
        }, 500);

        new MutationObserver(debouncedCheck).observe(document.body, { childList: true, subtree: true });
    }

    // 🏁 Spuštění při načtení stránky
    checkConsent();
    checkCookieBar();
    observeShoptetChanges();

})();
