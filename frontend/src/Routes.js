
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './articles/home'
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
                <Route path="/profile" exact component={Profile} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes