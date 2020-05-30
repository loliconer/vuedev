export function generateSid(sidLength) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const length = chars.length
  let sid = Number(new Date).toString(36) + '-'

  for (let i = sid.length; i < sidLength; i++) {
    sid += chars[Math.trunc(Math.random() * length)]
  }

  return sid
}

export function generateVerifyCode(codeLength = 4) {
  const chars = '0123456789'
  let code = ''

  for (let i = 0; i < codeLength; i++) {
    code += chars[Math.trunc(Math.random() * 10)]
  }

  return code
}

export function makeSequelizeError(error) {
  let msg

  // SequelizeDatabaseError, SequelizeValidationError, SequelizeTimeoutError, SequelizeUniqueConstraintError
  switch (error.name) {
    case 'SequelizeUniqueConstraintError':
    case 'SequelizeDatabaseError':
      msg = error.original.message
      break
    case 'SequelizeValidationError':
      msg = error.errors.map(item => item.message).join(', ')
      break
    default:
      msg = error.message
      break
  }

  return { code: 1000, msg }
}
