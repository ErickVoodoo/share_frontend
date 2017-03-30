// @flow

import React from 'react';
import { SvgIcon } from 'material-ui';

const Icon = ({ fill = '#000000' }: { fill: string }): React$Element<*> =>
  <SvgIcon viewBox="0 0 44 44" style={{ width: 44, height: 44 }}>
    <title>facebook</title>
    <desc>Created with Sketch.</desc>
    <defs>
        <circle id="path-1" cx="22" cy="22" r="22"></circle>
        <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="44" height="44" fill="white">
            <use xlinkHref="#path-1"></use>
        </mask>
    </defs>
    <g id="Social-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-60.000000, -60.000000)" id="facebook">
            <g transform="translate(60.000000, 60.000000)">
                <rect id="Rectangle" x="0" y="0" width="44" height="44"></rect>
                <use id="Oval" stroke={fill} mask="url(#mask-2)" strokeWidth="4" xlinkHref="#path-1"></use>
                <path d="M23.3147057,35 L18.4372418,35 L18.4372418,23.4985483 L16,23.4985483 L16,19.535534 L18.4372418,19.535534 L18.4372418,17.1562737 C18.4372418,13.9234411 19.8127074,12 23.7230238,12 L26.9776468,12 L26.9776468,15.964466 L24.9435074,15.964466 C23.4212558,15.964466 23.3206665,16.5182719 23.3206665,17.5518493 L23.3139606,19.535534 L27,19.535534 L26.5685836,23.4985483 L23.3139606,23.4985483 L23.3139606,35 L23.3147057,35 Z" id="Shape" fill={fill}></path>
            </g>
        </g>
    </g>
  </SvgIcon>;

export default Icon;
