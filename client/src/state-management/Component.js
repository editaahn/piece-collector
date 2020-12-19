import Store from './Store.js';

export default class Component {
  constructor(props = {}) { // props로 store과 event로 subscribe할 데이터의 key값을 받음
    let self = this;
    
    this.render = this.render || function () {};
    
    if(props.store instanceof Store) {
      props.keys.forEach(key => {
        props.store.events.subscribe(`${key}Change`, () => self.render());
      })
    }
  }
}