import { createApp } from 'vue';
import App from './App.vue';

import "primevue/resources/themes/vela-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Textarea from 'primevue/textarea';
import Toolbar from 'primevue/toolbar';
import ScrollPanel from 'primevue/scrollpanel';
import Tooltip from 'primevue/tooltip';
import Checkbox from 'primevue/checkbox';
import InputSwitch from 'primevue/inputswitch';
import Knob from 'primevue/knob';
import RadioButton from 'primevue/radiobutton';
import ToggleButton from 'primevue/togglebutton';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Listbox from 'primevue/listbox';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Dropdown from 'primevue/dropdown';

const app = createApp(App);

app.use(PrimeVue);

app.directive('tooltip', Tooltip);

app.component('Dialog', Dialog);
app.component('Button', Button);
app.component('Panel', Panel);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('Textarea', Textarea);
app.component('Toolbar', Toolbar);
app.component('ScrollPanel', ScrollPanel);
app.component('Checkbox', Checkbox);
app.component('InputSwitch', InputSwitch);
app.component('Knob', Knob);
app.component('RadioButton', RadioButton);
app.component('ToggleButton', ToggleButton);
app.component('InputNumber', InputNumber);
app.component('Listbox', Listbox);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Dropdown', Dropdown);
app.component('InputText', InputText);

app.mount('#app')
