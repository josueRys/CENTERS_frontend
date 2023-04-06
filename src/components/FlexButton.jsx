import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Tooltip } from "antd";

const FlexButton = (props) => {
    const [_style, setStyle] = useState({});
    const [_color, setColor] = useState('#FFF');
    const [_icon, setIcon] = useState(faPlus);

    useEffect(() => {
        let { color, icon, size, bgColor, style } = props;
        setStyle({
            width: size || 50,
            height: size || 50,
            borderRadius: size || 50,
            backgroundColor: bgColor || '#001529',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            top:  style?.top || 'none',
            left:  style?.left || 'none',
            right:  style?.right || 'none',
            bottom:  style?.bottom || 'none',
            position: style?.position ||'fixed'
        });
        setIcon(icon || faPlus);
        setColor(color || '#FFF');
    }, [props]);

    const onClick = (e) => { }

    return (
        <Tooltip placement={props.tooltipPosition || 'top'} title={props.titleTip || 'Agregar'}>
            <div style={_style} onClick={props.onClick !== undefined ? props.onClick : onClick}>
                <FontAwesomeIcon icon={_icon} color={_color} size='1x' />
            </div>
        </Tooltip>
    );
}

FlexButton.propTypes = {
    size: PropTypes.number,
    bgColor: PropTypes.string,
    style: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        position: PropTypes.oneOf([
            '-moz-initial',
            '-webkit-sticky',
            'absolute',
            'fixed',
            'inherit',
            'initial',
            'relative',
            'revert',
            'static',
            'sticky',
            'unset'
        ])
    }),
    icon: PropTypes.any,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default FlexButton;