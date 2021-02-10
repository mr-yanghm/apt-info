import React from 'react';

const Filter = ({ filter, onFilterDelete, index }) => {
    const onDelete = () => {
        onFilterDelete(filter);
    }
    return (
        <tr >
            <td>{filter.aptName}</td>
            <td>{filter.aptSize}</td>
            <td><button className="habit-button habit-increase" onClick={onDelete}><i className="fas fa-minus-square"></i></button></td>
        </tr>
    )
}

const FilterBox = ({ filters, onFilterDelete }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>아파트명</th>
                        <th colSpan="2">전용면적</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filters && filters.map((filter, index) => {
                            return (
                                <Filter key={index} filter={filter} onFilterDelete={onFilterDelete} />
                            );
                        })
                    }
                </tbody>
            </table>
        </div >
    )
};

export default FilterBox;