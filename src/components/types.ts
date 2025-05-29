export type Shared = {
    className?: string
    children: React.ReactNode
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
