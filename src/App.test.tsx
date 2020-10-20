import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme,{mount } from 'enzyme';
Enzyme.configure({adapter:new Adapter()})
describe('BookSearch',()=>{
  let wrapper;
  beforeEach(()=>{
      wrapper= mount(<App/>)
  })
  it('shows my default text',()=>{
      expect(wrapper.find('h1').text()).toEqual('My Good Reads');
  });
  
});
