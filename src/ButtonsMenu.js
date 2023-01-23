import React, { useState, useEffect } from 'react'
import './Style.scss'

export default props => {
  const attributes = props.rootElement.attributes

  const selectorOfElementsToChange = attributes['change-selector'].value
  const attributeToChange = attributes['change-attribute'].value
  const valuesList = attributes['values'].value.split(',')
  const maybeAskedDefaultValue = attributes.default?.value

  const storage = {
    _scopedAttributeNameToStore: `automician.ButtonsMenu.${selectorOfElementsToChange}.${attributeToChange}`,
    getAttributeValue() {
      return window.localStorage.getItem(this._scopedAttributeNameToStore)
    },
    setAttributeToChange(value) {
      window.localStorage.setItem(this._scopedAttributeNameToStore, value)
    },
  }

  if (!storage.getAttributeValue()) {
    const elementsToChange = document.querySelectorAll(selectorOfElementsToChange)
    const hostDefaultArray = []

    elementsToChange.forEach(item => {
      if (item.getAttribute('byDefault'))
      hostDefaultArray.push(item.getAttribute('byDefault'))
    })

    const defaultValue =
    hostDefaultArray[0] || maybeAskedDefaultValue || valuesList[0]

  document
  .querySelectorAll(selectorOfElementsToChange)
    .forEach(element => {
      console.log(element);
      element.setAttribute(attributeToChange, defaultValue)
    })

    storage.setAttributeToChange(defaultValue)
  }

  const valueFromStorage = storage.getAttributeValue()
  const [selectedValue, setSelectedValue] = useState(valueFromStorage)
  const state = { selectedValue, setSelectedValue }

  useEffect(() => {
    document.querySelectorAll(selectorOfElementsToChange).forEach(element => {
      console.log(attributeToChange);
      console.log(selectedValue);


      element.setAttribute(attributeToChange, state.selectedValue)
      console.log( document.querySelectorAll(selectorOfElementsToChange));
    })
   }, [])

  function changeAttributeValue(value) {
    document.querySelectorAll(selectorOfElementsToChange).forEach(element => {
      console.log(element);
      element.setAttribute(attributeToChange, value)
    })

    state.setSelectedValue(value)
    storage.setAttributeToChange(value)
  }

  return (
    <div className="button-hover">
      <div className="current-value">
        <span className="current-value-span">
          {state.selectedValue.toUpperCase()}
        </span>
      </div>
      <div className="values-list">
        {valuesList.map(value => (
          <div
            value
            key={value}
            className="values-list-item"
            onClick={() => changeAttributeValue(value)}
          >
            {value.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  )
}
