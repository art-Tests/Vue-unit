// import Vue from 'vue'
import { destroyVM, createTest } from "../util";
import sinon from "sinon";
import Hello from "@/components/Hello";

describe("Hello", () => {
  let vm, alert;

  beforeEach(() => {
    alert = sinon.spy(window, "alert"); // spy一個alert，以便訪問這個方法
    vm = createTest(Hello);
  });

  afterEach(() => {
    alert.restore(); // 每次案例測試完得銷毀
    destroyVM(vm);
  });

  it("總分為所有節數加起來的分數", () => {
    vm.scores = {
      firstSection: 1,
      twoSection: 2,
      threeSection: 3,
      fourSection: 5,
      extendSection: 0
    };
    expect(vm.total).toBe(11);
  });

  it("不可以加或減超過一分", () => {
    vm.scores.firstSection = 2;
    vm.submit();
    expect(alert.args[0][0]).toBe("只能增加或減少一分");
  });

  it("只能更新一節的分數", () => {
    vm.scores.firstSection = 1;
    vm.scores.twoSection = 1;
    vm.submit();
    expect(alert.args[0][0]).toBe("只能更新一節的分數");
  });

  it("不可以加或減超過一分且只能更新一節的數分", () => {
    vm.scores.firstSection = 2;
    vm.scores.twoSection = 1;
    vm.submit();
    expect(alert.args[0][0]).toBe("只能增加或減少一分");
    expect(alert.args[1][0]).toBe("只能更新一節的分數");
  });
});
