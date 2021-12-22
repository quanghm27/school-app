export default function({ redirect, $const }) {
  const entered = JSON.parse(localStorage.getItem($const.ENTERED))

  if (entered) {
    redirect({
      name: 'auth-login-select-role',
    })
  }

  localStorage.setItem($const.ENTERED, true)
}
