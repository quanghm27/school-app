export default {
  // account_create_set && account_create_check
  E0001: 'pop_error_duplicated_id', // LoginID đã tồn tại
  E0002: 'pop_error_not_match_varification_code', // Mã xác thực không đúng
  E0003: 'pop_error_expired_varification_code', // Mã xác thực hết hạn
  E0005: 'pop_error_duplicated_email', // Email đã đc đăng ký,
  // login_id_find
  E0006: 'pop_error_not_registered_info', // Thông tin user chưa đc đăng ký
  E0007: 'pop_error_not_match_email', // Địa chỉ email không tồn tại
  E0008: 'pop_error_not_match_information', // Thông tin add service (card number, secret key) không chính xác,
  E0009: 'pop_error_exceed_max_parents', // Vượt quá số lượng tài khoản phụ huynh đăng ký cho học sinh
  E001: 'pop_error_not_match_account', // Thông tin đăng nhập ko chính xác,
  E0010: 'pop_error_unusable_qr', // Thông tin scan qua QR không chính xác,
  E0011: 'pop_error_not_match_otp', // OTP không chính xác
  E0012: 'pop_error_invalid_otp',
  EROR0002: 'pop_error_not_match_information',

  L0001: 'pop_error_not_match_account',
  // L0002: 'pop_error_not_match_account',
  L0028: 'pop_error_not_match_information',
  L0010: 'pop_error_registed_child',
  L0025: 'pop_error_not_match_varification_code',
  L0026: 'pop_error_not_satisfy_password_condition',
  L0022: 'pop_error_exceed_max_login_fail', // exceed,
  L0003: 'pop_error_not_registered_id',
  L0027: 'pop_error_duplicated_id',
  L0031: 'pop_error_duplicated_email',

  // login_id_find
  L0033: 'pop_error_not_registered_info',
  L0034: 'pop_error_not_match_email',
  L0085: 'pop_error_wrong_password',
  L0086: 'pop_error_invalid_phone_number',
  L0099: 'pop_error_exist_service',
}
