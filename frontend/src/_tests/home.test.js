import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "../redux/store";
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from "../articles/home";
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom';

test('should render home component', () => {
    render(<Provider store={store}>
        <Router>
            <Home></Home>
        </Router>
    </Provider>)
    const homeElement = screen.getByTestId('home-1');
    expect(homeElement).toBeInTheDocument();
    expect(homeElement).toHaveTextContent('Search');
}
)

test("render test", () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}>
        <Router>
            <Home></Home>
        </Router>
    </Provider>, div);
})

test('matches snapshot', () => {
    const tree = renderer.create(<Provider store={store}>
        <Router>
            <Home></Home>
        </Router>
    </Provider>).toJSON()
    console.log(tree);
    expect(tree).toMatchSnapshot();
})