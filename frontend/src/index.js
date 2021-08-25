import ReactDOM from 'react-dom';
import Routes from './routes';
import './index.css'
import { Provider } from "react-redux";
import store from "./redux/store";
ReactDOM.render(
    <Provider store={store}>
        <Routes /></Provider>, document.getElementById('rss'));