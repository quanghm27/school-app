import { JWT_TOKEN_MINIGAME, ROLE } from '@/constants'

export default function({ store, redirect, route }) {
  if (store.state.userRole !== ROLE.STUDENT) {
    return redirect({ name: 'index' })
  }

  if (!sessionStorage.getItem(JWT_TOKEN_MINIGAME)) {
    return redirect({ name: 'index' })
  }
}
