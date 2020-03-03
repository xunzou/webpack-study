import './assets/css/index.css'

class Animal {
  constructor(name){
    this.name = name
  }
  eat(){
    console.log('名字是：',this.name)
  }
}
const dog = new Animal('小狗狗')
console.log(123)
dog.eat()