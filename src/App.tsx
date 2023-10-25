import './App.scss';
import React from 'react';
import { Form } from './components/Form';
import { Route, Routes } from 'react-router-dom';
import { Table } from './components/Table';

const App = () => {
  return (
    <main className='page page__body'>
      <Routes>
        <Route
          path="/"
          element={(
            <Form></Form>
          )}
        />
        <Route
          path="/table"
          element={(
            <Table></Table>
          )}
        />

      </Routes>

    </main>
  );
}

export default App;
