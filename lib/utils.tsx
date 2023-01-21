import { createAvatar } from '@dicebear/core'
import { pixelArt } from '@dicebear/collection'
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

export async function checkIfHasAvatarOrUseDefault(supabase: any, userId: string){
    const userHasAvatar = await doesUserHasAvatar()
    if(userHasAvatar) return
    const svg = createSvgAvatar()
    const blob = svgToBlob(svg)
    const file = blobToFile(blob)
    const fileName = `${userId}.svg`
    await uploadFileToStorage(supabase, file, fileName)
    await uploadFileNameToDatabase(supabase, userId, fileName)
    async function doesUserHasAvatar(){
        const { data, error } = await supabase
            .from('profiles')
            .select('avatar_file_name')
            .eq('id', userId)
            .single()
        if(error)
            throw 'An error ocurred while getting the avatar file name: '+error
        return !!data.avatar_file_name
    }

    function createSvgAvatar(){
        const randomSeed = (Math.random() + 1).toString().substring(7)
        const avatar = createAvatar(pixelArt, {
            'seed': randomSeed
        })
        const svg = avatar.toString()
        return svg
    }

    function svgToBlob(svg: string){
        const blob = new Blob([svg], { type: 'image/svg+xml' })
        return blob
    }

    function blobToFile(blob: Blob){
        const file = new File([blob], `${userId}.svg`, { type: "image/svg+xml" })
        return file
    }

}

export async function uploadFileToStorage(supabase: any, file: File, fileName: string){
    const { error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true })
    if(error)
        throw 'An error ocurred while trying to upload an avatar to the storage: '+error
}

export async function uploadFileNameToDatabase(supabase: any, userId: string, fileName: string){
    const { error } = await supabase
        .from('profiles')
        .update({
            avatar_file_name: fileName,
        })
        .eq('id', userId)

    if (error)
        throw 'An error ocurred while updating the avatar file name in the database: '+error
}

export async function getUserAvatar(supabase: any, userId: string){
    const fileName = await getAvatarFileName(supabase, userId)
    const url = await getAvatarUrl(supabase, fileName)
    return url
}
export async function getAvatarUrl(supabase: any, avatarFileName: string){
    const { data, error } = await supabase.storage.from('avatars').download(avatarFileName)
    if (error)
        throw 'An error ocurred while trying to get the avatar url: ' + error
    const url = URL.createObjectURL(data)
    return url
}

export async function getAvatarFileName(supabase: any, userId: string) {
    const { data, error } = await supabase
        .from('profiles')
        .select('avatar_file_name')
        .eq('id', userId)
        .single()
    if (error)
        throw 'An error ocurred while trying to get the avatar file name: ' + error
    return data.avatar_file_name
}

export async function getUserUsernameAndDiscriminator(supabase: any, userId: string){
    const { data, error } = await supabase
        .from('profiles')
        .select('username, discriminator')
        .eq('id', userId)
        .single()
    if(error)
        throw 'An error ocurred while trying to get the user username and discriminator: '+error
    return data
}