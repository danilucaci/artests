"use strict";

let Storage = (function() {
  const UISelects = {
    card: document.querySelector(".card"),
    inner: document.querySelector(".inner"),
  };

  return {
    getSelects: () => UISelects,
  };
})();

/********************************************************************
 ************************ Global Page Control ***********************/

let Page = (function(Storage) {
  let UISelects = Storage.getSelects();

  // ********************************************************
  // Functions

  function addEventListeners() {
    UISelects.card.addEventListener("click", grow);
  }

  function grow() {
    UISelects.inner.classList.toggle("grow");
  }

  return {
    initUI: function() {
      addEventListeners();
    },
  };
})(Storage);

// ****************************************************************
// Global Page Init

Page.initUI();
