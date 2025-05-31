import { useState, useMemo } from 'react'
import Command from '../Combo'
import Panel from '../Panel'
import Badge from '../Badge'

type Option = {
    label: string
    value: string
}

type IsControlled =
    | {
          picks: string[]
          onChange: (picks: string[]) => void
      }
    | {
          picks?: never
          onChange?: never
      }
type Interface = {
    options: Option[]
    type?: 'single' | 'multiple'
    onMenuEnd?: () => void
    disabled?: boolean
} & IsControlled

const Select = ({
    options,
    type = 'single',
    picks: outerPicks,
    onMenuEnd,
    disabled,
    ...props
}: Interface) => {
    const [picks, setPicks] = useState<string[]>(
        Array.isArray(outerPicks) ? outerPicks : []
    )
    const submit = (newPicks: string[]) => {
        const isControlled = props.onChange !== undefined
        if (isControlled) {
            props.onChange?.(newPicks)
        } else {
            setPicks(newPicks)
        }
    }
    const label = useMemo(() => {
        if (picks.length === 0) return 'Search options 🔍'
        if (picks.length < 6)
            return options.reduce((acc: Option[], option) => {
                if (picks.includes(option.value)) {
                    return [...acc, option]
                }
                return acc
            }, [])
        return `${picks.length} options selected...`
    }, [picks])
    return (
        <Panel>
            <Panel.StyledTrigger
                className="w-96 text-left text-muted bg-gray-600/50 truncate"
                disabled={disabled}
            >
                {Array.isArray(label)
                    ? label.map((l) => (
                          <Badge
                              className="text-xs hover:bg-red-600/80 transition-colors"
                              key={l.value}
                              onClick={(e) => {
                                  e.stopPropagation()
                                  const newPicks = picks.filter(
                                      (pick) => pick !== l.value
                                  )
                                  submit(newPicks)
                              }}
                          >
                              {l.label}
                          </Badge>
                      ))
                    : label}
            </Panel.StyledTrigger>
            <Panel.Content className="list">
                <Command
                    type={type}
                    value={picks}
                    onChange={(newPicks: string[]) => {
                        submit(newPicks)
                    }}
                    disabled={disabled}
                >
                    <Command.Input placeholder="Search..." />
                    <Command.Group
                        onScroll={(e) => {
                            const target = e.target as HTMLElement
                            if (
                                target.scrollTop + target.clientHeight >=
                                target.scrollHeight
                            ) {
                                onMenuEnd?.()
                            }
                        }}
                    >
                        {options.map((option) => (
                            <Command.Item
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </Command.Item>
                        ))}
                    </Command.Group>
                </Command>{' '}
            </Panel.Content>
        </Panel>
    )
}

export default Select
