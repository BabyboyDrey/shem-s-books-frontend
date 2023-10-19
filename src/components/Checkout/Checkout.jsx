import React, { useState, useEffect } from 'react'

import { useSelector } from 'react-redux'
import './Checkout.css'
import PaystackPop from '@paystack/inline-js'
import { toast } from 'react-toastify'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import server from '../../server.js'
import axios from 'axios'

const Checkout = () => {
  const [cardCheckBox, setCardCheckBox] = useState(true)
  const [paypalCheckBox, setPaypalCheckBox] = useState(false)
  const [paystackBtnClicked, setPaystackBtnClicked] = useState(false)
  const [onDeliveryCheckBox, setOnDeliveryCheckBox] = useState(false)
  const { cart } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.user)
  const [cartData, setCartData] = useState([])
  const [userData, setUserData] = useState(null)
  const [totalProductPrices, setTotalProductPrices] = useState([])
  const [totalProductAmounts, setTotalProductAmounts] = useState([])
  const [addedTaxPrice, setAddedTaxPrice] = useState([])
  const [totalPaymentPrice, setTotalPaymentPrice] = useState(null)
  const [addressTypeIndex, setAddressTypeIndex] = useState(null)
  const [addressType, setAddressType] = useState('')
  const [streetName, setStreetName] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zipCode, setZipCode] = useState(null)
  const [paymentOptionIndex, setPaymentOptionIndex] = useState(null)
  const [payPalSelected, setPayPalSelected] = useState(false)
  useEffect(() => {
    if (cart) {
      setCartData(cart)
      console.log(`ZZ cartData:`, cartData)
    }
  }, [cart])

  useEffect(() => {
    if (userData?.addresses) {
      const aIndex = userData?.addresses?.findIndex(a => {
        return a.addressType.includes('default')
      })
      setAddressTypeIndex(aIndex)
    }
  }, [userData])

  useEffect(() => {
    if (cartData) {
      const updatePrices = cartData.map(c => c.totalProductPrice)
      setTotalProductPrices(updatePrices)
    }
  }, [cartData])

  useEffect(() => {
    if (cartData && totalProductAmounts) {
      const avg = totalProductAmounts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0)
      setTotalPaymentPrice(avg)
    }
  }, [cartData, totalProductAmounts])

  useEffect(() => {
    if (totalProductPrices) {
      const taxAmount = totalProductPrices.map(p => {
        return p * (7.5 / 100)
      })
      setAddedTaxPrice(taxAmount)
    }
  }, [cartData, totalProductPrices])

  useEffect(() => {
    if (addedTaxPrice) {
      const updatePrices = addedTaxPrice.map((p, index) => {
        const newP = p + totalProductPrices[index]
        return parseFloat(newP.toFixed(2))
      })
      setTotalProductAmounts(updatePrices)
    }
  }, [totalProductPrices, addedTaxPrice])

  useEffect(() => {
    if (user) {
      setUserData(user)
    }
  }, [user])

  const initialOptions = {
    clientId:
      'AVzpuD4UFq2vzpihtNdDl2DideOxz9U3LqTMx4o0Ay_HvrHbad3kj14N1q0gMXEKa1dWcFWYOMsAC8zd',
    currency: 'USD',
    intent: 'capture'
  }

  const handleOnDelivery = e => {
    setOnDeliveryCheckBox(e.target.checked)
    setCardCheckBox(false)
    setPaypalCheckBox(false)
    setPaymentOptionIndex(2)
  }
  const createReceipt = async (additionalDetails, paymentMethod) => {
    const receiptData = {
      productBought: cartData,
      totalCost: parseFloat(totalPaymentPrice?.toFixed(2)),
      paymentMethod,
      additionalDetails,
      purchaserId: user?._id,
      deliveryAddress: userData?.addresses[addressTypeIndex]
    }

    const orderItems = cartData?.map(c => ({
      _id: c._id
    }))
    console.log(`cartData, ${cartData.map(c => JSON.stringify(c, null, 2))}`)

    console.log(`orderItems:`, orderItems)

    await axios.post(`${server}/api/book/add-sold-out`, orderItems, {
      withCredentials: true
    })

    await axios
      .post(`${server}/api/receipt/create-receipt`, receiptData, {
        withCredentials: true
      })
      .then(r => {
        localStorage.removeItem('cartItems')
        window.location.href = '/success'
      })
      .catch(err => {
        toast.error(err.response)
        console.log(`err in posting receipt: ${err}`)
      })
  }
  const execPayment = async () => {
    try {
      const payStack = new PaystackPop()
      payStack.newTransaction({
        key: 'pk_test_6c813f3efa6407f317c96f870dd5abfa0cba32d9',
        amount: parseFloat(totalPaymentPrice?.toFixed(2)) * 100,
        email: userData.email,
        onSuccess (transaction) {
          const paystack = 'paystack'
          createReceipt(transaction, paystack)
        },
        onCancel () {
          toast.error('You have canceled the transaction')
        }
      })
    } catch (err) {
      toast.error(err)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (paymentOptionIndex !== null) {
      if (paymentOptionIndex === 0) {
        execPayment()
      } else if (paymentOptionIndex === 2) {
        let additionalDetails = 'No additional info'
        let paymentMethod = 'Pay on Delivery'
        createReceipt(additionalDetails, paymentMethod)
      }
    }
  }

  const orderItems = cartData.map(c => ({
    title: c.bookTitle,
    description: c.bookDesc
  }))

  const createOrder = (data, actions) => {
    return fetch(`${server}/api/order/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderData: {
          orderItems,
          totalCost:
            totalPaymentPrice != null && !isNaN(totalPaymentPrice)
              ? parseFloat(totalPaymentPrice?.toFixed(2))
              : 0,
          intent: 'capture'
        }
      })
    })
      .then(response => response.json())
      .then(order => order.id)
  }

  const onApprove = (data, actions) => {
    return fetch(`${server}/api/order/orders/${data.orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderID: data.orderID
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network res is not ok')
        } else {
          let paypal = 'paypal'
          createReceipt(data, paypal)
          return response.json()
        }
      })
      .catch(err => console.error('ERR', err))
  }

  return cartData && cartData.length > 0 ? (
    <PayPalScriptProvider options={initialOptions}>
      <div className='payment-order-bg-container'>
        <div className='order-summary-container'>
          <h3 className='order-summary'>Order summary</h3>
          <div className='order-summary-items-container'>
            {cartData.map((c, index) => (
              <div className='order-summary-item-container'>
                <div className='product-title-container'>
                  <span>{index + 1}</span>
                  <h3>{c.bookTitle}</h3>
                </div>
                <div className='coupon-container'>
                  <h3>Coupon:</h3>
                  <input type='text' disabled />
                </div>
                <div className='VAT-container'>
                  <h3>VAT(7.5%):</h3>
                  <h3>{`+N${parseFloat(addedTaxPrice[index]?.toFixed(2))}`}</h3>
                </div>
                <div className='total-price-container'>
                  <h3>Total price: {`N${totalProductAmounts[index]}`}</h3>
                </div>
              </div>
            ))}

            <div className='total-order-amount-container'>
              <h3>
                Total order amount: N{parseFloat(totalPaymentPrice?.toFixed(2))}
              </h3>
            </div>
          </div>
        </div>
        <div className='payment-information-container'>
          <h3 className='payment-info'>Payment information</h3>
          <div className='payment-info-items-container'>
            <div className='pay-with-card-container'>
              <div className='pay-with-card-checkbox-container'>
                <input
                  onChange={e => {
                    setCardCheckBox(e.target.checked)
                    setOnDeliveryCheckBox(false)
                    setPaypalCheckBox(false)
                  }}
                  checked={cardCheckBox}
                  type='checkbox'
                />
                <h3>Pay with card</h3>
              </div>
              {cardCheckBox && (
                <div className='confirm-payment-container'>
                  {paystackBtnClicked ? (
                    <div>
                      <h3>Click on "Confirm Payment" to continue</h3>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setPaystackBtnClicked(true)
                        setPaymentOptionIndex(0)
                      }}
                    >
                      Pay with Paystack
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className='pay-with-paypal-container'>
              <div className='pay-with-paypal-checkbox-container'>
                <input
                  onChange={e => {
                    setPaypalCheckBox(e.target.checked)
                    setPaymentOptionIndex(1)
                    setCardCheckBox(false)
                    setOnDeliveryCheckBox(false)
                  }}
                  checked={paypalCheckBox}
                  type='checkbox'
                />
                <h3>Pay with paypal</h3>
              </div>
              {paypalCheckBox && (
                <div className='pay-with-paypal-inputs-container'>
                  <PayPalButtons
                    createOrder={(data, actions) => createOrder(data, actions)}
                    onApprove={(data, actions) => onApprove(data, actions)}
                  />
                </div>
              )}
            </div>
            <div className='pay-on-delivery-container'>
              <div className='pay-on-delivery-checkbox-container'>
                <input
                  checked={onDeliveryCheckBox}
                  onChange={handleOnDelivery}
                  type='checkbox'
                />
                <h3>Pay on delivery</h3>
              </div>
              {onDeliveryCheckBox && (
                <div className='pay-with-paypal-inputs-container'>
                  <h3>Click on "Confirm Payment" to continue</h3>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='shipping-address-container'>
          <h3 className='shipping-name'>Shipping address</h3>
          {userData.addresses ? (
            <div className='shipping-address-inputs-items-container'>
              <div className='shipping-name-items-container'>
                <h3>Address name: </h3>
                <select
                  onChange={e => {
                    const updateAddressTypeIndex = userData.addresses.findIndex(
                      a => a.addressType === e.target.value
                    )
                    if (updateAddressTypeIndex !== -1) {
                      setAddressTypeIndex(updateAddressTypeIndex)
                    }
                  }}
                >
                  {userData &&
                    userData.addresses.map(a => (
                      <option key={a.addressType} value={a.addressType}>
                        {a.addressType}
                      </option>
                    ))}
                </select>
              </div>
              <div className='street-address-input-container'>
                <h3>Street address: </h3>
                <input
                  type='text'
                  placeholder='street address'
                  value={userData.addresses[addressTypeIndex]?.streetName}
                  required
                />
              </div>
              <div className='city-input-container'>
                <h3>State: </h3>
                <input
                  type='text'
                  placeholder='state'
                  value={userData.addresses[addressTypeIndex]?.state}
                  required
                />
              </div>
              <div className='country-input-container'>
                <h3>Country: </h3>
                <input
                  type='text'
                  placeholder='country'
                  value={userData.addresses[addressTypeIndex]?.country}
                  required
                />
              </div>
              <div className='zipcode-input-container'>
                <h3>Zip code: </h3>
                <input
                  type='number'
                  placeholder='zip code'
                  value={userData.addresses[addressTypeIndex]?.zipCode}
                  required
                />
              </div>
            </div>
          ) : (
            <div className='shipping-address-inputs-items-container'>
              <div className='shipping-name-items-container'>
                <h3>Address name: </h3>
                <select onChange={e => setAddressType(e.target.value)}>
                  <option value='Default'>Default</option>
                  <option value='Home'>Home</option>
                  <option value='Office'>Office</option>
                </select>
              </div>
              <div className='street-address-input-container'>
                <h3>Street address: </h3>
                <input
                  value={streetName}
                  onChange={e => setStreetName(e.target.value)}
                  type='text'
                  placeholder='street address'
                  required
                />
              </div>
              <div className='city-input-container'>
                <h3>State: </h3>
                <input
                  value={state}
                  onChange={e => setState(e.target.value)}
                  type='text'
                  placeholder='state'
                  required
                />
              </div>
              <div className='country-input-container'>
                <h3>Country: </h3>
                <input
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  type='text'
                  placeholder='country'
                  required
                />
              </div>
              <div className='zipcode-input-container'>
                <h3>Zip code: </h3>
                <input
                  value={zipCode}
                  onChange={e => setZipCode(e.target.value)}
                  type='number'
                  placeholder='zip code'
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className='confirm-payment-container'>
          <button
            disabled={paymentOptionIndex === 1}
            style={{
              backgroundColor:
                paymentOptionIndex === 1 ? 'whitesmoke' : '#00597e'
            }}
            type='submit'
            onClick={handleSubmit}
          >
            Confirm payment
          </button>
        </div>
      </div>
    </PayPalScriptProvider>
  ) : (
    <div>No products in cart</div>
  )
}

export default Checkout
