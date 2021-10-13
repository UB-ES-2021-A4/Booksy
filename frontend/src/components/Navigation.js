import React, {Component} from "react";

class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-white bg-white">
                <a href="" className="text-black">
                    {this.props.title}
                </a>
            </nav>
        );
    }
}

export default Navigation;
