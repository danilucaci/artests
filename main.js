"use strict";

var Storage = function () {
  var UISelects = {
    card: document.querySelector(".card"),
    inner: document.querySelector(".inner")
  };

  return {
    getSelects: function getSelects() {
      return UISelects;
    }
  };
}();

/********************************************************************
 ************************ Global Page Control ***********************/

var Page = function (Storage) {
  var UISelects = Storage.getSelects();

  // ********************************************************
  // Functions

  function addEventListeners() {
    UISelects.card.addEventListener("click", grow);
  }

  function grow() {
    UISelects.inner.classList.toggle("grow");
  }

  return {
    initUI: function initUI() {
      addEventListeners();
    }
  };
}(Storage);

// ****************************************************************
// Global Page Init

Page.initUI();