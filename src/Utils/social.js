// @flow
import React from 'react';

import urlParse from 'url-parse';
import EmptyIcon from '../Styles/svgs/empty.jsx';
import FacebookIcon from '../Styles/svgs/facebook.jsx';
import GoogleIcon from '../Styles/svgs/googleplus.jsx';
import InstagramIcon from '../Styles/svgs/instagram.jsx';
import LinkedinIcon from '../Styles/svgs/linkedin.jsx';
import OkIcon from '../Styles/svgs/ok.jsx';
import TwitterIcon from '../Styles/svgs/twitter.jsx';
import VkIcon from '../Styles/svgs/vk.jsx';
import YoutubeIcon from '../Styles/svgs/youtube.jsx';
import colors from '../Styles/core/_colors.scss';

export const getSocialImage = ({ url }:{ url: string }): React$Element<*> => {
  const parsedUrl = urlParse(url).host;
  console.log(parsedUrl);
  if (!parsedUrl) {
    return {
      icon: <EmptyIcon fill={colors.color_gray_medium} />,
      name: parsedUrl,
    }
  }

  switch (parsedUrl) {
    case 'vk.com':
      return {
        icon: <VkIcon fill={'rgb(76, 113, 163)'} />,
        name: 'ВКОНТАКТЕ',
      };

    case 'facebook.com':
      return {
        icon: <FacebookIcon fill={'rgb(57, 87, 150)'} />,
        name: 'FACEBOOK',
      };

    case 'plus.google.com':
      return {
        icon: <GoogleIcon fill={'rgb(204, 55, 49)'} />,
        name: 'GOOGLE PLUS',
      };

    case 'instagram.com':
      return {
        icon: <InstagramIcon fill={'rgb(49, 102, 152)'} />,
        name: 'GOOGLE PLUS',
      };

    case 'linkedin.com':
      return {
        icon: <LinkedinIcon fill={'rgb(0, 122, 182)'} />,
        name: 'LINKEDIN',
      };

    case 'ok.com':
      return {
        icon: <OkIcon fill={'rgb(250, 146, 20)'} />,
        name: 'ODNOKLASSNIKI',
      };

    case 'twitter.com':
      return {
        icon: <TwitterIcon fill={'rgb(42, 169, 222)'} />,
        name: 'TWITTER',
      };

    case 'youtube.com':
      return {
        icon: <YoutubeIcon fill={'rgb(206, 42, 54)'} />,
        name: 'TWITTER',
      };

    default:
      return {
        icon: <EmptyIcon fill={colors.color_gray_medium} />,
        name: parsedUrl,
      }
  }
}
