import React,{Component} from "react";
import ReactDOM,{render} from "react-dom";
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

class Main extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <DatePicker />
            </div>

        )
    }
}
render(<Main/>,document.querySelector("#root"));





