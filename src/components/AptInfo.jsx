import React, { useState } from "react";

export function to_date_format(date_str) {
    const gubun = "-";
    var yyyyMMdd = String(date_str);
    var sYear = yyyyMMdd.substring(0, 4);
    var sMonth = yyyyMMdd.substring(4, 6);
    var sDate = yyyyMMdd.substring(6, 8);

    return sYear + gubun + sMonth + gubun + sDate;
}

const AptInfo = ({
    aptInfo: { highestPriceApts, newestDealApts },
    nearAptPriceInfo,
    onClickAddFilter,
    filters,
    onFilterDelete,
    isVisibleSearchbox
}) => {
    const [filter, setFilter] = useState({});
    const onDelete = (target) => {
        console.log('onDelete click~!', target);
        console.log('filters~!', filters);
        const filter = filters.filter((data) => {
            return data.aptName === target.아파트 && data.aptSize === target.전용면적;
        })[0];
        console.log('onDelete filter~!', filter);
        filter && onFilterDelete(filter);
    };
    // console.log(nearAptPriceInfo);
    // console.log();

    // highestPriceApts.map((highestPriceApt) => ());

    return (
        <>
            <article>
                <h1>우리아파트 최근 시세</h1>
                <table className="tg">
                    <thead>
                        <tr>
                            <th>전용면적</th>
                            <th>최근거래가</th>
                            <th>최고가</th>
                            <th>층수</th>
                            <th>최근거래가 거래일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newestDealApts &&
                            newestDealApts.map((newestDealApt, index) => {
                                const highestValue =
                                    highestPriceApts &&
                                    highestPriceApts.filter(
                                        (highestPriceApt) =>
                                            highestPriceApt.전용면적 === newestDealApt.전용면적
                                    );
                                return (
                                    <tr key={index}>
                                        <th className="right">{newestDealApt.전용면적}
                                        </th>
                                        <td className="right">
                                            {Number(newestDealApt.거래금액).toLocaleString("ko-KR")}
                                        </td>
                                        <td className="right">
                                            {highestValue &&
                                                Number(highestValue[0].거래금액).toLocaleString(
                                                    "ko-KR"
                                                )}
                                        </td>
                                        <td className="center">{newestDealApt.층}층</td>
                                        <td className="center">
                                            {to_date_format(newestDealApt.거래년월)}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </article>

            <article>
                <h1>인근아파트 최근 시세({nearAptPriceInfo.length})</h1>
                <table className="tg">
                    <thead>
                        <tr>
                            <th>아파트명</th>
                            <th>전용면적</th>
                            <th>최근거래가</th>
                            <th>최고가</th>
                            <th>최근거래가 거래일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nearAptPriceInfo &&
                            nearAptPriceInfo.map((apt, index) => {
                                return (
                                    <tr key={index}>
                                        <th className="center">{apt.아파트}
                                        </th>
                                        <td className="right">{apt.전용면적}</td>
                                        <td className="right">
                                            {Number(apt.거래금액).toLocaleString("ko-KR")}
                                        </td>
                                        <td className="right">
                                            {Number(apt.최고가).toLocaleString("ko-KR")}
                                        </td>
                                        <td className="center">{to_date_format(apt.거래년월)}
                                            <button className="habit-button habit-delete" onClick={onDelete.bind(this, apt)}>
                                                <i className="fas fa-minus-square"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
                <div className="addFilter">
                    <button type="button" id="addFilter" onClick={onClickAddFilter}>{isVisibleSearchbox ? "필터 숨기기" : "필터 보이기"}</button>
                </div>
            </article>
        </>
    );
};

export default AptInfo;
