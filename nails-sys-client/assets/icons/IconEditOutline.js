import React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconEditOutline = ({ nameIcon, activeNameIcon, sizeIcon, theme }) => {
    const styles = {
        st0: {
            fill: 'none',
            stroke: theme.colors.text1,
            strokeLinecap: 'round',
            strokeMiterlimit: 10,
            strokeWidth: 2,
        },
    };

    return (
        <Svg id="icon-add-outline" viewBox={`0 0 32 32`} width={sizeIcon || 32} height={sizeIcon || 32}>
            <Path style={styles.st0} d="M17.69,18.56l-5,.7.7-5L26.17,1.59a2,2,0,0,1,2.83,0L30.41,3a2,2,0,0,1,0,2.83Z" />
            <Path style={styles.st0} d="M18,3H5A4,4,0,0,0,1,7V27a4,4,0,0,0,4,4H25a4,4,0,0,0,4-4V14" />
        </Svg>
    );
};

export default IconEditOutline;
