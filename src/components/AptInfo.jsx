import React from "react";

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
                                            highestValue && highestValue[0].거래금액
                                        }
                                    </td>
                                    <td>{newestDealApt.층}층</td>
                                    <td>{newestDealApt.거래년월}</td>
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
                                    <th>{apt.전용면적}</th>
                                    <td>{apt.거래금액}</td>
                                    <td>
                                        {
                                            apt.최고가
                                        }
                                    </td>
                                    <td>{apt.거래년월}</td>
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
