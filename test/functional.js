'use strict'
/* global describe, it */

import DomMock from './dom-mock'
DomMock()

import {expect} from 'chai'
import React from 'react'
import {
  renderIntoDocument as render,
  scryRenderedDOMComponentsWithClass as scryByClass
} from 'react-addons-test-utils'

import CarShareContainer from '../src/containers/CarShareContainer'

describe('CarShare', () => {
  let renderComponent = () => {
    return render(<CarShareContainer/>)
  }

  it('has a content element', () => {
    let div = renderComponent()
    let elements = scryByClass(div, 'car-share')
    expect(elements).to.have.length(1)

    let content = elements[0].textContent
    expect(content).to.equal('CarShare')
  })
})
