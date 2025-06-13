import { useContext } from 'react'
import Tabs from '../Tabs'
import FloatingPanel from '../Panel/FloatingPanel'
import { useRef } from 'react'
import useMouseLeave from '../../utils/useMouseLeave'

const Menubar = () => {
    return (
        <Tabs className="flex items-center border border-border bg-background rounded-md p-1 gap-x-1 w-fit">
            <MenubarItem title="File">
                <div className="item">New</div>
                <div className="item">Open</div>
                <div className="item">Save</div>
                <div className="item">Save As</div>
            </MenubarItem>
            <MenubarItem title="Edit">
                <div className="item">Undo</div>
                <div className="item">Redo</div>
                <div className="item">Cut</div>
                <div className="item">Copy</div>
                <div className="item">Paste</div>
                <div className="item">Delete</div>
            </MenubarItem>
            <MenubarItem title="View">
                <div className="item">Zoom In</div>
                <div className="item">Zoom Out</div>
                <div className="item">Reset Zoom</div>
            </MenubarItem>
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

export default Menubar
