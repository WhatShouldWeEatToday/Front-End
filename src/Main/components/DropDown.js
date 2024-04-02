export const DropDown = ({value, setSelected, setIsOpen, isOpen}) =>{
    const ValueClick = () => {
        setSelected(value)
        setIsOpen(!isOpen)
    }
    return(
        <li onClick={ValueClick}>{value}</li>
    )
}