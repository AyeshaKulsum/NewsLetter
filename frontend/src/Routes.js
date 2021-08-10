
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './articles/home'
import Subscribe from './articles/subscribe'
import Login from './users/login'
import Profile from './users/profile'
import SignUp from './users/signup'
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/" exact component={Home} />
                <Route path="/user-profile" exact component={Profile} />
                <Route path="/user-subscribe" exact component={Subscribe} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes