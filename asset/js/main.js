document.addEventListener("DOMContentLoaded", function () {
    const isTopPage = window.location.pathname === "/" || window.location.pathname === "/index.html";
  
    // ヘッダーの読み込み
    fetch(isTopPage ? "/includes/header-top.html" : "/includes/header-sub.html")
      .then(response => response.text())
      .then(data => document.getElementById("header").innerHTML = data)
      .catch(error => console.error("ヘッダーの読み込みに失敗しました:", error));
  
    // フッターの読み込み
    fetch(isTopPage ? "/includes/footer-top.html" : "/includes/footer-sub.html")
      .then(response => response.text())
      .then(data => document.getElementById("footer").innerHTML = data)
      .catch(error => console.error("フッターの読み込みに失敗しました:", error));
  });
  