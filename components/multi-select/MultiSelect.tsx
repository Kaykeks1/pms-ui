import { useState, useEffect } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MultiSelect = ({ list, addSelection, removeSelection, selections }) => {
    const [value, setValue] = useState({ label: '', value: '' })
    useEffect(() => {
        if (value.value) {
            addSelection(value)
            setValue({ label: '', value: '' })
        }
    }, [value])
    const deleteItem = (index) => {
        removeSelection(index);
    }
    const setSelection = (e) => {
        setValue(
            {
                label: e.target[e.target.selectedIndex].text,
                value: e.target.value
            }
        )
    }
    return (
        <>
            <select className='border-solid border-black border h-10 rounded p-2 w-full' name="input" value={value.value} onChange={setSelection}>
                <option disabled value=''> -- select an option -- </option>
                {
                    list.map(({ label, value }, key) => 
                        <option key={key} value={value}>{label}</option>
                    )
                }
            </select>
            <div className="flex w-full flex-wrap px-2 mt-2">
                {
                    selections.map((item, key) =>
                    <div className='rounded py-1 px-2 bg-violet-300 mr-2 mb-1 text-white'  key={key}>{item.label} <FontAwesomeIcon icon={faTimes} className='ml-2 cursor-pointer' onClick={() => deleteItem(key)} /></div>
                    )
                }
            </div>
        </>
    )
}

export default MultiSelect
