// @flow

import React from 'react';
import { SvgIcon } from 'material-ui';

const Icon = ({ fill = '#000000' }: { fill: string }): React$Element<*> =>
  <SvgIcon viewBox="0 0 44 44" style={{ width: 44, height: 44 }}>
    <title>linkedin</title>
    <desc>Created with Sketch.</desc>
    <defs>
        <circle id="path-1" cx="22" cy="22" r="22"></circle>
        <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="44" height="44" fill="white">
            <use xlinkHref="#path-1"></use>
        </mask>
    </defs>
    <g id="Social-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-420.000000, -60.000000)" id="linkedin">
            <g transform="translate(420.000000, 60.000000)">
                <rect id="Rectangle" x="0" y="0" width="44" height="44"></rect>
                <use id="Oval" stroke={fill} mask="url(#mask-2)" strokeWidth="4" xlinkHref="#path-1"></use>
                <path d="M12.5044685,18.4131131 L16.4026341,18.4131131 L16.4026341,31.9987194 L12.5044685,31.9987194 L12.5044685,18.4131131 Z M14.3541863,16.7137918 L14.3259643,16.7137918 C12.9148636,16.7137918 12,15.6752465 12,14.3600973 C12,13.0180561 12.9419097,12 14.3812324,12 C15.8193791,12 16.7036689,13.0154949 16.7318909,14.3562556 C16.7318909,15.6714048 15.8193791,16.7137918 14.3541863,16.7137918 L14.3541863,16.7137918 Z M32,32 L27.5797272,32 L27.5797272,24.9683698 C27.5797272,23.1281854 26.8882879,21.8732232 25.3678269,21.8732232 C24.2048448,21.8732232 23.5580903,22.7196824 23.2570555,23.537969 C23.1441675,23.8299398 23.1618062,24.2384428 23.1618062,24.6482264 L23.1618062,32 L18.7826905,32 C18.7826905,32 18.8391345,19.5451402 18.7826905,18.4131131 L23.1618062,18.4131131 L23.1618062,20.5452683 C23.420508,19.6130106 24.8198495,18.2824946 27.0529163,18.2824946 C29.8233772,18.2824946 32,20.2379306 32,24.4446152 L32,32 L32,32 Z" id="Shape" fill={fill}></path>
            </g>
        </g>
    </g>
  </SvgIcon>;

export default Icon;
