import { renderComponent } from 'src/utils';
import testCSSModuleComponent from 'src/pages/testCSSModuleComponent';
import testSassModuleComponent from 'src/pages/testSassModuleComponent';

const container = document.getElementById('root');
renderComponent(container, testCSSModuleComponent);
renderComponent(container, testSassModuleComponent);
