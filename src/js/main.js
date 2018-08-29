"use strict";

let euComStorage = (function() {
  let UIClasses = {
    menuBtn: ".a-menu__btn",
    menuBtnIcon: ".a-menu__icon",
    menuBtnIconOpen: ".a-menu__icon--open",
    siteNav: ".o-site__nav",
    siteNavOpen: "is-visible",
    svgLines: "dash",
    svgShowNow: "showNow",
    svgShowBtn: ".svg__show-btn",
    boxes: ".l-box .box__content",
    isOpen: "is-open",
    readingTocTrigger: ".a-reading__toc-trigger",
    readingTocContainer: ".m-reading__toc",
    readingShareTrigger: ".a-reading__share-trigger",
    readingShareContainer: ".m-reading__share-icons",
  };

  let UISelects = {
    menuBtn: document.querySelector(UIClasses.menuBtn),
    menuBtnIcon: document.querySelector(UIClasses.menuBtnIcon),
    siteNav: document.querySelector(UIClasses.siteNav),
    svgLines: document.querySelectorAll(`.${UIClasses.svgLines}`),
    showNow: document.querySelectorAll(`.${UIClasses.svgShowNow}`),
    showBtn: document.querySelector(UIClasses.svgShowBtn),
    boxes: document.querySelectorAll(UIClasses.boxes),
    readingTocTrigger: document.querySelector(UIClasses.readingTocTrigger),
    readingTocContainer: document.querySelector(UIClasses.readingTocContainer),
    readingShareTrigger: document.querySelector(UIClasses.readingShareTrigger),
    readingShareContainer: document.querySelector(
      UIClasses.readingShareContainer
    ),
  };

  return {
    getSelects: () => UISelects,
    getClasses: () => UIClasses,
  };
})();

/****************************************************************
 ************************ Global Page Control ***********************/

let euCom = (function(euComStorage) {
  let UISelects = euComStorage.getSelects();
  let UIClasses = euComStorage.getClasses();

  let svgLinesArr = [...UISelects.svgLines];
  let showNowArr = [...UISelects.showNow];

  // ********************************************************
  // ********** Functions

  function atachEventlisteners() {
    UISelects.menuBtn.addEventListener("click", openNav);

    if (UISelects.boxes) {
      UISelects.boxes.forEach(function(box) {
        box.parentNode.addEventListener("click", openBox);
      });
    }

    if (UISelects.readingShareTrigger) {
      UISelects.readingShareTrigger.addEventListener("click", openReadingShare);
    }

    if (UISelects.readingTocTrigger) {
      UISelects.readingTocTrigger.addEventListener("click", openReadingToc);
    }

    // only if im on the front page with svg animations
    if (UISelects.showBtn) {
      UISelects.showBtn.addEventListener("animationend", animateSvgLines);
      UISelects.showBtn.addEventListener("webkitAnimationEnd", animateSvgLines);
    }
  }

  function openNav() {
    UISelects.siteNav.classList.toggle(UIClasses.siteNavOpen);
    UISelects.menuBtnIcon.classList.toggle(UIClasses.menuBtnIconOpen);
  }

  function openReadingShare() {
    UISelects.readingShareContainer.classList.toggle(UIClasses.isOpen);
  }

  function openReadingToc() {
    UISelects.readingTocContainer.classList.toggle(UIClasses.isOpen);
  }

  function openBox() {
    let boxes = [...this.children];

    boxes.forEach(function(box) {
      if (box.classList.contains("box__content")) {
        box.classList.toggle(UIClasses.isOpen);
      }
    });
  }

  function animateSvgLines() {
    svgLinesArr.map((line) => {
      line.classList.remove(UIClasses.svgLines);
      setTimeout(() => {
        line.classList.add(UIClasses.svgLines);
      }, 2000);
    });

    showNowArr.map((item) => {
      setTimeout(() => {
        item.classList.remove(UIClasses.svgShowNow);
      }, 2000);

      setTimeout(() => {
        item.classList.add(UIClasses.svgShowNow);
      }, 2300);
    });
  }

  return {
    initUI: function() {
      console.groupCollapsed("%c Incep:", "color: #3DAEFF");
      console.log("%c Sunt Gata.", "color: #79E36B");
      console.groupEnd();

      atachEventlisteners();
    },
  };
})(euComStorage);

/****************************************************************
 ************************ Global Page Init **********************/

euCom.initUI();
