import { useState, useEffect } from 'react'
import axios from 'axios'

export function useField(type) {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export function useResource(baseUrl) {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => setResources(response.data))
  }, [])

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then(response => setResources(resources.concat(response.data)))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}