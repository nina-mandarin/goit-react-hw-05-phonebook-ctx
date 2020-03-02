import React, { Component } from 'react';
import { uuid } from 'uuidv4';
import styled from 'styled-components'

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import ThemeContext from '../context/ThemeContext';
import Layout from './Layout/Layout';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localContacts = localStorage.getItem('contacts');

    if (localContacts) {
      this.setState({
        contacts: JSON.parse(localContacts)
      })
    }
  }

  componentDidUpdate(prevProp, prevState) {
    const prevContacts = prevState.contacts;
    const currentContacts = this.state.contacts;

    if (prevContacts !== currentContacts) {
      localStorage.setItem('contacts', JSON.stringify(currentContacts));
    }
  }

  // Add new contact
  addContact = (name, number) => {
    const contact = {
      id: uuid(),
      name: name,
      number: number
    };

    if (this.state.contacts.find(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact]
      };
    })
  };

  // Filter
  changeFilter = filter => {
    this.setState({ filter });
  };

  handleFilter = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  // Delete a contact
  deleteContact = itemId => {

    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== itemId),
      };
    });
  }

  render() {
    const { filter } = this.state;
    const filteredContacts = this.handleFilter();

    return (
      <ThemeContext>
        <Layout>
          <Section>
            <PageTitle>Phonebook</PageTitle>
            <ContactForm onCreateContact={this.addContact} />
          </Section>
          <Section>
            <SectionTitle>Contacts</SectionTitle>
            {(filteredContacts.length > 1 || filter) && (
              <Filter value={filter} onChange={this.changeFilter} />
            )}
            {filteredContacts.length > 0 && (
              <ContactList contacts={filteredContacts} onDeleteItem={this.deleteContact} />
            )}
          </Section>
        </Layout>
      </ThemeContext>
    )
  }
}

const Section = styled.section`
  &:not(:last-of-type) {
    margin-bottom: 40px;
  }
`;

const PageTitle = styled.h1`
  margin-bottom: 20px;
  font-size: 48px;
  font-weight: 700;
`;

const SectionTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 42px;
  font-weight: 500;
`;