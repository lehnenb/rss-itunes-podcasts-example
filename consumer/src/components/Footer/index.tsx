import React, { memo } from 'react';
import { Layout } from 'antd';

import './Footer.scss';

const Footer: React.FunctionComponent = () => (
  <Layout.Footer className="footer">
    BLS ©2020 Created by Bruno Lehnen
  </Layout.Footer>
);

export default memo(Footer);
