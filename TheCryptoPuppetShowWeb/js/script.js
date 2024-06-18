$(document).ready(function () {
  smoothScroll();
  $("header nav ul li a").click(function (event) {
    $("header nav ul li a").removeClass("selected");
    $(this).addClass("selected");
  });

  if ($(window).width() < 768) {
    jQuery(".menu_block .nav-container").prepend(
      '<div class="toggler_container"><div class="toggle"><span></span><span></span><span></span></div><div class="song_container song_in_screen_mobile"><img src="assets/icons/play_song.png" class="play_song"></div></div>'
    );
    jQuery(".navmenu").hide();
    jQuery(".toggle, .navmenu ul li a").click(function () {
      jQuery("header .navmenu").slideToggle(300);
      if ($(".toggle").hasClass("active")) {
        $(".toggle").removeClass("active");
      } else {
        $(".toggle").addClass("active");
      }
    });
  }


  $(".song_in_screen_mobile, .song_in_screen").click(function (event) {
    event.preventDefault();
  
    var $image = $(this).find("img");
    if ($image.hasClass("play_song")) {
      $image.attr("src", "assets/icons/pause_song.png");
      $image.removeClass("play_song").addClass("pause_song");
      reproducirMusica();
    } else {
      $image.attr("src", "assets/icons/play_song.png");
      $image.removeClass("pause_song").addClass("play_song");
      pausarMusica();
    }
  });
  

  const numCoins = 40;
  const coinContainer = $(".coin-container");

  

  for (let i = 0; i < numCoins; i++) {
    const randomTipo = Math.random() < 0.5 ? "bit_coin" : "s_coin";
    const randomSize =
      Math.random() < 0.33
        ? "grande"
        : Math.random() < 0.66
        ? "mediano"
        : "chica";
    setTimeout(() => {
      generarMoneda(randomTipo, randomSize, coinContainer);
    }, Math.random() * 8000);
  }
});

function generarMoneda(tipo, size, coinContainer) {
  const tiposMoneda = {
    bit_coin: "assets/img/coins/bit_coin.png",
    s_coin: "assets/img/coins/s_coin.png",
  };

  const coin = $(`<img src="${tiposMoneda[tipo]}" class="coin">`);
  coin.addClass(size);
  coinContainer.append(coin);

  const randomX = Math.random() * 90;
  let randomDelay;
  switch (tipo) {
    case "grande":
      randomDelay = Math.random() * 8;
      break;
    case "mediano":
      randomDelay = Math.random() * 4;
      break;
    case "chica":
      randomDelay = Math.random() * 1;
      break;
    default:
      randomDelay = 0;
      break;
  }

  coin.css({
    left: `${randomX}vw`,
    animation: `fall ${8 - randomDelay}s linear ${randomDelay}s infinite`,
  });
}

function smoothScroll() {
  var headerHeight = $(".header-container").outerHeight(); 

  $(".styled-navbar-ul-li__a").on("click", function (event) {
    event.preventDefault();

    var targetId = $(this).attr("href");
    var $targetElement = $(targetId);

    if ($targetElement.length) {
      var targetOffset = $targetElement.offset().top - headerHeight; 

      $("html, body").animate(
        {
          scrollTop: targetOffset
        },
        50
      );
    }
  });

  $(window).on("scroll", function () {
    animateSnake();
    var scrollPos = $(document).scrollTop();
    $("section").each(function () {
      var currLink = $(this);
      var refElement = $(currLink).attr("id");

      if (
        $(currLink).position().top - headerHeight <= scrollPos &&
        $(currLink).position().top + $(currLink).height() > scrollPos
      ) {
        $("header nav ul li a").removeClass("selected");
        $('header nav ul li a[href="#' + refElement + '"]').addClass(
          "selected"
        );
      }
    });
  });
}

let hasAnimated = false;

function isInViewport(elem) {
  var distance = elem[0].getBoundingClientRect();
  return (
    distance.top <
      (window.innerHeight || document.documentElement.clientHeight) &&
    distance.bottom > 0
  );
}

function animateSnake() {
  const footer = $("#footer_contact");

  if (isInViewport(footer) && !hasAnimated) {
    const puppetSnake = $(".img_puppet_snake");
    puppetSnake.addClass("finalposition");
    puppetSnake.on("animationend", function () {
      $(this).addClass("fixed-position");
    });
    hasAnimated = true;
  }
}

function reproducirMusica() {
  $("#reproductor").attr("src", "https://www.youtube.com/embed/videoseries?si=n6QOZ_PtqLidRec5&amp;list=PLR8mu-SNXZ8nvp8XRP5nVepwSBujN1YN_&autoplay=1");
}
function pausarMusica() {
  $("#reproductor").attr("src", "");
}
