import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import DropDownMenu from "./components/DropDownMenu.vue";

import "./assets/style.css";

const app = createApp(App);

app.use(createPinia());

app.component("DropDownMenu", DropDownMenu);

app.mount("#app");
