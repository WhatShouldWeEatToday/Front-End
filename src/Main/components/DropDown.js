export const DropDown = ({value, setSelectedFood, setIsOpen, isOpen}) =>{
    const ValueClick = () => {
        setSelectedFood(value)
        setIsOpen(!isOpen)
    }
    return(
        <li onClick={ValueClick}>{value}</li>
    )
}