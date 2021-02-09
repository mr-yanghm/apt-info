import React from 'react';

const FilterBox = ({ filters }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>아파트명</th>
                        <th>전용면적</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filters && filters.map((filter, index) => {
                            return (
                                <tr key={index}>
                                    <td>{filter.aptName}</td>
                                    <td>{filter.aptSize}</td>
                                    <td>필터삭제</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    )
};

export default FilterBox;