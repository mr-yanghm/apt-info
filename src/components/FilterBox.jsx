import React from "react";

const Filter = ({ filter, onFilterDelete, index }) => {
  const onDelete = () => {
    onFilterDelete(filter);
  };
  return (
    <tr>
      <td className="center">{filter.aptName}</td>
      <td className="right">{filter.aptSize}</td>
      <td className="center">
        <button className="habit-button habit-delete" onClick={onDelete}>
          <i className="fas fa-minus-square"></i>
        </button>
      </td>
    </tr>
  );
};

const FilterBox = ({ filters, onFilterDelete }) => {
  return (
    <div className="filter-area">
      <table className="tg">
        <thead>
          <tr>
            <th>아파트명({filters.length})</th>
            <th colSpan="2">전용면적</th>
          </tr>
        </thead>
        <tbody>
          {filters &&
            filters.map((filter, index) => {
              return (
                <Filter
                  key={index}
                  filter={filter}
                  onFilterDelete={onFilterDelete}
                />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default FilterBox;
