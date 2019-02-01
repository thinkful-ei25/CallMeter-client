import {
  required,
  nonEmpty,
  isTrimmed,
  length,
  matches,
  emailCheck,
  phoneCheck,
  normalizePhone
} from '../../_utils/_validators';


describe('validators', () => {
  let value;
  let answer;
  it('should  return Required if required input is empty and undefined otherwise', () => {
    value = ''
    answer = required(value)
    expect(answer).toBe('Required')
    value = 'Bob'
    answer = required(value)
    expect(answer).toBe(undefined)
  })

  it('should return undefined if the value is not empty and "Cannot be empty" if value is empty', () => {
    value = '     '
    answer = nonEmpty(value)
    expect(answer).toBe('Cannot be empty')
    value = 'Bob'
    answer = nonEmpty(value)
    expect(answer).toBe(undefined)
  })

  it('should return "Cannot start or end with whitespace" if the value does or undefined if not', () => {
    value = '  Bob'
    answer = isTrimmed(value)
    expect(answer).toBe("Cannot start or end with whitespace")
    value = 'Bob   '
    answer = isTrimmed(value)
    expect(answer).toBe("Cannot start or end with whitespace")
    value = 'Bob'
    answer = isTrimmed(value)
    expect(answer).toBe(undefined)
  })

  it('should return an appropriate message if the value is too short or too long', () => {
    
    value = 'Bob'
    answer = length({min: 8, max: 12})(value)
    expect(answer).toBe('Must be at least 8 characters long')
    value = 'BobRobertsons'
    answer = length({min: 8, max: 12})(value)
    expect(answer).toBe('Must be at most 12 characters long')
  })

  it('should return undefined if passwords match and "Does not match" otherwise', () => {
  value = 'password'
  let field = 'password'
  answer = matches(field)(value, {'password': 'password'})
  expect(answer).toBe(undefined)
  value = 'notpassword'
  field = 'password'
  answer = matches(field)(value, {'password': 'password'})
  expect(answer).toBe('Does not match')
  })

  it('should return undefined if the email is valid, otherwise "Invalid Email"', () => {
    value = 'abcdef@gmail.com'
    answer = emailCheck(value)
    expect(answer).toBe(undefined)
    value = 'abcdef@gmailcom'
    answer = emailCheck(value)
    expect(answer).toBe('Invalid Email')
  })

  it('should return undefined if the phone number is valid, "Invalid Phone Number" otherwise', () => {
    value = '333-444-52533'
    answer = phoneCheck(value)
    expect(answer).toBe('Invalid Phone Number')
    value = '444-555-2222'
    answer = phoneCheck(value)
    expect(answer).toBe(undefined)
  })

  it('should normalize the phone number ', () => {
    let previousValue = ''
    value = ''
    answer = normalizePhone(value, previousValue)
    expect(answer).toBe(value)
    value = 'b'
    answer = normalizePhone(value, previousValue)
    expect(answer).toBe(previousValue)
    value = '5'
    answer = normalizePhone(value, previousValue)
    expect(answer).toBe(value)
    previousValue = '55'
    value = '555'
    answer = normalizePhone(value, previousValue)
    expect(answer).toBe(value + '-')
    previousValue = '55555'
    value = '555555'
    answer = normalizePhone(value, previousValue)
    expect(answer).toBe('555-555-')
    previousValue = '5555'
    value = '55555'
    answer = normalizePhone(value, previousValue)
    expect(answer).toBe('555-55')
    previousValue= '555555555'
    value = '5555555555'
    answer = normalizePhone(value, previousValue)
    expect(answer).toBe('555-555-5555')
    previousValue = '5555555555'
    value = '55555555556'
    answer = normalizePhone(value, previousValue)
    expect(answer).toBe('555-555-5555')


  })

})