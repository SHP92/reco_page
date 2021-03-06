import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        height: 100vh;
        display: block;
        /* background: rgba(254, 208, 110, 1.0); */
        @font-face {
            font-family:'Nanum Gothic';
            src: url(${require('./fonts/Nanum Gothic.ttf')});
        }
        font-family: 'Nanum Gothic';
        overflow-y: hidden;
        overflow-x: hidden;
        line-height: 1.2em;
        /* padding: 3em; */
    }
`
export default GlobalStyle;