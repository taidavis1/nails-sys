import React from 'react';
import Svg, { Path } from 'react-native-svg';

const IconGiftCardOutline = ({ keyIcon, activeKeyIcon, sizeIcon, theme }) => {
    const styles = {
        st0: {
            stroke: theme.colors.text1,
            fill: keyIcon === activeKeyIcon ? theme.colors.text1 : 'none',
            strokeLinecap: 'round',
            strokeMiterlimit: 10,
            strokeWidth: 2,
        },
    };

    return (
        <Svg id="icon-add-outline" viewBox={`0 0 32 32`} width={sizeIcon || 32} height={sizeIcon || 32}>
            <path style={styles.st0} d="M10,1H5A4,4,0,0,0,1,5V7h9Z" />
            <path style={styles.st0} d="M31,7V5a4,4,0,0,0-4-4H14V7Z" />
            <path style={styles.st0} d="M1,11v6a4,4,0,0,0,4,4h5V11Z" />
            <path style={styles.st0} d="M14,21H27a4,4,0,0,0,4-4V11H14Z" />
        </Svg>
    );
};

export default IconGiftCardOutline;
