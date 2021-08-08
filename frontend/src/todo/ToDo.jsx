import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/PageHeader'
import ToDoForm from './ToDoForm'
import TodoList from './TodoList'

const URL = 'http://localhost:3003/api/todos'

export default class ToDo extends Component {
  constructor(props) {
    super(props)
    this.state = { description: '', list: [] }

    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleMarkIsDone = this.handleMarkIsDone.bind(this)
    this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClear = this.handleClear.bind(this)

    this.refresh()
  }

  refresh(description = '') {
    const search = description ? `&description__regex=/${description}/` : ''
    axios.get(`${URL}?sort=-createdAt${search}`)
      .then(resp => this.setState({...this.state, description, list: resp.data}))
  }

  handleSearch() {
    this.refresh(this.state.description)
  }

  handleChange(event) {
    this.setState({...this.state, description: event.target.value})
  }

  handleAdd() {
    const description = this.state.description

    axios.post(URL, { description })
      .then(resp => this.refresh())
  }

  handleRemove(todo) {
    axios.delete(`${URL}/${todo._id}`)
      .then(resp => this.refresh(this.state.description))
  }

  handleMarkIsDone(todo) {
    axios.put(`${URL}/${todo._id}`, {...todo, done: true})
      .then(resp => this.refresh(this.state.description))
  }

  handleMarkAsPending(todo) {
    axios.put(`${URL}/${todo._id}`, {...todo, done: false})
      .then(resp => this.refresh(this.state.description))
  }

  handleClear() {
    this.refresh()
  }

  render() {
    return (
      <div>
        <PageHeader name="Tarefas" small="Cadastro"/>
        <ToDoForm 
          handleAdd={this.handleAdd} 
          handleChange={this.handleChange}
          description={this.state.description}
          handleSearch={this.handleSearch}
          handleClear={this.handleClear}/>
        <TodoList 
          list={this.state.list} 
          handleRemove={this.handleRemove}
          handleMarkIsDone={this.handleMarkIsDone}
          handleMarkAsPending={this.handleMarkAsPending}/>
      </div>
    )
  }
}