import React from "react";

function to_date_format(date_str) {
    const gubun = '-';
    var yyyyMMdd = String(date_str);
    var sYear = yyyyMMdd.substring(0, 4);
    var sMonth = yyyyMMdd.substring(4, 6);
    var sDate = yyyyMMdd.substring(6, 8);

    return sYear + gubun + sMonth + gubun + sDate;
}
const AptInfo = ({ aptInfo: { highestPriceApts, newestDealApts }, nearAptPriceInfo }) => {
    // console.log();

    // highestPriceApts.map((highestPriceApt) => ());

    return (
        <>
            <h1>율곡아파트 최근 시세</h1>
            <table>
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
                    {
                        newestDealApts && newestDealApts.map((newestDealApt, index) => {
                            const highestValue = highestPriceApts && highestPriceApts.filter((highestPriceApt) => (highestPriceApt.전용면적 === newestDealApt.전용면적));
                            return (
                                <tr key={index}>
                                    <th>{newestDealApt.전용면적}</th>
                                    <td>{newestDealApt.거래금액}</td>
                                    <td>
                                        {
                                            highestValue && Number(highestValue[0].거래금액).toLocaleString('ko-KR')
                                        }
                                    </td>
                                    <td>{newestDealApt.층}층</td>
                                    <td>{to_date_format(newestDealApt.거래년월)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <h1>인근아파트 최근 시세</h1>
            <table>
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
                    {
                        nearAptPriceInfo && nearAptPriceInfo.map((apt, index) => {
                            return (
                                <tr key={index}>
                                    <th>{apt.아파트}</th>
                                    <td>{apt.전용면적}</td>
                                    <td>{Number(apt.거래금액).toLocaleString('ko-KR')}</td>
                                    <td>
                                        {
                                            Number(apt.최고가).toLocaleString('ko-KR')
                                        }
                                    </td>
                                    <td>{to_date_format(apt.거래년월)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </>

    );
}

export default AptInfo;
