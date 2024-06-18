import { renderComponent } from './utils';
import testCSSModuleComponent from './pages/testCSSModuleComponent';
import testSassModuleComponent from './pages/testSassModuleComponent';

const container = document.getElementById('root');
renderComponent(container, testCSSModuleComponent);
renderComponent(container, testSassModuleComponent);
