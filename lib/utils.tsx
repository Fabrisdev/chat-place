export function pickRandom(array: any[]){
    return array[Math.floor(Math.random() * array.length)]
}

export const messages = {
    error: ["NOOOOOOOOOOOOOOO", "¡Esto no puede seguir así!", "El mango del poder hoy no está de tu lado.", "Lo siento :/", "No quería que acabase así..."],
    warning: ["¡Ojo!", "¡Ojito!", "¡Ve con cuidado!", "¡Ten cuidado!", "¡Cuidado!"],
    accept: ["Está bien", "Entendido", "Vale", "Comprendido"]
}

export const colors = {
    confirm: '#00c04b',
    cancel: '#d33',
}