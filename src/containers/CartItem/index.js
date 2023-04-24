/** @format */
import React, { useState, useEffect, useRef, memo } from 'react'
import { Button, Image } from 'react-bootstrap'
import useSyncCallback from '../../hooks/useSyncCallback'
import { BACKEND_IMAGE_URL } from '../../util/constants/url'

const CartItem = ({
  item, number, userId,
  handleCalculate,
  updateItemQuantity,
  deleteCartItem,
}) => {
  const countRef = useRef(0)
  console.log(countRef.current++);
  const {
    product_mark,
    product_image,
    product_name,
    product_color,
    product_size,
    product_quantity,
    product_discount,
    product_price,
  } = item

  const [disabled, setDisabled] = useState(false)
  const [quantity, setQuantity] = useState(Number(product_quantity))

  useEffect(() => {
    handleCalculate(product_price * quantity * product_discount)
  }, [])

  const asyncUpdateQuantity = useSyncCallback(() => {
    updateItemQuantity({
      user_id: userId,
      product_mark,
      product_quantity: quantity
    })
  })


  const handleIncrement = () => {
    if (quantity >= 1) {
      setQuantity((prev) => prev + 1)
      handleCalculate(product_price * product_discount)
    }
    asyncUpdateQuantity()
  }

  const handleDecrement = () => {
    if (quantity <= 1) {
      setDisabled(true);
      return
    }
    setQuantity((prev) => prev - 1)
    handleCalculate(-product_price * product_discount)
    asyncUpdateQuantity()
    if (quantity - 1 === 1) {
      setDisabled(false);
    }
  }

  return (
    <tr className="text-center font-content">
      <th>{number + 1}</th>
      <th>
        <Image
          fluid={true}
          responsive="md"
          thumbnail={true}
          width={100}
          height={100}
          className="mx-auto d-block "
          src={product_image}
        />
      </th>
      <th>{product_name}</th>
      <th>{product_color}</th>
      <th>{product_size}</th>
      <th>
        <div className="d-flex">
          <input
            className="me-1 btn-gray"
            type="button"
            disabled={disabled}
            value="-"
            onClick={() => handleDecrement()}
          />
          {quantity}
          <input
            className="ms-1 btn-gray"
            type="button"
            value="+"
            onClick={() => handleIncrement()}
          />
        </div>
      </th>
      <th>NT{Math.floor(product_price * quantity * product_discount)}$</th>
      <th >
        <Button
          className='mt-2 btn-beige border border-1 border-black font-content'
          onClick={() =>
            deleteCartItem({
              user_id: userId,
              product_mark
            }, product_price * quantity * product_discount)
          }>
          Delete
        </Button>
      </th>
    </tr>
  )
}
export default memo(CartItem)
