import myClass from "../src/myClass.js";
import * as chai from "chai";
import { expect } from "chai";
import Sinon from "sinon";
import chaiAsPromised from "chai-as-promised";
import nock from "nock";

const obj = new myClass();
chai.use(chaiAsPromised);

// root level hook
beforeEach(() => {
  console.log("------- Before each test case");
  Sinon.restore();
});

// creating a test suite using describe method
describe("test suite 1", () => {
  // hooks in mocha that should be used -
  // these are applicable for this test suite only
  before(() => console.log("------- Before test suite"));
  // beforeEach(() => console.log("------- Before each test case"));
  after(() => console.log("------- After test suite"));
  afterEach(() => console.log("------- After each test case"));

  // write test cases here using it method
  it("test case for hello world", () => {
    // test the method/class, etc here by calling
    // and assert or expect, etc. the result using assert, expect methods from chai.js
    expect(obj.sayHello()).to.be.equal("Hello");
  });

  it("test case for add functin", () => {
    expect(obj.add(10, 20)).to.be.equal(30);
  });
});

describe("test suite for spy", () => {
  it("spy the add method", () => {
    var spy = Sinon.spy(obj, "add");
    var arg1 = 10,
      arg2 = 20;
    obj.testFunc(arg1, arg2);
    // assertions using sinon
    // Sinon.assert.calledOnce(spy); // check if called once, passes
    // Sinon.assert.calledWith(spy); // check what functions it is calling
    // Sinon.assert.calledTwice(spy); // check if called 2 times, fails

    // assertions using chai
    expect(spy.calledOnce).to.be.true; // passes
    // expect(spy.calledTwice).to.be.true;   fails
    expect(spy.calledWith(arg1, arg2)).to.be.true; // pass
    // expect(spy.calledWith(3, arg2)).to.be.true; // fails
  });

  it("spy the callback method", () => {
    var callback = Sinon.spy();
    obj.testCallback(callback);
    expect(callback.calledOnce).to.be.true;
  });
});

describe("test suite for mock", () => {
  // methods should always be mocked if it has no impact on the calling method
  it("mock the sayHello method", () => {
    var mock = Sinon.mock(obj);
    var expectations = mock.expects("sayHello"); // expect add to be called
    expectations.exactly(1); // expect to be called once

    // call the func to test it
    obj.testFunc(10, 20);
    mock.verify();
  });
});

describe("test suite for stub", () => {
  // stubs mean that we assume func1 is returning a specific value and write the test case on basis of it
  it("stub the add method", () => {
    var stub = Sinon.stub(obj, "add");
    stub.withArgs(10, 20).returns(40); // assume it returns 40 as value

    // call the func2 to test it
    expect(obj.testFunc(10, 20)).to.be.equal(40);
  });
});

describe("test suite for testing promised", () => {
  // for async test and hooks, done() should be called which ensures completion of test
  it("test the promise method using done", (done) => {
    // call the func to test it
    obj.testPromise().then(function (result) {
      expect(result).to.be.equal(20);
      done();
    });
  }).timeout(0); // this will wait for as long as promise is resolved / rejected

  // another way is to use chai-as-promised package instead of done calls
  it("test the promise method using chai-as-promised", () => {
    // call the func to test it
    return expect(obj.testPromise()).to.be.eventually.equal(20);
  }).timeout(0); // this will wait for as long as promise is resolved / rejected;
});

describe("test suite to stub XHR calls", () => {
  // bypassing actual ajax calls
  it("mock and stub xhr call ", (done) => {
    const scope = nock("https://httpbin.org")
      .post("/post")
      .reply(200, { id: 123 });
    // with this we are saying make a dummy call to the url and we're expecting 200 as status and an id 123
    obj
      .testXHRFunc()
      .then(function (result) {
        expect(result).to.deep.equal({ id: 123 }); // tc passes
        // expect(result).to.be.equal({ id: 1234 }); // tc fails
        done();
      })
      .catch((err) => done(new Error("test case failed", err)));
  });
});
