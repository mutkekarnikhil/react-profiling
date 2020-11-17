import React from 'react'

const Card = ({ title, description, img }) => {
    return (
        <div className="card">
            <img className="img-logo" src={img} width="130px" height="240px" alt=""></img>
            <label className="title">{title}</label>
            <span className="description">{description}</span>
        </div>
    )
}

const areEqual = (prev, next) => {
    console.log(prev, next, prev.title === next.title, prev.description === next.description, prev.img === next.img)
    return prev.title === next.title && prev.description === next.description && prev.img === next.img
    // return false
}

const MemoizedCard = React.memo(({ title, description, img }) => {
    return (
        <div className="card">
            <img className="img-logo" src={img} width="130px" height="240px" alt=""></img>
            <label className="title">{title}</label>
            <span className="description">{description}</span>
        </div>
    )
})

export { Card, MemoizedCard };