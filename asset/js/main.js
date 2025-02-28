document.addEventListener("DOMContentLoaded", function () {
    const isTopPage = window.location.pathname === "/" || window.location.pathname === "/index.html";

    // ヘッダーの読み込み
    fetch(isTopPage ? "/includes/header-top.html" : "/includes/header-sub.html")
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.getElementById("header-sub"); // ✅ `header-sub` に修正
            if (headerContainer) {
                headerContainer.innerHTML = data;
                console.log("✅ ヘッダーの読み込み完了！");

                // 🔹 ヘッダーが完全に反映された後に `header.js` を実行
                setTimeout(loadHeaderJS, 100);
            } else {
                console.error("❌ ヘッダーの挿入先が見つかりません！");
            }
        })
        .catch(error => console.error("❌ ヘッダーの読み込みに失敗しました:", error));

    // フッターの読み込み
    fetch(isTopPage ? "/includes/footer-top.html" : "/includes/footer-sub.html")
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.getElementById("footer-sub");
            if (footerContainer) {
                footerContainer.innerHTML = data;
                console.log("✅ フッターの読み込み完了！");
            } else {
                console.error("❌ フッターの挿入先が見つかりません！");
            }
        })
        .catch(error => console.error("❌ フッターの読み込みに失敗しました:", error));

    // 🔹 `scrollTop` の処理も統一
    const scrollTopBtn = document.getElementById("scroll-top");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show-scroll");
        } else {
            scrollTopBtn.classList.remove("show-scroll");
        }
    });

    scrollTopBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// 🔹 `header.js` の処理をヘッダー読み込み後に実行する関数
function loadHeaderJS() {
    console.log("✅ `header.js` の実行開始！");

    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("sp-nav");
    const header = document.querySelector(".header.sp_only");
    const headerContainer = document.querySelector(".header-container");
    const spMenuItems = document.querySelectorAll(".sp-menu-item");

    console.log("SP用 header:", header);
    console.log("hamburger:", hamburger);
    console.log("nav:", nav);
    console.log("headerContainer:", headerContainer);

    if (!hamburger || !nav || !header) {
        console.error("❌ `header.js` の要素が見つかりません！HTMLのIDやクラスを確認してください！");
        return;
    }

    // 🔹 SPハンバーガーメニューの開閉処理
    function toggleMenu(open) {
        console.log("メニュー開閉:", open);
        nav.classList.toggle("open", open);
        document.body.style.overflow = open ? "hidden" : "";
        hamburger.classList.toggle("open", open);
        header.classList.toggle("open", open);
        if (headerContainer) headerContainer.classList.toggle("open", open);
    }

    // ハンバーガーメニュークリックで開閉
    hamburger.addEventListener("click", () => {
        const isOpen = nav.classList.contains("open");
        toggleMenu(!isOpen);
    });

    // 🔹 SPメニューのアコーディオン開閉
    spMenuItems.forEach((item) => {
        const menuLink = item.querySelector(".menu-link");
        if (menuLink) {
            menuLink.addEventListener("click", (e) => {
                e.preventDefault();
                item.classList.toggle("open");

                // 他のメニューを閉じる（単一開閉仕様）
                spMenuItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        otherItem.classList.remove("open");
                    }
                });
            });
        }
    });

    console.log("✅ SPメニューの設定が完了しました！");
}
