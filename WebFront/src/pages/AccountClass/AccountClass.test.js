import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import AccountClass from './AccountClass';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MemoryRouter>
            <AccountClass />
        </MemoryRouter>,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
