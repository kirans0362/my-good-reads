import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme,{mount } from 'enzyme';


import BookSearch from './BookSearch';

Enzyme.configure({adapter:new Adapter()})

describe('BookSearch',()=>{
    const updateBookType = jest.fn();
    let wrapper;
    beforeEach(()=>{
        wrapper= mount(<BookSearch updateBookType={updateBookType}/>)
    })
    it('renders',()=>{
        expect(wrapper).not.toBeNull();
    });
    it('shows my default text',()=>{
        expect(wrapper.find('p').text()).toEqual('Try searching for a topic, for example \"Javascript"');
    });
    it('correctly trigger onchange event ',()=>{
        wrapper.find('a').simulate('click')
        //wrapper.find('input').simulate('change')
        expect(wrapper.find('input').value).toEqual('Javascript');
    });
    it('correctly trigger onchange',()=>{
        wrapper.find('a').simulate('click')
        expect(updateBookType).toBeCalledTimes(1)
    });
});
