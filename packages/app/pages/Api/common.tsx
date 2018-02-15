export function concatArray(array: JSON[]) {
  var retValue = "";
  if (array[0] == null) {
    return "none";
  }
  retValue = array[0].id;
  for (var i = 1; i < array.length; i++) {
    retValue += ", ";
    retValue += array[i].id;
  }
  return retValue;
}
