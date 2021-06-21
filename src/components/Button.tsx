type ButtonProps = {
    text?: string
}

export function Button(prop: ButtonProps) {
    return (
        <button>{prop.text || "Valor padrão"}</button>
    )
}