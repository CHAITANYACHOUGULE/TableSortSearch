// Table.js
import React, { useState } from 'react';
import './Table.css';
// Sample data
const userData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', age: 28 },
  { id: 4, name: 'Bob Brown', email: 'bob@example.com', age: 35 },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', age: 40 },
];

const Table = () => {
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  // Handle Search
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Handle Sorting
  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: column, direction });
  };

  // Sort Data
  const sortedData = React.useMemo(() => {
    let sortableData = [...userData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [sortConfig]);

  // Filter Data based on Search
  const filteredData = sortedData.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.age.toString().includes(search)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
      />
      <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '10px' }}>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
            </th>
            <th onClick={() => handleSort('age')}>
              Age {sortConfig.key === 'age' && (sortConfig.direction === 'asc' ? '🔼' : '🔽')}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
