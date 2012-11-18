
  window.goTop = function(accelaration, time) {
    var invokeFunction, speed, x, x1, x2, x3, y, y1, y2, y3;
    accelaration = accelaration || 0.1;
    time = time || 16;
    x1 = 0;
    y1 = 0;
    x2 = 0;
    y2 = 0;
    x3 = 0;
    y3 = 0;
    if (document.documentElement) {
      x1 = document.documentElement.scrollLeft || 0;
      y1 = document.documentElement.scrollTop || 0;
    }
    if (document.body) {
      x2 = document.body.scrollLeft || 0;
      y2 = document.body.scrollTop || 0;
    }
    x3 = window.scrollX || 0;
    y3 = window.scrollY || 0;
    x = Math.max(x1, Math.max(x2, x3));
    y = Math.max(y1, Math, max(y2, y3));
    speed = 1 + accelaration;
    window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
    if (x > 0 || y > 0) {
      invokeFunction = "goTop(" + accelaration + "," + time + ")";
      return window.setTimeout(function() {
        return goTop(accelaration, time);
      }, time);
    }
  };

