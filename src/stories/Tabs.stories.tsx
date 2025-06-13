import type { Meta, StoryObj } from '@storybook/react'

import Tabs from '../components/ui/Tabs'
import Table from '../components/ui/Table'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Tabs> = {
    title: 'Tabs',
    decorators: [
        (Story) => (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Story />
            </div>
        ),
    ],
} as Meta

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    name: 'Tabs',
    render: () => {
        return (
            <>
                <Tabs defaultActiveTab="tab1">
                    <div className="flex p-2 gap-2 w-fit bg-accent rounded-lg">
                        <Tabs.Trigger value="tab1">
                            <div className="text-muted transition-all font-medium p-1 rounded-lg border border-transparent data-[checked='on']:border-border data-[checked='on']:bg-primary data-[checked='on']:text-white">
                                Credit Card
                            </div>
                        </Tabs.Trigger>
                        <Tabs.Trigger value="tab2">
                            <div className="text-muted transition-all font-medium p-1 rounded-lg border border-transparent data-[checked='on']:border-border data-[checked='on']:bg-primary data-[checked='on']:text-white">
                                Medium
                            </div>
                        </Tabs.Trigger>
                    </div>
                    <Tabs.Content value="tab1">
                        <div className="p-2 w-[400px] rounded-bg bg-primary mt-4">
                            <TableDemo invoices={invoices1} />
                        </div>
                    </Tabs.Content>
                    <Tabs.Content value="tab2">
                        <div className="p-2 w-[400px] rounded-bg bg-primary mt-4">
                            <TableDemo invoices={invoices2} />
                        </div>
                    </Tabs.Content>
                </Tabs>
            </>
        )
    },
}

const invoices1 = [
    {
        invoice: 'INV001',
        paymentStatus: 'Paid',
        totalAmount: '$250.00',
        paymentMethod: 'Credit Card',
    },
    {
        invoice: 'INV002',
        paymentStatus: 'Pending',
        totalAmount: '$150.00',
        paymentMethod: 'Debit Card',
    },
    {
        invoice: 'INV003',
        paymentStatus: 'Unpaid',
        totalAmount: '$350.00',
        paymentMethod: 'Credit Card',
    },
]
const invoices2 = [
    {
        invoice: 'INV004',
        paymentStatus: 'Paid',
        totalAmount: '$450.00',
        paymentMethod: 'PayPal',
    },
    {
        invoice: 'INV005',
        paymentStatus: 'Paid',
        totalAmount: '$550.00',
        paymentMethod: 'Wise',
    },
    {
        invoice: 'INV006',
        paymentStatus: 'Pending',
        totalAmount: '$200.00',
        paymentMethod: 'Bank Transfer',
    },
]
function TableDemo({
    invoices,
}: {
    invoices: {
        invoice: string
        paymentStatus: string
        paymentMethod: string
        totalAmount: string
    }[]
}) {
    return (
        <Table>
            <Table.Caption>A list of your recent invoices.</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.Head className="w-[100px]">Invoice</Table.Head>
                    <Table.Head>Status</Table.Head>
                    <Table.Head>Method</Table.Head>
                    <Table.Head className="text-right">Amount</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {invoices.map((invoice) => (
                    <Table.Row key={invoice.invoice}>
                        <Table.Cell className="font-medium">
                            {invoice.invoice}
                        </Table.Cell>
                        <Table.Cell>{invoice.paymentStatus}</Table.Cell>
                        <Table.Cell>{invoice.paymentMethod}</Table.Cell>
                        <Table.Cell className="text-right">
                            {invoice.totalAmount}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.Cell colSpan={3}>Total</Table.Cell>
                    <Table.Cell className="text-right">
                        {invoices.reduce(
                            (acc, invoice) =>
                                acc +
                                Number(invoice.totalAmount.replace('$', '')),
                            0
                        )}{' '}
                        $
                    </Table.Cell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}
