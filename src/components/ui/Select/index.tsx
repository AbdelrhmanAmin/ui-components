import { useState, useMemo } from 'react'
import { PropsMappedByType } from '../../types'
import Command from '../Combo'
import Panel from '../Panel'

type Option = {
    label: string
    value: string
}

type MappedProps = PropsMappedByType<Option, Option[]>

type Interface = {
    options: Option[]
    onChange: (picks: Option[]) => void
    type?: 'single' | 'multiple'
} & Omit<MappedProps, 'type'>

const Select = ({ options, type = 'single', ...props }: Interface) => {
    const [picks, setPicks] = useState<Option[]>([])
    const label = useMemo(() => {
        if (picks.length === 0) return 'Search options 🔍'
        if (picks.length === 1) return picks[0].label
        return `${picks.length} options selected`
    }, [picks])
    return (
        <Panel>
            <Panel.StyledTrigger>{label}</Panel.StyledTrigger>
            <Panel.Content className="list">
                <Command
                    {...({
                        type, // passing props like this because of this bitch.
                        defaultValue: props.defaultValue,
                        value: props.value,
                        onChange: (newPicks: Option[]) => {
                            setPicks(newPicks)
                            props.onChange?.(newPicks)
                        },
                    } as MappedProps)}
                >
                    <Command.Input placeholder="Search..." />
                    <Command.Group>
                        {options.map((option) => (
                            <Command.Item
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </Command.Item>
                        ))}
                    </Command.Group>
                </Command>
            </Panel.Content>
        </Panel>
    )
}

export default Select
