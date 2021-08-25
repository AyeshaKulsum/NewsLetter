import { render, screen, cleanup } from '@testing-library/react'
import Home from '../articles/home'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { useEffect, useState } from "react";
import Base from "../base";
import { fetchArticlesFromServer } from "../redux/actions/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history';
const initialState = {
    allsources: [],
    articles: [],
    auth: true,
    messages: { success_message: "", error_message: "" },
    sources: [],
    user: { email: "", userName: "", subscribedSources: [] }
};
let mockStore = configureStore([thunk]);
let store;

test('should render home component', () => {
    store = mockStore(initialState)
    const history = createMemoryHistory({
        initialEntries: ['/starting/point']
    });
    render(<Router history={history}><Provider store={store}><Home /></Provider></Router>)
    const homeElement = screen.getByTestId('home-1');
    expect(homeElement).toBeInTheDocument();
    expect(homeElement).toHaveTextContent('Articles');
    expect(homeElement).toContainHTML('<form>');
})


test('matches snapshot', () => {
    store = mockStore(initialState)
    const tree = renderer.create(<Provider store={store}><Home /></Provider>).toJSON()
    console.log(tree);
    expect(tree).toMatchSnapshot();
})