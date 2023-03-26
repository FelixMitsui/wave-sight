//@flow
type ImageArg = {
    setFieldValue: Object,
    fieldName: string,
    values: Array<Object>,
    event: Object
}

export const getImageSrc = ({ event, fieldName, setFieldValue, values = [] }: ImageArg) => {

    for (const file of event.target.files) {
        const reader = new FileReader();
        reader.onload = () => {
            values.push({ imageUrl: reader.result, imageFile: file })
            setFieldValue(fieldName, values)
        }
        reader.readAsDataURL(file)
    }

}

