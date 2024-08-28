function processTemplate(left_bracket, right_bracket, replacePlaceHolder, str) {
  let inBracket = false, newText = "", bracketContent = "";
  for (const char of str) {
    switch (char) {
      case left_bracket:
        if (inBracket) {
          if (left_bracket == right_bracket) {
            inBracket = false;
            newText += replacePlaceHolder(bracketContent);
            bracketContent = "";
          } else {
            inBracket = false;
            newText += `${left_bracket}${bracketContent}${left_bracket}`;
            bracketContent = "";
          }
        } else {
          inBracket = true;
        }
        break;
      case right_bracket:
        if (inBracket) {
          inBracket = false;
          newText += replacePlaceHolder(bracketContent);
          bracketContent = "";
        } else {
          newText += char;
        }
        break;
      case " ":
      case "\n":
      case "\r":
      case "	":
      case "\v":
      case "\f":
        if (inBracket) {
          inBracket = false;
          newText += `${left_bracket}${bracketContent}${char}`;
          bracketContent = "";
        } else {
          newText += char;
        }
        break;
      default:
        if (inBracket) {
          bracketContent += char;
        } else {
          newText += char;
        }
    }
  }
  if (bracketContent != "") {
    newText += left_bracket + bracketContent;
    inBracket = false;
  }
  if (inBracket) {
    newText += left_bracket;
  }
  return newText;
}

export { processTemplate as p };
//# sourceMappingURL=template-BmwbrKSM.js.map
