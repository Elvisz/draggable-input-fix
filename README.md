# draggable-input-fix
If a input field ancestor is a [draggable="true"] node, following issue will be addressed to different browsers.
 1. input[type="text"] liked fields cannot be focused by mousedown/click;
 2. textarea cannot be focused by mousedown/click;
 3. text in input[type="text"] liked fields cannot be selected by mouse;
 4. text in textarea cannot be selected by mouse;
 5. input[type="text"] liked fields clear `x` cannot works;
 6. cursor position will set to beginning of the input[type="text"] liked fields when mousedown/click/dbclick to trigger focus
 7. cursor position will set to beginning of the textarea when mousedown/click/dbclick to trigger focus
 
Safari Version 8.0.8 (10600.8.9) or later has no such issues, so this workaround will be targeted for:
 * IE10, IE11 and IE Edge about 1~7;
 * Firefox about point 4~7;
 * Chrome about 3;
