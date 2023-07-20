'use client';

import Button from '../Button'

const ButtonsSide = () => {
    return (
        <>
            <div className="flex gap-4 my-2">
                <Button label="Add To cart" onClick={() => { }} />
                <Button label="Wishlist" outline onClick={() => { }} />
            </div>
            <div className="my-4 ">
                <Button label="Buy Now" onClick={() => { }} />
            </div>
        </>
    )
}

export default ButtonsSide