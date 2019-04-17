import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getLink } from '../../../utils';
import './index.scss';

const propTypes = {
  text: PropTypes.string.isRequired, // 显示的文案
  img: PropTypes.string.isRequired, // 显示的图片链接
};

const Bar = (props) => {
  const { text, img, bgImg } = props;
  const cls = classnames({
    bar: true,
  });
  return (
    <div style={{background: `url(${getLink(bgImg)})  top center no-repeat`}} className={cls}>
      <div className="bar-body">
        <p>{text}</p>
      </div>
    </div>
  );
};

Bar.propTypes = propTypes;

export default Bar;
