"use strict";

var euComStorage = function () {
  var UIClasses = {
    menuBtn: ".a-menu__btn"
  };

  var UISelects = {
    menuBtn: document.querySelector(UIClasses.menuBtn)
  };

  return {
    getSelects: function getSelects() {
      return UISelects;
    },
    getClasses: function getClasses() {
      return UIClasses;
    }
  };
}();

/****************************************************************
 ************************ Global Page Control ***********************/

var euCom = function (euComStorage) {
  var UISelects = euComStorage.getSelects();
  var UIClasses = euComStorage.getClasses();

  // ********************************************************
  // ********** Functions

  function atachEventlisteners() {
    console.log("HEHE;");
  }

  return {
    initUI: function initUI() {
      console.groupCollapsed("%c Incepem:", "color: #3DAEFF");
      console.log("%c Gata.", "color: #79E36B");
      console.groupEnd();

      atachEventlisteners();
    }
  };
}(euComStorage);

/****************************************************************
 ************************ Global Page Init **********************/

euCom.initUI();