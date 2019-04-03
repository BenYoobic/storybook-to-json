import { storiesOf } from '@storybook/html';

import markdown from './readme.md';

storiesOf('App', module)
    .add('about', () => {
        let about = document.createElement('yoo-about');
        about.logo = './assets/logo/operations_simple.svg';
        about.version = '1.0.0';
        about.app = 'My App';
        return about;
    }, { notes: { markdown }  })
    .add('about', () => `<yoo-about logo="./assets/logo/operations_simple.svg" version="1.0.0" app="YOBI Design System" ></yoo-about>`
        , { notes: { markdown } });
