import { storiesOf } from '@storybook/html';

import markdown from './readme.md';

storiesOf('App', module)
    .add('login', () => {
        let login = document.createElement('yoo-login');
        login.leftPanelMobileHeaderIcon = './assets/logo/operations_simple.svg';
        login.leftPanelWebHeaderIcon = './assets/logo/operations_landscape_light.svg';
        login.buttonClass = 'success';
        login.webTitleText = 'Welcome';
        login.webLoginFormTitle = 'Welcome';
        login.webLoginFormSubtitle = 'Please log in'
        return login;
    }, { notes: { markdown } })
    .add('login - HTML', () => `<yoo-login 
    left-panel-mobile-header-icon="./assets/logo/operations_simple.svg"
    left-panel-web-header-icon="./assets/logo/operations_landscape_light.svg"
    button-class="success"
    web-title-text="Welcome"
    web-login-form-title="Welcome"
    web-login-form-subtitle="Please log in"
    ></yoo-login>`);