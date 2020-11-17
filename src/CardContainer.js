import React, { Profiler } from 'react'
import { Card, MemoizedCard } from './Card'

const CardContainer = ({ cardData, callback }) => {
    let metricsForNonMemoizedCards
    let metricsForMemoizedCards
    const onrenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
        /**
         * id: Id of the component which is committed, there can be multiple component having these Profiler wrapped around
         * phase: "mount" | "update"
         * actualDuraion: Time spent rendering Profiler and Its descedants
         * baseDuration: time of most recent render time, this accounts for worst case cost of rednering i.e. Without memoization
         * startTime: timestamp when React began rendering
         * commitTime: timeStamp when react committed current update
         * interaction: Set of interactions being committed during the scheduled update.
         */
        if (id.toString().startsWith('memo')) {
            metricsForMemoizedCards = { actualDuration, baseDuration, phase }
        } else if (id.toString().startsWith('card')) {
            metricsForNonMemoizedCards = { actualDuration, baseDuration, phase }
        }
        // callback(metricsForMemoizedCards, metricsForNonMemoizedCards);
    }

    return (
        <>
            <div className="card-container">
                <span>Non Memoized Cards</span>
                <Profiler id={`card`} onRender={onrenderCallback}>
                    <div className="cards">
                        {cardData.map((data, i) => (
                            <Card
                                title={data.title}
                                description={data.description}
                                img={data.img}
                                key={i}
                            />
                        ))}
                    </div>
                </Profiler>
                <hr />
                <span>Memoized Cards</span>
                <Profiler id={`memo-card`} onRender={onrenderCallback}>
                    <div className="memo-cards">
                        {cardData.map((data, i) => (
                            <MemoizedCard
                                title={data.title}
                                description={data.description}
                                img={data.img}
                                key={i}
                            />
                        ))}
                    </div>
                </Profiler>
            </div >
            <button onClick={() => { callback(metricsForMemoizedCards, metricsForNonMemoizedCards) }}>Click to View Performance Data</button>
        </>
    )
}

export default CardContainer;