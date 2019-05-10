export type ArgMatrix = Map<any, any[]>

export type Combination = any[]

export function combine(args: ArgMatrix): Combination[] {
  const argsStatus: Map<number, number> = new Map()

  for (const [argKey, values] of args) {
    if (values.length) {
      argsStatus.set(argKey, 0)
    }
  }

  const combinations: Combination[] = []
  let combinationAvailable = true
  while (combinationAvailable) {
    const combination: Combination = []

    for (const [argKey, status] of argsStatus) {
      combination.push((<any[]>args.get(argKey))[status])
    }
    combinations.push(combination)

    let firstArg = true
    for (const [argKey, status] of argsStatus) {
      if (firstArg) {
        argsStatus.set(argKey, status + 1)
        firstArg = false
      }

      const maxArg = (<any[]>args.get(argKey)).length
      if (<number>argsStatus.get(argKey) >= maxArg) {
        argsStatus.set(argKey, 0)
        firstArg = true
      }
    }

    if (firstArg) {
      combinationAvailable = false
    }
  }

  return combinations
}

export function execute(
  args: ArgMatrix | Combination[],
  func: Function,
  useThisArg=false
): any[] {
  let combinations = args
  if (args instanceof Map) {
    combinations = combine(args)
  }

  const results: any[] = []

  for (const combination of combinations) {
    const combinationCopy = combination.slice()
    const thisArg = useThisArg ? combinationCopy.shift() : undefined
    const result = func.call(thisArg, ...combinationCopy)
    results.push(result)
  }

  return results
}
