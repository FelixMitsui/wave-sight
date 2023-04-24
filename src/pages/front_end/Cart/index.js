/** @format */
import React, { useState, useCallback } from 'react'
import { Table, Stack, Button, Row } from 'react-bootstrap'
import { matchRoutes } from 'react-router-dom'
import { routes } from '../../../routesList'
import { useSelector, useDispatch } from 'react-redux'
import { userTypes } from '../../../redux/userModule'
import Loading from '../../../components/Loading'
import CartItem from '../../../containers/CartItem'
import BreadCrumb from '../../../components/BreadCrumb'
import uuid from 'react-uuid';

const Cart = () => {
  const dispatch = useDispatch()


  const matches = matchRoutes(routes, location.pathname)
  const { user } = useSelector((state) => state.user)
  const [isLoading, setIsLoading] = useState(false)
  const [totalCash, setTotalCash] = useState(0)

  const handleCalculate = useCallback((priceNumber) => {
    setTotalCash((prev) => prev + priceNumber)
  }, [])
  const updateItemQuantity = useCallback(async (quantity) => {
    setIsLoading(true)
    await dispatch({ type: userTypes.UPDATE_ITEM_QUANTITY_REQUEST, payload: quantity })
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [])
  const deleteCartItem = useCallback((userInfo, priceNumber) => {
    setTotalCash((prev) => prev - priceNumber)
    dispatch({ type: userTypes.DELETE_CART_ITEM_REQUEST, payload: userInfo })
  }, [])

  return (
    <>
      {isLoading ?
        <Loading />
        : null}
      <BreadCrumb matches={matches} />
      <div className="bg-gray">
        <h1 style={{ fontFamily: "fantasy" }}
          className="mt-2 border  text-white d-flex justify-content-center">
          Cart
        </h1>
      </div >
      <Table striped bordered hover responsive>
        <thead>
          <tr className="fs-5 font-content">
            <th>No.</th>
            <th>Image</th>
            <th>Name</th>
            <th>Color</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody >{user?.shopping_cart?.map((item, index) => (
          <CartItem
            key={item.product_mark}
            number={index}
            userId={user._id}
            item={item}
            handleCalculate={handleCalculate}
            deleteCartItem={deleteCartItem}
            updateItemQuantity={updateItemQuantity}
          />
        ))}</tbody>
      </Table>
      <Stack direction="horizontal" gap={5} className='mt-3'>
        <div className="bg-light border ms-auto">
          <h3 className="fs-3 font-content">Totall:{Math.floor(totalCash)}$</h3>
        </div>
        <Button
          className="bg-beige text-black fs-4 font-btn">
          Confirm
        </Button>
      </Stack>
    </>
  )
}
export default Cart
