"use strict";

let euComStorage = (function() {
  let UIClasses = {
    menuBtn: ".a-menu__btn",
  };

  let UISelects = {
    menuBtn: document.querySelector(UIClasses.menuBtn),
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

  // ********************************************************
  // ********** Functions

  function atachEventlisteners() {
    console.log("HEHE;");
  }

  return {
    initUI: function() {
      console.groupCollapsed("%c Incepem:", "color: #3DAEFF");
      console.log("%c Gata.", "color: #79E36B");
      console.groupEnd();

      atachEventlisteners();
    },
  };
})(euComStorage);

/****************************************************************
 ************************ Global Page Init **********************/

euCom.initUI();
