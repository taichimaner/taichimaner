function myadd(x, y) {
  console.info(`[myadd][x=${x}][y=${y}][x+y=${x + y}]`);
  return x + y;
}
function hook_1(f) {
  func = f;
  console.info("[hook]", arguments.length);
  var ret = func.bind(this, [...arguments]);
  return ret;
}

myadd(1, 2);
g = hook_1(myadd);
g(1, 2);
