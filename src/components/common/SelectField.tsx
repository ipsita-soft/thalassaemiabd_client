import Select, { SingleValue } from 'react-select';
import { useField } from 'formik';

interface SelectFieldProps {
    field: {
        name: string;
    };
    [key: string]: any;
}

function SelectField(props: SelectFieldProps) {
    const [, , helpers] = useField(props.field.name);
    const { setValue, setTouched } = helpers;

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            minHeight: '45px',          
            height: '45px',             
            fontSize: '12px',         
        }),
        valueContainer: (provided: any) => ({
            ...provided,
            padding: '0 8px',           
        }),
        input: (provided: any) => ({
            ...provided,
            margin: '0',                
            padding: '0',               
        }),
        singleValue: (provided: any) => ({
            ...provided,
            fontSize: '12px',           
        }),
        option: (provided: any) => ({
            ...provided,
            fontSize: '12px',         
            padding: '8px 10px',     
        }),
    };
    const onChange = (newValue: SingleValue<{ value: any }>) => {
        setValue(newValue ? newValue.value : null);
    };

    const onBlur = () => {
        setTouched(true);
    };

    return (
        <Select {...props} onChange={onChange} onBlur={onBlur} styles={customStyles} />
    );
}

export default SelectField;
