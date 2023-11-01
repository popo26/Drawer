export default function InputField({htmlFor, type, name, id, placeholder}) {
    return (
        <>
        <label htmlFor={htmlFor}>{placeholder}:</label>
        <input type={type} name={name} id={id} placeholder={placeholder}/>
        </>
    )
}