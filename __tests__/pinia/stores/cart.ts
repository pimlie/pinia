import { createStore } from '../../../src'
import { useUserStore } from './user'

export const useCartStore = createStore(
  'cart',
  () => ({
    rawItems: [] as string[],
  }),
  {
    items: state =>
      state.rawItems.reduce((items, item) => {
        const existingItem = items.find(it => it.name === item)

        if (!existingItem) {
          items.push({ name: item, amount: 1 })
        } else {
          existingItem.amount++
        }

        return items
      }, [] as { name: string; amount: number }[]),
  }
)

export function addItem(name: string) {
  const store = useCartStore()
  store.state.rawItems.push(name)
}

export function removeItem(name: string) {
  const store = useCartStore()
  const i = store.state.rawItems.indexOf(name)
  if (i > -1) store.state.rawItems.splice(i, 1)
}

export async function purchaseItems() {
  const cart = useCartStore()
  const user = useUserStore()
  if (!user.state.name) return

  console.log('Purchasing', cart.items.value)
  const n = cart.items.value.length
  cart.state.rawItems = []

  return n
}
