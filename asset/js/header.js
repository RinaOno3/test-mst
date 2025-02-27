document.querySelectorAll('.menu-item').forEach(item => {
    const submenuWrapper = item.querySelector('.submenu-wrapper');

    item.addEventListener('mouseover', () => {
        if (submenuWrapper) {
            submenuWrapper.classList.add('active');
        }
    });

    item.addEventListener('mouseout', (event) => {
        if (submenuWrapper && !item.contains(event.relatedTarget)) {
            submenuWrapper.classList.remove('active');
        }
    });
});

// SP専用
document.addEventListener("DOMContentLoaded", function () {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");

    function setupSPMenu() {
        if (mediaQuery.matches) {
            console.log("SP用のメニュー処理を実行");

            const hamburger = document.getElementById("hamburger");
            const nav = document.getElementById("sp-nav");
            const header = document.querySelector(".header.sp_only"); // SP専用の header を取得
            const headerContainer = document.querySelector(".header-container");
            const menuItems = document.querySelectorAll(".menu-item");

            // `header` が SP 専用のものか確認
            console.log("SP用 header:", header);

            if (!header) {
                console.error("⚠️ `.header.sp_only` が見つかりません！");
                return;
            }

            // ハンバーガーメニューの開閉処理
            function toggleMenu(open) {
                console.log("メニュー開閉:", open);
                nav.classList.toggle("open", open);
                document.body.style.overflow = open ? "hidden" : ""; 
                hamburger.classList.toggle("open", open);
                header.classList.toggle("open", open); // これでPCの `header` には影響なし！
                headerContainer.classList.toggle("open", open);
            }

            // ハンバーガーメニュークリックで開閉
            hamburger.addEventListener("click", () => {
                const isOpen = nav.classList.contains("open");
                toggleMenu(!isOpen);
            });

            // アコーディオンメニュー（サブメニュー開閉）
            menuItems.forEach((item) => {
                const menuLink = item.querySelector(".menu-link");
                if (menuLink) {
                    menuLink.addEventListener("click", (e) => {
                        e.preventDefault();
                        item.classList.toggle("open");

                        // 他のメニューを閉じる（単一開閉仕様）
                        menuItems.forEach((otherItem) => {
                            if (otherItem !== item) {
                                otherItem.classList.remove("open");
                            }
                        });
                    });
                }
            });
        }
    }

    setupSPMenu(); // 初回実行
    mediaQuery.addListener(setupSPMenu); // 画面サイズ変更時にも実行
});
