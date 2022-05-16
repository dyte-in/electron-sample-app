import { createRoot } from 'react-dom/client';
import { defineCustomElements } from '@dyte-in/ui-kit/loader';
import App from './App';
import './samples/electron-store'
import './samples/preload-module'
import './styles/index.css'

const root = createRoot(document.getElementById('root')!)
defineCustomElements(window);
root.render(<App />);
window.removeLoading();
