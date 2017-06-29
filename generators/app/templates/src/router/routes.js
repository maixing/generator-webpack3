import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import cookie from 'js-cookie';
import indexview from '../view/Index';
import login from '../view/login/Login';
import main from '../view/module/Main';
import homepage from '../view/module/home/HomePage';
import training from '../view/module/training/Training';
import competitions from '../view/module/competition/Competition';
import publish from '../view/module/publish/Publish';
import review from '../view/module/review/ReView';
import operatelog from '../view/module/operatelog/OperateLog';
import usermanager from '../view/module/usermanager/UserManager';
import safemanager from '../view/module/safemanger/SafeSet';


function onEnter(nextState, replace, callback) {
    let agent = navigator.userAgent;
    console.log(agent);
    var regStr_ie = /MSIE\/[\d.]+/gi;
    var regStr_ff = /Firefox\/[\d.]+/gi;
    var regStr_chrome = /Chrome\/[\d.]+/gi;
    var regStr_saf = /Safari\/[\d.]+/gi;
    var edge = /rv:[\d.]+/gi;
//IE
    if (agent.indexOf('rv') > 0 && agent.indexOf('.NET') > 0) {
        console.log(agent.match(edge) + '---->' + (agent.match(edge) + '').match(/[\d]+/));
    }
//IE
    if (agent.indexOf('MSIE') > 0) {
        console.log(agent.match(regStr_ie) + '---->' + (agent.match(regStr_ie) + '').match(/[\d]+/));
    }

//firefox
    if (agent.indexOf('Firefox') > 0) {
        console.log(agent.match(regStr_ff) + '---->' + (agent.match(regStr_ff) + '').match(/[\d]+/));
    }

//Chrome
    if (agent.indexOf('Chrome') > 0) {
        console.log(agent.match(regStr_chrome) + '---->' + (agent.match(regStr_chrome) + '').match(/[\d]+/));
    }

//Safari
    if (agent.indexOf('Safari') > 0 && agent.indexOf('Chrome') < 0) {
        console.log(agent.match(regStr_saf) + '---->' + (agent.match(regStr_saf) + '').match(/[\d]+/));
    }
    if (cookie.get('sid') == undefined) {
        if (nextState.location.pathname != '/login') {
            replace('/login');
        }
    } else if (nextState.location.pathname == '/login') {
        replace('/homepage');
    }
    callback();
}
function onChange(prevState, nextState, replace, callback) {
    if (cookie.get('sid') == undefined) {
        if (nextState.location.pathname != '/login') {
            replace('/login');
        }
    } else if (nextState.location.pathname == '/login') {
        replace('/homepage');
    }
    callback();
}
export default (
    <Route path="/" onEnter={onEnter.bind(this)} onChange={onChange.bind(this)} component={indexview}>
        <IndexRedirect to="/login"/>
        <Route path="/login" component={login}/>
        <Route path="/main" component={main}>
            <Route path="/homepage" component={homepage}></Route>
            <Route path="/training" component={training}></Route>
            <Route path="/competitions" component={competitions}></Route>
            <Route path="/publish" component={publish}></Route>
            <Route path="/review" component={review}></Route>
            <Route path="/operatelog" component={operatelog}></Route>
            <Route path="/usermanager" component={usermanager}></Route>
            <Route path="/safemanager" component={safemanager}></Route>
        </Route>
    </Route>
);
