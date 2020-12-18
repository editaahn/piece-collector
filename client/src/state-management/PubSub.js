export default class PubSub {
  constructor() {
    this.events = {}; 
  }

  // event(string)라는 unique 값의 이벤트를 추가하고 콜백함수를 등록함
  // Component의 render 메서드를 콜백으로 등록할 예정
  subscribe(event, callback) {
    let self = this;

    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = [];
    }

    return self.events[event].push(callback);
  }

  // event(string)라는 unique 값의 이벤트에 등록된 콜백함수를 실행함
  publish(event, data = {}) {
    let self = this;

    if (!self.events.hasOwnProperty(event)) {
      return [];
    }

    return self.events[event].map((callback) => callback(data));
  }
}
