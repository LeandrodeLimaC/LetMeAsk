type ButtonProps = {
    text: string
}

export function Button(prop: ButtonProps) {
    return (
        <button>{prop.text}</button>
    )
}