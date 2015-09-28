/*
 * If a input field ancestor is a [draggable="true"] node, following issue will be addressed to different browsers.
 *   a. input[type="text"] liked fields cannot be focused by mousedown/click;
 *   b. textarea cannot be focused by mousedown/click;
 *   c. text in input[type="text"] liked fields cannot be selected by mouse;
 *   d. text in textarea cannot be selected by mouse;
 *   e. input[type="text"] liked fields clear `x` cannot works;
 *   f. cursor position will set to beginning of the input[type="text"] liked fields when mousedown/click/dbclick to trigger focus
 *   g. cursor position will set to beginning of the textarea when mousedown/click/dbclick to trigger focus
 *
 * Safari Version 8.0.8 (10600.8.9) or later has no such issues, so this workaround will be targeted for:
 *  1. IE10, IE11 and IE Edge about point a, b, c, d, e, f, g;
 *  2. Firefox about point c, d, f, g;
 *  3. Chrome about c;
 *
 * */

(function(supportDragAndDrop) {
  var draggableAncestors = [];
  var isChrome = 'chrome' in window;
  var isSafari = /Safari\//.test(navigator.userAgent) && !isChrome;
  var inputBoxes = /^(text|search|email|url|number|tel|datetime|range)$/;
  var body = document.body;
  var diableEvent = 'mouseover';
  var recoveryEvents = ['mouseout', 'blur'];

  if (!supportDragAndDrop || isSafari) {
    //Safari has not such issues, and if browser not supports drag and drop, also has not such issues, so just skip
    return;
  }

  if (isChrome) {
    diableEvent = 'mousedown';
    recoveryEvents.push('mouseup');
  }

  //disable ancestors draggable to fix
  document.addEventListener(diableEvent, function(e) {
    var element = e.target;
    var tagName = element.tagName.toLowerCase();

    if (tagName === 'input' && inputBoxes.test(element.getAttribute('type').toLowerCase())
      || (!isChrome && tagName === 'textarea')) {
      var parent = element.parentNode;
      while (parent) {
        if (parent.getAttribute('draggable')) {
          parent.setAttribute('draggable', false);
          draggableAncestors.push(parent);
        }

        parent = parent === body ? null : parent.parentNode;
      }
    }
  }, false);

  //recovery the draggable ancestors
  recoveryEvents.forEach(function(event) {
    document.addEventListener(event, function(e) {
      draggableAncestors.forEach(function(el) {
        el.setAttribute('draggable', true);
      });

      draggableAncestors = [];
    }, false);
  });
})(function() {
  //detect if browser support drag and drop
  var div = document.createElement('div');
  return 'draggable' in div || ('ondragstart' in div && 'ondrop' in div);
});
