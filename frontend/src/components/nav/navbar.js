import React from 'react';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    getLinks() {
        if(this.props.loggedIn) {
            return (
                <div>
                    <Link to={'/groups'}>All Groups</Link>
                    <Link to={'/discover'}>See Acts</Link>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to={'/signup'}>Sign Up</Link>
                    <Link to={'/login'}>Log In</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h1>BRO-CHELLA</h1>
                {this.getLinks()}
            </div>
        )
    }
}

export default NavBar;