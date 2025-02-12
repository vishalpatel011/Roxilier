import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionsTable.css';

const TransactionsTable = ({ selectedMonth, onMonthChange }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, searchText, page]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions', {
        params: { 
          month: selectedMonth,
          search: searchText,
          page 
        }
      });
      setTransactions(response.data.transactions);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPage(1); // Reset to first page when search changes
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="transactions-container">
      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchText}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <div className="month-selector">
          <select 
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="month-dropdown"
          >
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction._id}>
                <td>{index + 1}</td>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{formatPrice(transaction.price)}</td>
                <td>{transaction.category}</td>
                <td>
                  <span className={`status ${transaction.sold ? 'sold' : 'not-sold'}`}>
                    {transaction.sold ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="pagination">
        <button 
          className={`pagination-btn ${page === 1 ? 'disabled' : ''}`}
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="page-info">Page {page} of {totalPages}</span>
        <button 
          className={`pagination-btn ${page === totalPages ? 'disabled' : ''}`}
          onClick={() => setPage(p => p + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
