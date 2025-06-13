import { useContext } from 'react'
import Tabs from '../Tabs'
import FloatingPanel from '../Panel/FloatingPanel'
import { useRef } from 'react'
import useMouseLeave from '../../utils/useMouseLeave'

const Menubar = ({ children }: { children: React.ReactNode }) => {
    return (
        <Tabs className="flex items-center border border-border bg-background rounded-md p-1 gap-x-1 w-fit">
            {children}
        </Tabs>
    )
}

const MenubarItem = ({
    children,
    title,
}: {
    children: React.ReactNode
    title: string
}) => {
    const { activeTab, setTab } = useContext(Tabs.CTX)
    const ref = useRef<HTMLDivElement>(null)
    useMouseLeave({
        ref,
        onClick: () => setTab(''),
    })
    return (
        <div ref={ref} className="relative">
            <Tabs.Trigger
                value={title}
                className="rounded-md px-3 py-1 hover:bg-[#27272a]"
                isHoverable
            >
                {title}
            </Tabs.Trigger>
            <FloatingPanel isOpen={activeTab === title}>
                <div className="list dropdown">{children}</div>
            </FloatingPanel>
        </div>
    )
}

Menubar.Item = MenubarItem

export default Menubar
