import EgButton from './src/EgButton.vue'

EgButton.install = function (Vue) {
    Vue.component(EgButton.name, EgButton);
};

export default EgButton;