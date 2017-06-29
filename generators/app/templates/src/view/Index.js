/**
 * Created by maixing on 2017/3/3.
 */
import React from 'react';
import {Spin, message} from 'antd';
import './Index.scss';
import cookie from 'js-cookie';
import action from '../util/Action';
import actionType from '../util/ActionType';
import {RouteTransition} from 'react-router-transition';
import spring from 'react-motion/lib/spring';
const popConfig = {stiffness: 360, damping: 25};
let timeout = 0;
export default class Main extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        console.log('Main componentDidMount');
        this.loadSubscribe = action.subscribe(this.onChangeLoadingState.bind(this));
    }

    onChangeLoadingState(e) {
        if (e.name == actionType.SHOWLOADING) {
            clearTimeout(timeout);
            timeout = setTimeout(this.onTimeOut.bind(this), 10000);
            this.setState({
                loading: true
            });
        } else if (e.name == actionType.HIDELOADING) {
            clearTimeout(timeout);
            this.setState({
                loading: false
            });
        } else if (e.name == actionType.LOGINTIMMEOUT) {
            this.setState({
                loading: false
            });
            message.info('登录超时或异常');
            cookie.remove('sid');
            this.props.router.replace('/login');
        }
    }

    componentWillUnmount() {
        this.loadSubscribe.dispose();
    }

    onTimeOut() {
        this.setState({
            loading: false
        });
    }

    render() {
        return (
            <div style={{width: '100%', height: '100%', position: 'relative'}}>
                <Spin className="main-spin" size="large" spinning={this.state.loading} tip="数据加载中"></Spin>
                {this.props.children}
            </div>
        );
    }
}