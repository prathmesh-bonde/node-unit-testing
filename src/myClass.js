import { XMLHttpRequest } from "xmlhttprequest";

class myClass {
  constructor() {}

  sayHello() {
    return "Hello";
  }

  add(arg1, arg2) {
    return arg1 + arg2;
  }

  testFunc(arg1, arg2) {
    this.sayHello();
    const result = this.add(arg1, arg2);
    return result;
  }

  testCallback(callback) {
    callback();
  }

  testPromise() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(10), 5000);
    }).then((result) => {
      return result * 2;
    });
  }

  testXHRFunc() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("post", "https://httpbin.org/post", true);

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(xhr.status);
          }
        }
      };
      xhr.send();
    })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }
}

export default myClass;
