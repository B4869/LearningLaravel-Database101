import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { router } from '@inertiajs/react';

export default function Index({ employees, query, sortField, sortOrder }) {
    const [search, setSearch] = useState(query || '');
    const [sort, setSort] = useState(sortField || 'emp_no');
    const [order, setOrder] = useState(sortOrder || 'asc');


    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/employees', { search, sort, order });
    }

    const handlePageChange = (url) => {
        router.get(url, { search, sort, order });
    }

    return (
        <div className="container mx-auto p-4">
            <Helmet>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
            </Helmet>
            <h1 className="text-4xl mt-4 mb-8 font-bold text-center text-blue-600">Employees List</h1>
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/4 p-2 border border-gray-300 rounded mb-2"
                    placeholder="Search employees..."
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded ml-1">
                    <i className="fas fa-search mx-1"></i>
                </button>
            </form>
            <div>
                <div className="mb-4">
                    <label htmlFor="sort" className="mr-2"><strong>Sort by</strong>:</label>
                    <select
                        id="sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="p-2 border border-gray-300 rounded w-[180px]"
                    >
                        <option value="emp_no">Employee No.</option>
                        <option value="first_name">First Name</option>
                        <option value="last_name">Last Name</option>
                        <option value="birth_date">Age</option>
                    </select>
                </div>
                <div className="mb-8 inline-flex">
                    <strong>Order by</strong>:
                    <label className="mx-2">
                        <input
                            type="radio"
                            value="asc"
                            checked={order === 'asc'}
                            onChange={(e) => setOrder(e.target.value)}
                            className="mr-1"
                        />
                        Ascending
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="desc"
                            checked={order === 'desc'}
                            onChange={(e) => setOrder(e.target.value)}
                            className="mr-1"
                        />
                        Descending
                    </label>
                </div>
            </div>
            {employees.data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                {employees.data.map((emp, index) => (
                    <div key={index} className="p-4 border rounded shadow-sm flex items-start bg-white">
                        <div className="mr-4 flex-shrink-0">
                            <img
                                src="https://www.w3schools.com/w3images/avatar2.png"
                                alt="Employee Avatar"
                                className="w-16 h-16 rounded-full"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                No. {emp.emp_no}
                            </h2>
                            <p className="text-md text-gray-600 mt-2">Name: {emp.first_name} {emp.last_name}</p>
                            <p className="text-md text-gray-600">Age: {new Date().getFullYear() - new Date(emp.birth_date).getFullYear()}</p>
                            <p className="text-md text-gray-600">Gender: {emp.gender === 'M' ? 'Male' : 'Female'}</p>
                        </div>
                    </div>
                ))}
            </div>
            ) : (
                <p className="text-start text-gray-600 mt-4">ไม่พบรายชื่อพนักงาน</p>
            )}
            <div className="mt-8 flex justify-center items-center space-x-4">
                <button
                    onClick={() => handlePageChange(employees.prev_page_url)}
                    disabled={!employees.prev_page_url}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-lg">Page {employees.current_page} of {employees.last_page}</span>
                <button
                    onClick={() => handlePageChange(employees.next_page_url)}
                    disabled={!employees.next_page_url}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}