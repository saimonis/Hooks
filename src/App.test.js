import React from 'react';
// import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
  
// });


describe('<App />', () => {

	it('renders without crashing', () => {
	  const app = shallow(<App />);

	  

	  expect(app.containsMatchingElement(<p>
          Edit <code>src/App.js</code> and save to reload.
        </p>)).toEqual(true);
	});

 
});