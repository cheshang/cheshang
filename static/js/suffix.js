(function() {

  window.suffix_any_case = function(s) {
    var i, j, m, r, result, suffix, t, tmp, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref;
    result = [];
    _ref = s.split(' ');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      suffix = _ref[_i];
      tmp = [""];
      for (_j = 0, _len1 = suffix.length; _j < _len1; _j++) {
        i = suffix[_j];
        t = [];
        r = [i.toUpperCase(), i.toLowerCase()];
        if (r[0] === r[1]) {
          r = r[0];
        }
        for (_k = 0, _len2 = r.length; _k < _len2; _k++) {
          j = r[_k];
          for (_l = 0, _len3 = tmp.length; _l < _len3; _l++) {
            m = tmp[_l];
            t.push(m + j);
          }
        }
        tmp = t;
      }
      for (_m = 0, _len4 = tmp.length; _m < _len4; _m++) {
        i = tmp[_m];
        result.push("*." + i);
      }
    }
    return result.join(';');
  };

}).call(this);
