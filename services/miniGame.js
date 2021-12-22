export default ({ $axios2 }) => ({
  JOIN_EVENT() {
    return $axios2.$post('JOIN_EVENT')
  },
  GET_QUESTION() {
    return $axios2.$post('GET_QUESTION')
  },
  GET_TICKET() {
    return $axios2.$post('GET_TICKET')
  },
  TICKET_OWNED() {
    return $axios2.$post('TICKET_OWNED')
  },
  TICKET_REWARDED(params) {
    return $axios2.$post('TICKET_REWARDED', params)
  },
  KIOSK_TICKET_REWARDED(params) {
    return $axios2.$post('KIOSK_TICKET_REWARDED', params)
  },
  LEADER_BOARD(params) {
    return $axios2.$post('LEADER_BOARD', params)
  },
  SUGGEST_REWARD(params) {
    return $axios2.$post('SUGGEST_REWARD', params)
  },
  REWARD_POSTER_CODE(params) {
    return $axios2.$post('REWARD_POSTER_CODE', params)
  },
  REWARD_PYJAMA_CODE(params) {
    return $axios2.$post('REWARD_PYJAMA_CODE', params)
  },
})
