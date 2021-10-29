"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*==================================   global js    ============================================*/
(function () {
  /*==================================   main js    ============================================*/
  // добавление обертки для всех таблиц
  var tables = document.getElementsByTagName('table');
  var length = tables.length;

  for (var i = 0; i < length; i++) {
    var wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'table-overflow');
    tables[i].parentNode.insertBefore(wrapper, tables[i]);
    wrapper.appendChild(tables[i]);
  }
})();

(function () {
  /*==================================   cookie js    ============================================*/
  var cookieBlock = document.querySelector('.cookie-block');
  var okCookie = document.querySelectorAll('.ok-cookie');

  var _iterator = _createForOfIteratorHelper(okCookie),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var Item = _step.value;
      // закрываем по клику
      Item.addEventListener('click', function () {
        // записываем cookie на 30 деней, с которой мы не показываем окно
        cookieBlock.style.display = 'none';
        var date = new Date();
        date.setDate(date.getDate() + 30);
        document.cookie = "hide-cookie=ok; path=/; expires=" + date.toUTCString();
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var cookies = function cookies() {
    // функция возвращает cookie с именем name, если есть, если нет, то undefined
    function getCookie(name) {
      var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    } // проверяем, есть ли у нас cookie, с которой мы не показываем окно и если нет, запускаем показ


    if (!getCookie('hide-cookie')) {
      // показываем
      setTimeout(function () {
        cookieBlock.style.display = 'block';
      }, 1000);
    }
  };

  cookies();
})();

(function () {
  /*==================================   navigation js    ============================================*/
  //переменная которая определеяет с мобилього ли устройства или планшета зашли на сайт
  var isMobile = {
    Android: function Android() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function BlackBerry() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function iOS() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function Opera() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function Windows() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function any() {
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
  };
  var body = document.querySelector('body');

  if (isMobile.any()) {
    (function () {
      body.classList.add('touch');
      var arrow = document.querySelectorAll('.arrow');

      var _loop = function _loop(i) {
        var thisLink = arrow[i].previousElementSibling;
        var subMenu = arrow[i].nextElementSibling;
        var thisArrow = arrow[i];
        thisLink.classList.add('parent');
        arrow[i].addEventListener('click', function () {
          subMenu.classList.toggle('open');
          thisArrow.classList.toggle('active');
        });

        if (window.screen.width > 927) {
          //применять данное правило только если ширина окна больше чем 927 px
          //отслеживает клик в любою область кроме текущей стрелки(пункта подменю), скрывает любой другой пункт подменю тем самым делает что бы отображалась только одна плашка подменю
          document.addEventListener('click', function (evt) {
            if (!arrow[i].contains(evt.target)) {
              subMenu.classList.remove('open');
              thisArrow.classList.remove('active');
            }
          });
        }
      };

      for (var i = 0; i < arrow.length; i++) {
        _loop(i);
      }
    })();
  } else {
    body.classList.add('mouse');
  } //добавление кнопки бургер меню


  var burgerButton = document.querySelector('.header__burger');

  burgerButton.onclick = function () {
    burgerButton.classList.toggle('active');
    document.querySelector('.menu').classList.toggle('active');
    document.querySelector('body').classList.toggle('lock');
  }; //Активный пункт меню с помощью JavaScript


  document.querySelectorAll('.menu__list li a').forEach(function (el) {
    if (window.location.pathname.indexOf(el.getAttribute('href')) > -1) {
      //по умолчанию было -1
      el.classList.add('active-menu__link');
    }
  }); //Активный пункт САМОГО ВЕРХНЕГО меню с помощью JavaScript (подсветка родителя)

  document.querySelectorAll(".menu__list li a").forEach(function (el1) {
    if (el1.getAttribute('class') === 'sub-menu__link active-menu__link') {
      var pktMainMenu = el1.parentNode.parentNode.parentNode.querySelector('.menu__link');
      pktMainMenu.classList.add('active-menu__link');
    }
  }); //активный пункт home и его родитель с учетом pathname = index.html либо /

  document.querySelectorAll('.menu__list li a').forEach(function (el2) {
    if (window.location.pathname === '/tvnc/dist/' && el2.getAttribute('href') === 'index.html') {
      //активный пункт home и его родитель в целом не нужная штука, когда зальется на хостинг можно убрать если в корне то просто /  или    /tvnc/dist/
      el2.classList.add('active-menu__link');
      var pktMainMenu = el2.parentNode.parentNode.parentNode.querySelector('.menu__link');
      pktMainMenu.classList.add('active-menu__link');
    }
  });
})();

(function () {
  window.onload = function () {
    /*==================================   form js    ============================================*/
    var form = document.querySelector(".form-container[data-0208211447] > .form"); //если не будет этого класса to-connect-with то инпуты не будут завязаны с кнопкой отправить

    var inputs = form.querySelectorAll('input.to-connect-with');
    var btn = form.querySelector(".submit-container[data-0308211314] > .input#submit");
    setTimeout(function () {
      btn.setAttribute('disabled', '');
    }, 3000);
    btn.addEventListener('click', getChecked);

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('click', getChecked);
      inputs[i].addEventListener('keyup', getChecked);
    }

    function getChecked() {
      var allEmptyCheckboxes = true;
      var allEmptyEmail = true;
      var selectedAllCheckbox = null;
      var filledAllEmail = null;
      var numberAllCheckboxes = null;
      var numberAllInputEmail = null;

      for (var _i = 0; _i < inputs.length; _i++) {
        if (inputs[_i].type === 'checkbox') {
          numberAllCheckboxes++;
        }

        if (inputs[_i].type === 'text') {
          numberAllInputEmail++;
        }
      }

      for (var _i2 = 0; _i2 < inputs.length; _i2++) {
        if (inputs[_i2].type === 'checkbox' && inputs[_i2].checked === true) {
          var numberCheckedCheckboxes = !!inputs[_i2];
          selectedAllCheckbox += numberCheckedCheckboxes;

          if (numberAllCheckboxes === selectedAllCheckbox) {
            allEmptyCheckboxes = false;
          }
        }

        if (inputs[_i2].type === 'text' && inputs[_i2].value !== '') {
          var numberFilledEmail = !!inputs[_i2];
          filledAllEmail += numberFilledEmail;

          if (numberAllInputEmail === filledAllEmail) {
            allEmptyEmail = false;
          }
        }
      }

      if (!allEmptyEmail && !allEmptyCheckboxes) {
        btn.removeAttribute('disabled');
      } else {
        btn.setAttribute('disabled', '');
      }
    }
  };
})();

(function () {
  /*==================================   404 js    ============================================*/
})();

(function () {
  /*==================================   our-products js    ============================================*/
  var card = [{
    img: [{
      imgSrc: 'logo/tightvnc-logo-90x90.png',
      imgAlt: 'tightvnc'
    }],
    title: [{
      text: 'TightVNC v.2'
    }],
    description: [{
      text: 'Famous remote desktop tool, 100% free and Open Source'
    }],
    middleText: [{
      text: '✓Windows XP & above  ✓Java Viewer'
    }],
    buttonText: [{
      text: 'Download your free copy',
      "class": 'my-button'
    }]
  }, {
    img: [{
      imgSrc: 'logo/tightvnc-logo-90x90.png',
      imgAlt: 'tightvnc'
    }],
    title: [{
      text: 'Remote Core'
    }],
    description: [{
      text: 'Easily add remote desktop functions into your own software'
    }],
    middleText: [{
      text: '✓.NET ✓iOS ✓macOS ✓Android ✓Linux +more!'
    }],
    buttonText: [{
      text: 'More info & Request a demo',
      "class": 'qq',
      isHidden: false
    }]
  }, {
    img: [{
      imgSrc: 'logo/remoteripple-logo-90x90.png',
      imgAlt: 'Remote Ripple'
    }],
    title: [{
      text: 'Remote Ripple'
    }],
    description: [{
      text: 'New app to view & control VNC remote desktops'
    }],
    middleText: [{
      text: '✓iOS  ✓iPadOS  ✓macOS  ✓Android'
    }],
    buttonText: [{
      text: 'Get more info & Install'
    }]
  }, {
    img: [{
      imgSrc: 'logo/mightyviewer-logo-90x90.png',
      imgAlt: 'MightyViewer'
    }],
    title: [{
      text: 'MightyViewer'
    }],
    description: [{
      text: 'Continuously monitor many remote desktops in real time'
    }],
    middleText: [{
      text: '✓ All modern versions of Windows'
    }],
    buttonText: [{
      text: 'Get more info & Install',
      "class": 'a123'
    }]
  }];
  var ourProduct = document.querySelector('.container[data-our-product="2810210945"]');
  var template = ourProduct.querySelector('#template').content;
  var item = template.querySelector('.item');

  for (var i = 0; i < card.length; i++) {
    var cloneItem = item.cloneNode(true);
    var img = cloneItem.querySelectorAll('img');
    var title = cloneItem.querySelectorAll('.title');
    var description = cloneItem.querySelectorAll('.description');
    var middleText = cloneItem.querySelectorAll('.middle > .paragraph');
    var buttonText = cloneItem.querySelectorAll('.bottom > .text');

    for (var j = 0; j < cloneItem.children.length; j++) {
      var addSrc = function addSrc(items) {
        var _iterator2 = _createForOfIteratorHelper(items),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _item = _step2.value;

            if (_item.imgSrc) {
              return _item.imgSrc;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      };

      var addAlt = function addAlt(items) {
        var _iterator3 = _createForOfIteratorHelper(items),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _item2 = _step3.value;

            if (_item2.imgAlt) {
              return _item2.imgAlt;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      };

      var addContent = function addContent(items) {
        var _iterator4 = _createForOfIteratorHelper(items),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _item3 = _step4.value;

            if (_item3.text) {
              return _item3.text;
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      };

      var addHidden = function addHidden(items) {
        var _iterator5 = _createForOfIteratorHelper(items),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _item4 = _step5.value;

            if (_item4.isHidden) {
              return 'none';
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      };

      var addClass = function addClass(items) {
        var _iterator6 = _createForOfIteratorHelper(items),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _item5 = _step6.value;

            if (_item5["class"]) {
              return _item5["class"];
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      };

      img[j].src = addSrc(card[i].img);
      img[j].alt = addAlt(card[i].img);
      title[j].textContent = addContent(card[i].title);
      description[j].textContent = addContent(card[i].description);
      middleText[j].textContent = addContent(card[i].middleText);
      buttonText[j].textContent = addContent(card[i].buttonText);
      buttonText[j].classList.add(addClass(card[i].buttonText));
      buttonText[j].style.display = addHidden(card[i].buttonText);
    }

    ourProduct.appendChild(cloneItem);
  }
})();