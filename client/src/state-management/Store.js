import PubSub from "./PubSub.js";

export default class Store {
  constructor(params) {
    let self = this;
    self.actions = {};
    self.mutations = {};
    self.state = {};
    self.status = "resting";

    self.events = new PubSub(); // PubSub

    if (params.hasOwnProperty("actions")) {
      self.actions = params.actions;
    }

    if (params.hasOwnProperty("mutations")) {
      self.mutations = params.mutations;
    }

    // set trap: 어디선가 params.state의 데이터를 바꾸려 시도할 때 인터셉트하여 함수 발생
    self.state = new Proxy(params.state || {}, {
      set: function (state, key, value) {
        state[key] = value;

        console.log(`${key}Change: ${key}: ${value}`);

        self.events.publish(`${key}Change`, self.state);

        if (self.status !== "mutation") {
          console.warn(`You should use a mutation to set ${key}`);
        }

        self.status = "resting";

        return true;
      },
    });
  }

  dispatch(actionKey, payload) {
    let self = this;

    if (typeof self.actions[actionKey] !== "function") {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }

    console.groupCollapsed(`ACTION: ${actionKey}`);

    self.status = "action";
    self.actions[actionKey](self, payload); // 액션을 발생시킴

    console.groupEnd();

    return true;
  }

  commit(mutationKey, payload) {
    let self = this;

    if (typeof self.mutations[mutationKey] !== "function") {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    self.status = "mutation";
    let newState = self.mutations[mutationKey](self.state, payload);
    self.state[newState[0]] = newState[1]

    return true;
  }
}
