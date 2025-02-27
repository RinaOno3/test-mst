$(document).ready(function(){
    $('.slider-container').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        arrows: true,
        slidesToShow: 3, // デフォルトでは3枚表示
        slidesToScroll: 1,
        prevArrow: '<img src="/asset/img/slide_arrow_l.png" class="slick-prev" alt="前へ">',
        nextArrow: '<img src="/asset/img/slide_arrow_r.png" class="slick-next" alt="次へ">',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1, // 768px以下では1枚表示
                    slidesToScroll: 1,
                    centerMode: false, // センターモードを無効化
                    arrows: true,
                    dots: true
                }
            }
        ]
    });
});
