import Select, { SingleValue } from 'react-select';
import { useField } from 'formik';

interface OptionType {
    value: string | number;
    label: string;
}

interface CountryFilterProps {
    id: string;
    name: string;
    options: OptionType[];
    placeholder?: string;
    onChangeCountry?: (selectedCountry: OptionType | null) => void; // New prop for handling country change
    [key: string]: any;
}

const CountryFilter: React.FC<CountryFilterProps> = ({ name, options, placeholder, onChangeCountry, ...props }) => {
    const [field, , helpers] = useField(name);
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

    const onChange = (newValue: SingleValue<OptionType>) => {
        setValue(newValue ? newValue.value : null);
        if (onChangeCountry) {
            onChangeCountry(newValue); // Call the onChangeCountry prop when the country changes
        }
    };

    const onBlur = () => {
        setTouched(true);
    };

    return (
        <Select
            {...props}
            name={name}
            options={options}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            styles={customStyles}
            defaultValue={options.find(option => option.value === field.value)}
        />
    );
};

export default CountryFilter;
