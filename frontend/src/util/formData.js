
export const imgFormData = (imgs) => {

    if (!imgs) {
        return
    }

    const formData = new FormData()
    const getBlobBydataURI = (dataURI, type) => {
        const binary = window.atob(dataURI.split(',')[1]);
        const array = [];
        for (let i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], { type: type });
    }
    const blobArray = []
    for (const img of imgs) {
        const $blob = getBlobBydataURI(img.imgSrc, 'image/png/jpg')
        formData.append('imgSrc', $blob, img.imgName)
        blobArray.push($blob)
    }
    return formData.getAll('imgSrc')

}
