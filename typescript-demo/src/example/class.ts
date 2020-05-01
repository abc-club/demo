// 类型兼容
{
  class Animal {
    private name: string;
    constructor(theName: string) {
      this.name = theName;
    }
  }

  class Rhino extends Animal {
    constructor() {
      super('Rhino');
    }
  }

  class Employee {
    private name: string;
    constructor(theName: string) {
      this.name = theName;
    }
  }

  let animal = new Animal('Goat');
  let rhino = new Rhino();
  let employee = new Employee('Bob');

  animal = rhino;
  animal = employee; // 错误: Animal 与 Employee 不兼容.

  class A {
    name: string = 'default';
  }
  class B {
    name: string = 'default2';
  }
  let a = new A();
  let b = new B();
  a = b; // okay typescript只比较结构
  console.log(a instanceof A); // fasle
  console.log(a instanceof B); // true

  interface IO1 {
    name: string;
  }
  interface IO2 {
    firstname: string;
  }
  interface IO3 {
    firstname: string;
    name: string;
  }
  let o1: IO1 = { name: 'xiaoming' };
  let o2: IO2 = o1; // error Property 'firstname' is missing in type 'IO1' but required in type 'IO2'.
  let o11: IO1 = { name: 'xiaoming', nickname: 'nn' };
  let o3: IO3 = { name: 'xiaoming', firstname: 'xiao' };
  let o4: IO2 = o3; // okay
  let o5: IO3 = o4;
}

{
  abstract class Department {
    constructor(public name: string) {}

    printName(): void {
      console.log('Department name: ' + this.name);
    }

    abstract printMeeting(): void; // 必须在派生类中实现
  }

  class AccountingDepartment extends Department {
    constructor() {
      super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
      console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
      console.log('Generating accounting reports...');
    }
  }

  let department: Department; // 允许创建一个对抽象类型的引用
  department = new Department(); // 错误: 不能创建一个抽象类的实例
  department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
  department.printName();
  department.printMeeting();
  department.generateReports(); // 错误: 方法在声明的抽象类中不存在
  // NOTE 方法 属性存不存在要看你的类型上面有没有

  let accountingDepartment: AccountingDepartment;
  accountingDepartment = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
  accountingDepartment.printName();
  accountingDepartment.printMeeting();
  accountingDepartment.generateReports();
}
