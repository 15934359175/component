import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";

class Main extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div>首页</div>
        )
    }
}
render(<Main/>,document.querySelector("#root"));





