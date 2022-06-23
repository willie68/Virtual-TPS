import { createApp } from 'vue';
import App from './App.vue';
import { createI18n } from 'vue-i18n';

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
import OverlayPanel from 'primevue/overlaypanel';
import Sidebar from 'primevue/sidebar';

const app = createApp(App);

export const i18n = createI18n({
    locale: 'de', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages: {
        en: {
            message: {
                welcome: 'Hello, Welcome to Virtual TPS, the TPS Editor and Simulator for your Browser.<br>'+
                '<a href="http://rcarduino.de/doku.php?id=arduino:arduinosps" target="_blank">TPS</a><br>'+
                'TPS is 4 Bit Interpreter designed by Burkhard Kainka, implemented on many platforms.'+
                '<a href="https://www.elektronik-labor.de/Lernpakete/TPS/TPS0.html" target="_blank">Die Tastenprogrammierbare Steuerung</a><br>' +
                'You can write your TPS programs here in Assembler or in TPS HEX directly, and test them.'+
                'If you find any issues, please report them on github. <a href = "https://github.com/willie68/Virtual-TPS/issues" target = "_blank">Virtual TPS issues</a>'
            }
        },
        de: {
            message: {
                welcome: 'Hallo, willkommen bei Virtual- TPS, dem TPS- Editor und Simulator für Ihren Browser.<br>' +
                    '<a href="http://rcarduino.de/doku.php?id=arduino:arduinosps" target="_blank">TPS</a><br>' +
                    'Die TPS ist eine von Burkhard Kainka entwickelter 4-Bit Interpreter, der auf verschiedenen Plattformen' +
                    'implementiert wurde.<br>' +
                    '<a href="https://www.elektronik-labor.de/Lernpakete/TPS/TPS0.html" target="_blank">Die Tastenprogrammierbare Steuerung</a><br>' +
                    '<br />Hier können Sie ihre TPS Programme in TPS Assembler oder auch direkt in TPS schreiben und mit einem Simulator' +
                    'testen.<br>' +
                    'Falls Sie Probleme fest gestellt haben, können Sie diese in github unter<a href = "https://github.com/willie68/Virtual-TPS/issues" target = "_blank">Virtual TPS issues</a> berichten.'
            }
        }
    }
    // If you need to specify other options, you can set other options
    // ...
})

app.use(i18n);

app.config.globalProperties.asmurl = "https://localhost:9543/api/v1/asm/generate";
app.config.globalProperties.islocal = false;

if (window.location.hostname.includes("wkla.no-ip.biz")) {
    app.config.globalProperties.asmurl = "https://wkla.no-ip.biz/vtps/api/v1/asm/generate";
    app.config.globalProperties.islocal = false;
}

if (window.location.hostname.includes("amplify")) {
    app.config.globalProperties.asmurl = "https://c0hyzuel25.execute-api.eu-central-1.amazonaws.com/Beta/asm";
    app.config.globalProperties.islocal = false;
}

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
app.component('OverlayPanel', OverlayPanel);
app.component('Sidebar', Sidebar);

app.mount('#app')
