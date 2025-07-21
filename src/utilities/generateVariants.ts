type Option = {
  name: string
  values: { value: string }[]
}

type Choice = {
  name: string
  value: string
}

export function generateVariants(options: Option[]): Choice[][] {
  if (!Array.isArray(options) || options.length === 0) return []

  const sets: Choice[][] = options.map(opt =>
    opt.values.map(val => ({
      name: opt.name,
      value: val.value,
    }))
  )

  return cartesianProduct(sets)
}

function cartesianProduct(arrays: Choice[][]): Choice[][] {
  return arrays.reduce<Choice[][]>(
    (acc, curr) => acc.flatMap(a => curr.map(b => [...a, b])),
    [[]]
  )
}
