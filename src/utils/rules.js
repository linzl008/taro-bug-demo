// 为空 undefined null
export function isEmpty(val) {
  return val === undefined || val === null || val === "";
}

// 校验 字母和数字的组合
export function checkPhone(value) {
  if (!/^1\d{10}$/.test(value)) return false;
  return true;
}
// 纯数字
export function isNumber(value) {
  if (!/^[0-9]*$/.test(value)) return false;
  return true;
}
