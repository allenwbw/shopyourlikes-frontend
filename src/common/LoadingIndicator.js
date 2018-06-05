import React from 'react';
import { Spin, Icon } from 'antd';


/** Function that renders a spinning loading indicator */
export default function LoadingIndicator(props) {
    const antIcon = <Icon type="loading-3-quarters" style={{ fontSize: 30 }} spin />;
    return (
        <Spin indicator={antIcon} style = {{display: 'block', textAlign: 'center', marginTop: 30}} />
    );
}