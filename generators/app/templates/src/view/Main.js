/**
 * Created by maixing on 2017/6/11.
 */

import React from 'react';
import config from './Consts.js';
export default class Main extends React.PureComponent{
    constructor(){
        super();
        this.state = {
            configName:config.name
        }
    }
    render(){
        return(
            <div>hallo,{this.state.configName}
            </div>
        )
    }
}