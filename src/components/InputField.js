function InputField(props) {
    return (
        <div className="input-field">
            <label htmlFor={props.name}>{props.label}</label>
            <input defaultValue={props.value} type={props.type} name={props.name} id={props.name} />
        </div>
    )
}

export default InputField