import test from 'ava'
import * as matrixec from './lib'

test('should combine', t => {
  /**
   * @type matrixec.ArgMatrix
   */
  const matrix1 = new Map([
    [0, ['1a', '1b', '1c']]
  ])
  /**
   * @type matrixec.ArgMatrix
   */
  const matrix2 = new Map([
    [0, ['1a', '1b', '1c']],
    [1, ['2a']]
  ])
  /**
   * @type matrixec.ArgMatrix
   */
  const matrix3 = new Map([
    [0, ['1a', '1b', '1c']],
    [1, ['2a']],
    [2, ['3a', '3b', '3c']]
  ])

  t.deepEqual(matrixec.combine(matrix1), [
    ['1a'],
    ['1b'],
    ['1c']
  ])
  t.deepEqual(matrixec.combine(matrix2), [
    ['1a', '2a'],
    ['1b', '2a'],
    ['1c', '2a']
  ])
  t.deepEqual(matrixec.combine(matrix3), [
    ['1a', '2a', '3a'],
    ['1b', '2a', '3a'],
    ['1c', '2a', '3a'],
    ['1a', '2a', '3b'],
    ['1b', '2a', '3b'],
    ['1c', '2a', '3b'],
    ['1a', '2a', '3c'],
    ['1b', '2a', '3c'],
    ['1c', '2a', '3c']
  ])
})

test('should execute with this undefined', t => {
  /**
   * @type matrixec.ArgMatrix
   */
  const matrix = new Map([
    [0, ['1a', '1b', '1c']],
    [1, ['2a']],
    [2, ['3a', '3b', '3c']]
  ])
  const expectArgs = [
    ['1a', '2a', '3a'],
    ['1b', '2a', '3a'],
    ['1c', '2a', '3a'],
    ['1a', '2a', '3b'],
    ['1b', '2a', '3b'],
    ['1c', '2a', '3b'],
    ['1a', '2a', '3c'],
    ['1b', '2a', '3c'],
    ['1c', '2a', '3c']
  ]

  t.plan(expectArgs.length * 2)

  let count = 0
  matrixec.execute(matrixec.combine(matrix), function(...args) {
    t.is(this, undefined)
    t.deepEqual(args, expectArgs[count])
    count++
  })
})

test('should execute with custom this', t => {
  /**
   * @type matrixec.ArgMatrix
   */
  const matrix = new Map([
    [0, ['1a', '1b', '1c']],
    [1, ['2a']],
    [2, ['3a', '3b', '3c']]
  ])
  const expectArgs = [
    ['1a', '2a', '3a'],
    ['1b', '2a', '3a'],
    ['1c', '2a', '3a'],
    ['1a', '2a', '3b'],
    ['1b', '2a', '3b'],
    ['1c', '2a', '3b'],
    ['1a', '2a', '3c'],
    ['1b', '2a', '3c'],
    ['1c', '2a', '3c']
  ]

  t.plan(expectArgs.length * 2)

  let count = 0
  matrixec.execute(matrix, function(...args) {
    t.is(this, expectArgs[count].shift())
    t.deepEqual(args, expectArgs[count])
    count++
  }, true)
})
