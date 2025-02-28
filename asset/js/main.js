document.addEventListener("DOMContentLoaded", function () {
  const isTopPage = window.location.pathname === "/" || window.location.pathname === "/index.html";

  // ヘッダーの読み込み
  fetch(isTopPage ? "/includes/header-top.html" : "/includes/header-sub.html")
      .then(response => response.text())
      .then(data => {
          document.getElementById("header").innerHTML = data;
          console.log("✅ ヘッダーの読み込み完了！");
          loadHeaderJS(); // 🔹 ヘッダー読み込み後に `header.js` の処理を実行！
      })
      .catch(error => console.error("❌ ヘッダーの読み込みに失敗しました:", error));

  // フッターの読み込み
  fetch(isTopPage ? "/includes/footer-top.html" : "/includes/footer-sub.html")
      .then(response => response.text())
      .then(data => document.getElementById("footer").innerHTML = data)
      .catch(error => console.error("❌ フッターの読み込みに失敗しました:", error));
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

document.addEventListener("DOMContentLoaded", function () {
    const scrollTopBtn = document.getElementById("scroll-top");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show-scroll"); // 300px以上スクロールで表示
        } else {
            scrollTopBtn.classList.remove("show-scroll"); // それ以下なら非表示
        }
    });

    scrollTopBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});