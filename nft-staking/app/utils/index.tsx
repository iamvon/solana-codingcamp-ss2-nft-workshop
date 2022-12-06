export const GetImageFromNftUri = async (uri: string) => {
    const response = await fetch(uri);
    const data = await response.json();
    console.log("data?.image:", data?.image)
    return data?.image || undefined
}