export default function InputField({htmlFor, type, name, id, placeholder, value, handleNewDrawerChange}) {

const handleChange =(e) => {
    let value = e.target.value;
    handleNewDrawerChange(value)
}

    return (
        <>
        <label htmlFor={htmlFor}>{placeholder}:</label>
        <input type={type} name={name} id={id} placeholder={placeholder} value={value} onChange={handleChange}/>
        </>
    )
}