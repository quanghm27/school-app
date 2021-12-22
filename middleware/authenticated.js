export default function({ store, redirect, route, $const }) {
  // If user is not logged in
  if (!store.state.userInfo) {
    if (JSON.parse(localStorage.getItem($const.ENTERED))) {
      redirect({
        name: 'auth-login-select-role',
      })
    }

    redirect({ name: 'auth-login-boarding' })
  }
}
