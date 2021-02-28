import React, { useContext } from 'react';
import CreatableSelect from 'react-select/creatable';

import { Colors } from '../../../../util/colors';
import { ModificationContext } from '../modification-context';


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
    const { modifications } = useContext(ModificationContext);
    const allModifications = Object.values(modifications).map((mod) => ({
        value: mod,
        label: mod.name,
    }));

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
                noOptionsMessage={() => 'Start typing to create your first modifier...'}
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