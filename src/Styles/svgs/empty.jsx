// @flow

import React from 'react';
import { SvgIcon } from 'material-ui';

const Icon = ({ fill = '#000000' }: { fill: string }): React$Element<*> =>
  <SvgIcon viewBox="0 0 44 44" style={{ width: 44, height: 44 }}>
    <title>empty</title>
    <desc>Created with Sketch.</desc>
    <defs>
        <circle id="path-1" cx="22" cy="22" r="22"></circle>
        <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="44" height="44" fill="white">
            <use xlinkHref="#path-1"></use>
        </mask>
    </defs>
    <g id="Social-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-240.000000, -120.000000)" id="medium">
            <g transform="translate(240.000000, 120.000000)">
                <use id="Oval" stroke={fill} mask="url(#mask-2)" strokeWidth="4" xlinkHref="#path-1"></use>
                <text id="?" fontFamily="Helvetica" fontSize="36" fontWeight="normal" fill={fill}>
                    <tspan x="12" y="35">?</tspan>
                </text>
            </g>
        </g>
    </g>
  </SvgIcon>;

export default Icon;
