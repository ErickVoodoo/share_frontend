// @flow

import React from 'react';
import { SvgIcon } from 'material-ui';

const Icon = ({ fill = '#000000' }: { fill: string }): React$Element<*> =>
  <SvgIcon viewBox="0 0 44 44" style={{ width: 44, height: 44 }}>
    <title>vk</title>
    <desc>Created with Sketch.</desc>
    <defs>
        <circle id="path-1" cx="22" cy="22" r="22"></circle>
        <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="44" height="44" fill="white">
            <use xlinkHref="#path-1"></use>
        </mask>
    </defs>
    <g id="Social-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-300.000000, -61.000000)" id="vk">
            <g transform="translate(300.000000, 61.000000)">
                <rect id="Rectangle" x="0" y="0" width="44" height="44"></rect>
                <use id="Oval" stroke={fill} mask="url(#mask-2)" strokeWidth="4" xlinkHref="#path-1"></use>
                <path d="M22.7260375,29.931282 C22.7260375,29.931282 23.1772326,29.8820719 23.4083325,29.6384215 C23.6198685,29.4151753 23.6125319,28.9938882 23.6125319,28.9938882 C23.6125319,28.9938882 23.5844087,27.0266816 24.5149221,26.7362215 C25.4319853,26.4505625 26.6094945,28.6386148 27.8591459,29.4799887 C28.8031097,30.1161202 29.5196417,29.9768915 29.5196417,29.9768915 L32.8589745,29.931282 C32.8589745,29.931282 34.6050629,29.8256602 33.7772605,28.4777816 C33.7087864,28.3673587 33.2942739,27.4803754 31.2950761,25.6583987 C29.2005037,23.7512045 29.4817364,24.0596682 32.0030489,20.7601862 C33.538824,18.7509708 34.152645,17.5243172 33.9606731,16.9998088 C33.7784832,16.4981051 32.6486614,16.6313326 32.6486614,16.6313326 L28.889925,16.6541373 C28.889925,16.6541373 28.6111378,16.6169296 28.4044929,16.7381547 C28.202739,16.8569793 28.0719046,17.1342366 28.0719046,17.1342366 C28.0719046,17.1342366 27.4776477,18.6885579 26.6840823,20.0112313 C25.0101363,22.800608 24.3412915,22.9482385 24.0673953,22.7754027 C23.4303421,22.3709191 23.5892997,21.1526673 23.5892997,20.2872884 C23.5892997,17.5831294 24.0074805,16.4560964 22.7761703,16.1644361 C22.3677715,16.067216 22.0669748,16.0036029 21.0215227,15.9928006 C19.6801649,15.9795979 18.5454521,15.9976016 17.9022851,16.3060654 C17.4743222,16.5113078 17.1441795,16.9698026 17.3459334,16.996208 C17.5941518,17.0286147 18.1566173,17.1450388 18.4549685,17.5435212 C18.840135,18.0584276 18.8266848,19.2130663 18.8266848,19.2130663 C18.8266848,19.2130663 19.0480027,22.3961243 18.3094611,22.791006 C17.8032423,23.062262 17.1087197,22.5089477 15.6157408,19.9776244 C14.8515215,18.6813564 14.2743831,17.2482602 14.2743831,17.2482602 C14.2743831,17.2482602 14.1631127,16.9806048 13.9638043,16.836575 C13.7229224,16.6625391 13.3866659,16.6085279 13.3866659,16.6085279 L9.81501039,16.6313326 C9.81501039,16.6313326 9.27822273,16.6457356 9.08135983,16.874983 C8.90650644,17.0778249 9.06790957,17.499112 9.06790957,17.499112 C9.06790957,17.499112 11.864341,23.9216397 15.0312659,27.1587089 C17.9352994,30.1257222 21.2318359,29.931282 21.2318359,29.931282 L22.7260375,29.931282 Z" id="Shape" fill={fill}></path>
            </g>
        </g>
    </g>
  </SvgIcon>;

export default Icon;
