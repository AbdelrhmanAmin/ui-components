import { Dropdown } from './components/actions';
import Button from './components/actions/Button';

function App() {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <Dropdown>
                <Dropdown.Trigger></Dropdown.Trigger>
                <Dropdown.Content>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            padding: '1rem',
                            background: 'black',
                            color: 'white',
                            borderRadius: '0.5rem',
                        }}
                    >
                        <Button className="bg-blue-400">Option 1</Button>
                        <Button className="bg-blue-400">Option 2</Button>
                        <Button className="bg-blue-400">Option 3</Button>
                    </div>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}

export default App;
