import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        height: 90vh;
        display: block;
        background: rgba(254, 208, 110, 1.0);
        @font-face {
            font-family:'Nanum Gothic';
            src: url(${require('./fonts/Nanum Gothic.ttf')});
        }
        font-family: 'Nanum Gothic';
        overflow-y: hidden;
        line-height: 1.2em;
    }
`
export default GlobalStyle;