import Panel from '../Panel'

const Menubar = () => {
    return (
        <div className="flex items-center border border-border bg-background rounded-md p-1 gap-x-1 w-fit">
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
        </div>
    )
}

const MenubarItem = ({
    children,
    title,
}: {
    children: React.ReactNode
    title: string
}) => {
    return (
        <Panel>
            <Panel.Trigger
                isHoverable
                className="rounded-md px-3 py-1 hover:bg-[#27272a]"
            >
                {title}
            </Panel.Trigger>
            <Panel.Content className="list dropdown">{children}</Panel.Content>
        </Panel>
    )
}

export default Menubar
