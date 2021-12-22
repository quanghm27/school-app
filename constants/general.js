export const CLIENT_TYPE = 'APP'

export const NOT_FOUND_CODE = 'L0009'

export const NEED_LOGOUT_CODES = ['L0005', 'L0006']

export const LANGUAGES = {
  VN: 'vi',
  EN: 'en',
  KR: 'ko',
}

export const DEFAULT_LANGUAGE = LANGUAGES.VN

export const USER_TYPE = {
  MOET: 'M',
  DOET: 'D',
  SCHOOL: 'S',
  TEACHER: 'T',
  STUDENT: 'U',
  PARENT: 'P',
  OPERATOR: 'O',
}

export const ANNOUNCE_RECEIVER = {
  STUDENT: 1,
  TEACHER: 2,
  PARENT: 3,
}

export const TIMETABLE_TYPE = {
  PROGRESS_MEETING: 1,
  LUNCH: 2,
  AFTERNOON_SNACKS: 3,
  LECTURE: 4,
  ASSEMBLY: 5,
}

export const GENDER = {
  MALE: 1,
  FEMALE: 2,
  OTHER: 3,
}

export const PAGE_SIZE = 10

export const OPTION_TYPE = {
  CHARACTERISTIC: 1,
  EDU_PROGRAM: 2,
  SCHOOLING_COURSE: 3,
  SCHOOL_TYPE: 4,
  CLASSIFY: 12,
  MAJOR: 6,
  GENDER: 13,
  REGION_TYPE: 14,
  TC_TYPE: 7,
  H_TYPE: 8,
  RELATION: 9,
  NATION: 10,
  NATIONAL: 18,
  RELIGION: 19,
  N_MERITS: 20,
  PAY_MGR: 23, // Payment management status
  PAY_METHOD: 24, // Payment method filter & status
  DISCIPLINE: 37,
  AWARD: 38,
  CLASSIFY_HISTORY: 40,
  HEALTH_TYPE: 34,
  BLOOD_GROUP: 35,
  PHYSICAL_LEVEL: 36,
  BMI: 42,
  EVALUATE: 44,
  EVALUATE_TYPE: 72,
  MARRIED_TYPE: 48,
  EVALUATE_SUB: 51,
  ROLE: 66,
  TIMETABLE_TYPE: 75,
  SCORE_GRADE: 77,
  CONDUCT_GRADE: 78,
  INQUIRY_CATEGORY: 91,
  INQUIRY_STATUS: 92,
  INQUIRY_RECEPTOR: 93,
  EVALUATE_SCORE: 94,
}

export const ROLE = {
  TEACHER: 'teacher',
  STUDENT: 'student',
  PARENT: 'parents',
}

export const ROLES = [
  { id: 1, name: ROLE.STUDENT, type: 'U' },
  { id: 2, name: ROLE.TEACHER, type: 'T' },
  { id: 3, name: ROLE.PARENT, type: 'P' },
]

export const SCHEDULE = {
  HOLIDAY: 1,
  EVENT: 2,
  WEEKEND: 3,
  SCHOOL_DAY: 4,
}

export const STUDENT_STATUS = {
  AT_SCHOOL: 1,
  AFTER_SCHOOL: 2,
  UNKNOWN: 3,
}

export const INQUIRY_STATUS = {
  RECEIVED: 1,
  WATING: 2,
  REPLIED: 3,
  TASK_REQUESTED: 4,
  UNRESOLVABLE: 5,
}

export const ATTEND_STATUS = {
  YES: 'Y',
  NO: 'N',
}

export const ATTEND_DAILY_STATUS = {
  PRESENT: 1,
  ABSENT: 8,
}

export const ANNOUNCE_TYPES = {
  ANNOUNCE: 1,
  PAYMENT: 2,
}

export const MAX_IMAGE_SIZE = 5242880 // bytes

export const APP_INFO = 'app_info'
export const USER_SETTING = 'user_setting'
export const ACCESS_TOKEN = 'access_token'
export const JWT_TOKEN_MINIGAME = 'jwt_token_minigame'
export const SHOW_BANNER = 'show_banner'
export const ENTERED = 'entered'

// Add new general constant here...

export const HOTLINE = '0968334227'

export const SCORE_TYPE = {
  REGULAR: 1,
  MID_TERM: 2,
  END_TERM: 3,
  COMMENT: 4,
}

export const EVALUATE_TYPE = {
  SCORE: 1,
  PASS_FAIL: 2,
}

export const PASS_FAIL_TYPE = {
  PASS: 'Đ',
  FAIL: 'CĐ',
}
