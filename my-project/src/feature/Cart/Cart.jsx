import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectItemsIntoAddToCart, updateCartAsync, deleteItemByUserIdAsync, fetchItemByUserIdAsync } from './CartSlice';
import { selectLoggedInUser } from '../Auth/AuthSlice';
export default function Cart() {
  const [quan, SetQuan] = useState(0);

  const dispatch = useDispatch()
  const allItems = useSelector(selectItemsIntoAddToCart)
  const totalAmount = allItems.reduce((amount, item) => item.price * item.quantity + amount, 0)
  const totalItems = allItems.reduce((total, item) => item.quantity + total, 0)
  const handleQuantity = (event, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +event.target.value }))
  }
  const handleRemoveItem = (item) => {
    dispatch(deleteItemByUserIdAsync(item))
  }
  const user = useSelector(selectLoggedInUser)
  useEffect(() => {
    if (user) {
      dispatch(fetchItemByUserIdAsync(user?.id))
    }
  }, [user, dispatch, allItems.length])
  useEffect(() => {
    // This useEffect listens to changes in `allItems` from Redux
    // It will re-run whenever `allItems` in Redux changes
    console.log("allItems updated:", allItems);
  }, [allItems]);
  return (

    <div>
      <div>


        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
              </div>

              <div className="mt-8">
                <li className="space-y-4">



                  {allItems && allItems?.map((item, index) => (

                    <li className="flex items-center gap-4" key={index}>
                      {/* {SetQuan(item?.quantity)} */}
                      <img
                        src={item.thumbnail}
                        alt=""
                        className="h-16 w-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900">{item.title}</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">brand : </dt>
                            <dd className="inline">{item.brand}</dd>
                          </div>

                          <div>
                            <dt className="inline">category : </dt>
                            <dd className="inline">{item.category}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <form>
                          <label htmlFor="Line3Qty" className="sr-only"> Quantity </label>

                          <input
                            type="number"
                            min="1"
                            onChange={(e) => handleQuantity(e, item)}
                            max="100"
                            value={quan !== 0 ? quan : item.quantity}
                            id="Line3Qty"
                            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                          />
                        </form>

                        <button className="text-gray-600 transition hover:text-red-600" onClick={() => handleRemoveItem(item.id)}>
                          <span className="sr-only">Remove item</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}

                </li>

                <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div className="w-screen max-w-lg space-y-4">
                    <dl className="space-y-0.5 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <dt>Subtotal</dt>
                        <dd>$ {totalAmount}</dd>
                      </div>

                      <div className="flex justify-between">
                        <dt>Total Items Into Cart</dt>
                        <dd>{totalItems}</dd>
                      </div>

                      {/* <div className="flex justify-between">
                        <dt>Discount</dt>
                        <dd>-£20</dd>
                      </div> */}

                      {/* <div className="flex justify-between !text-base font-medium">
                        <dt>Total</dt>
                        <dd>£200</dd>
                      </div> */}
                    </dl>

                    <div className="flex justify-end">
                      <span
                        className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="-ms-1 me-1.5 h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                          />
                        </svg>

                        <Link to="/" className="whitespace-nowrap text-xs">Continue Shopping</Link>
                      </span>
                    </div>

                    <div className="flex justify-end">
                      <Link
                        to="/checkout"
                        className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}