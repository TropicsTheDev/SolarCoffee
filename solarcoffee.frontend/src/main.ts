import moment from "moment";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


Vue.config.productionTip = false;

Vue.filter("price", (number: number) => {
  if (isNaN(number)) {
    return "-";
  }

  return "$ " + number.toFixed(2);
});

Vue.filter("humanizeDate", (date: Date) => {
  return moment(date).format("MMMM Do YYYY");
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
