import { createContext, useContext, useState } from 'react'
import DataAttributeDecorator from '../../utils/DataAttributeDecorater'
const CTX = createContext<{
    activeTab: string
    setTab: (tab: string) => void
}>({
    activeTab: '',
    setTab: () => {},
})
const Tabs = ({
    children,
    defaultActiveTab,
    ...props
}: {
    children: React.ReactNode
    defaultActiveTab?: string
} & React.HTMLAttributes<HTMLDivElement>) => {
    const [activeTab, setActiveTab] = useState(defaultActiveTab || '')
    const setTab = (tab: string) => {
        setActiveTab(tab)
    }
    return (
        <CTX.Provider value={{ activeTab, setTab }}>
            <div {...props}>{children}</div>
        </CTX.Provider>
    )
}

const TabsTrigger = ({
    value,
    children,
}: {
    value: string
    children: React.ReactNode
}) => {
    const { setTab, activeTab } = useContext(CTX)
    return (
        <DataAttributeDecorator checked={activeTab === value}>
            <button onClick={() => setTab(value)}>{children}</button>
        </DataAttributeDecorator>
    )
}

const TabsContent = ({
    value,
    children,
}: {
    value: string
    children: React.ReactNode
}) => {
    const { activeTab } = useContext(CTX)
    const isActive = activeTab === value
    return isActive ? (
        <DataAttributeDecorator checked={isActive}>
            {children}
        </DataAttributeDecorator>
    ) : (
        <></>
    )
}

Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export default Tabs
