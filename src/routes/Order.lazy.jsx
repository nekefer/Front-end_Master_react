import { useState, useEffect, useContext } from 'react'
import Pizza from '../Pizza'
import Cart from '../Cart'
import { CartContext } from '../contexts'
import { createLazyFileRoute } from '@tanstack/react-router'

const intl = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const Route = createLazyFileRoute('/Order')({
  component: Order,
})

function Order() {
  const [pizzaTypes, setPizzaTypes] = useState([])
  const [pizzaType, setPizzaType] = useState('pepperoni')
  const [pizzaSize, setPizzaSize] = useState('M')
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useContext(CartContext)

  let price, selectedPizza

  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id)
    price = intl.format(selectedPizza.sizes[pizzaSize])
  }

  async function fetchPizzaTypes() {
    await new Promise((resolve) => setTimeout(resolve, 3000)) // remove this later, just to show you the loading state

    const pizzasRes = await fetch('/api/pizzas')
    const pizzasJson = await pizzasRes.json()
    setPizzaTypes(pizzasJson)
    setLoading(false)
  }

  async function checkout() {
    setLoading(true)

    await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart,
      }),
    })

    setCart([])
    setLoading(false)
  }

  useEffect(() => {
    fetchPizzaTypes()
  }, [])

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }])
        }}
      >
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select
              name="pizza-type"
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
            >
              {pizzaTypes.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}{' '}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Type</label>
            <div>
              <span>
                <input
                  checked={pizzaSize === 'S'}
                  type="radio"
                  name="pizza-size"
                  value="S"
                  id="pizza-s"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === 'M'}
                  type="radio"
                  name="pizza-size"
                  value="M"
                  id="pizza-m"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === 'L'}
                  type="radio"
                  name="pizza-size"
                  value="L"
                  id="pizza-l"
                  onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        {loading ? (
          <h1>Loading pizza lol</h1>
        ) : (
          <div className="order-pizza">
            <Pizza
              name={selectedPizza.name}
              description={selectedPizza.description}
              image={selectedPizza.image}
            />
            <p> {price} </p>
          </div>
        )}
        {loading ? (
          <h2>LOADING …</h2>
        ) : (
          <Cart cart={cart} checkout={checkout} />
        )}
      </form>
    </div>
  )
}
