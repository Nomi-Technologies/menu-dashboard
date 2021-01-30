import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

import Client from '../../../../util/client';
import { Colors } from '../../../../util/colors';


const dropDownStyle = {
    control: (provided) => ({
        ...provided,
        background: `${Colors.SLATE_LIGHT}`,
        padding: '8px',
        border: 'none',
        cursor: 'text',
    }),
    option: (provided, state) => ({
        ...provided,
        background: state.isFocused ? `${Colors.ORANGE_LIGHTEST}` : 'white',
        fontFamily: 'HK Grotesk Light',
        padding: '12px 20px',
    }),

};

export default ({ style, onSelect, onCreate }) => {
    const [allModifications, setAllModifications] = useState([]);

    useEffect(() => {
        Client.getAllModifications().then((res) => {
            const modifications = res.data.map((modification) => ({
                value: modification,
                label: modification.name
            }));
            setAllModifications(modifications);
        });
    }, []);

    return (
        <div style={style}>
            <CreatableSelect
                value={null}
                options={allModifications}
                placeholder='Start typing to begin...'
                components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                }}
                styles={dropDownStyle}
                onChange={onSelect}
                onCreateOption={onCreate}
                createOptionPosition='first'
                formatCreateLabel={(modification) => <>
                    <span
                        style={{
                            color: `${Colors.ORANGE}`,
                            fontFamily: 'HK Grotesk Regular',
                        }}
                    >+ Create new dish modification </span>
                    {modification}
                </>}
            />
        </div>
    )
};