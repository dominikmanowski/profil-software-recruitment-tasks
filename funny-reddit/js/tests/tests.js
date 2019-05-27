const describe = (desc, fn) => {
  console.log(desc);
  fn();
};

const it = (msg, fn) => describe("   " + msg, fn);

const matchers = exp => ({
  toBe: assertion => {
    if (exp === assertion) {
      console.log("   " + "%c pass ", "background: green; color: white");
      return true;
    } else {
      console.log("   " + "%c fail ", "background: red; color: white");
      return false;
    }
  },
  isEqual: assertion => {
    if (JSON.stringify(exp) === JSON.stringify(assertion)) {
      console.log("   " + "%c pass ", "background: green; color: white");
      return true;
    } else {
      console.log("   " + "%c fail ", "background: red; color: white");
      return false;
    }
  }
});

const expect = exp => matchers(exp);
