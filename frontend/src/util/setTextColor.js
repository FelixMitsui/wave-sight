
export const setTextColor = (color) => {

    const colors = {
        "white": "ffffff",
        "black": "000000",
        "gray": "808080",
        "glue": "0000FF",
        "dark-blue": "00008a",
        "dark-turquoise": "00ced1",
        "denim": "1560BD",
        "navy": "000080",
        "red": "FF0000",
        "purple": "800080",
        "violet": "8B00FF",
        "lavender": "e6e6fa",
        "pink": "FFC0CB",
        "uellow": "FFFF00",
        "beige": "f5f5dc",
        "orange": "FFA500",
        "brown": "A52A2A",
        "coffee": "4D3900",
        "khaki": "A52A2A",
        "khaki-green": "8A865D",
        "green": "00FF00",
        "olive": "808000",
        "light-green": "90EE90",
        "cyan": "00FFFF"

    }

    if (typeof colors[color] != 'undefined') {

        const compareColor = 384
        const colorArray = []
        for (let i = 0; i < colors[color].length; i++) {
            colorArray.push(parseInt(colors[color].slice(i, i + 2), 16))
            i++
        }
        return (colorArray[0] + colorArray[1] + colorArray[2]) > compareColor
    }

    return {}


}
