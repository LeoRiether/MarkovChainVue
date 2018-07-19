import "regenerator-runtime/runtime";

let dict = {};

Array.prototype.last = function () { // yup...
  return this[this.length-1];
};

function curl(url) {
  return fetch(url)
  .then(res => res.text())
  .catch(e => console.error(e))
}

function randw(o) {
  let s = 0;
  let r = ~~(Math.random() * o['sum ']);
  for (let k in o) {
    if (k === "sum ") continue;
    s += o[k];
    if (r < s) return k;
  }
}

function* words(t) {
  let w = '';
  for (let i = 0; i < t.length; i++) {
    if (t[i] === ' ' || t[i] === '\n') { yield w; w = ''; }
    else w += t[i];
  }
  yield w;
}

export default {
  get dict() { return dict; },

  load(s) {
    return Promise.resolve()
    // Fetch url if necessary
    .then(_ => {
      if (s.startsWith('url '))
        return curl(s.slice(4));
      return s;
    })
    // Build the dictionary
    .then(s => {
      dict = {};
      let wgen = words(s);
      let lw = wgen.next().value;
      for (let w of wgen) {
        if (!dict[lw]) dict[lw] = {};
        dict[lw][w] = (dict[lw][w] || 0) + 1;
        dict[lw]['sum '] = (dict[lw]['sum '] || 0) + 1;
        lw = w;
      }
    })
    .catch(e => console.error(e));
  },

  generate(s) {
    let dkeys = Object.getOwnPropertyNames.call(Object, dict);
    let o = [dkeys[~~(Math.random() * dkeys.length)]];
    for (let i = 1; i < s; i++) {
      if (dict[o.last()]) {
        o.push(randw(dict[o.last()]));
      } else {
        o.push(dkeys[~~(Math.random() * dkeys.length)]);
      }
    }
    return o.join(' ');
  }
}