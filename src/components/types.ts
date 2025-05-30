export type Shared = {
    className?: string
    children: React.ReactNode
}

export type IsSelectTypeControlled<Data> =
    | {
          type: 'single' | 'multiple'
          value: Data[]
          onChange: (val: Data[]) => void
          defaultValue?: Data[]
      }
    | {
          type: 'single' | 'multiple'
          value?: never
          onChange?: never
          defaultValue?: Data[]
      }
type IsPropsControlled<Type extends 'single' | 'multiple', S, M> =
    | {
          value: Type extends 'single' ? S : M
          onChange: (val: Type extends 'single' ? S : M) => void
          defaultValue?: Type extends 'single' ? S : M // optional
      }
    | {
          value?: never
          onChange?: never
          defaultValue?: Type extends 'single' ? S : M // optional because it's uncontrolled
      }

export type PropsMappedByType<SingleType = string, MultipleType = string[]> =
    | ({
          type: 'single'
      } & IsPropsControlled<'single', SingleType, MultipleType>)
    | ({
          type: 'multiple'
      } & IsPropsControlled<'multiple', SingleType, MultipleType>)
