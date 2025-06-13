/* eslint-disable react/prop-types */
import React, { Children, memo } from 'react'

const maxDepthAttribute = 5

const traverseChildren = (
    children: React.ReactNode,
    checked: boolean,
    depth: number = 0
): React.ReactNode => {
    //    loop and mutate all children with data-checked attribute
    return Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            if (child.props.children) {
                if (depth < maxDepthAttribute) {
                    return React.cloneElement(child, {
                        'data-checked': checked ? 'on' : 'off',
                        ...child.props,
                        children: traverseChildren(
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            child.props.children,
                            checked,
                            depth + 1
                        ),
                    } as React.HTMLAttributes<HTMLElement>)
                }
            }
            return React.cloneElement(child, {
                'data-checked': checked ? 'on' : 'off',
                ...child.props,
            } as React.HTMLAttributes<HTMLElement>)
        }
        return child
    })
}

const DataAttributeDecorator = memo(
    ({
        children,
        checked,
    }: {
        children: React.ReactNode
        checked: boolean
    }) => {
        // loop through children and add data-checked attribute to each child
        return traverseChildren(children, checked)
    },
    (prevProps, nextProps) => {
        return prevProps.checked === nextProps.checked
    }
)

DataAttributeDecorator.displayName = 'DataAttributeDecorator'

export default DataAttributeDecorator
