import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart,useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch=useDispatchCart();
    let data=useCart();

    let Options = props.options;
    let priceOptions = Object.keys(Options);
    const priceRef=useRef();
    //Set quantity and size
    const [qty,setQty] = useState(1)
    const [size,setSize] = useState("")
    //set the final price
    const [finalPrice, setFinalPrice] = useState(0);

    //****** let finalPrice = qty*parseInt(Options[size]) ******//
    //calculating the final price - using UseEffect() when quantity and size are changed
    useEffect(() => {
        const calculateFinalPrice = () => {
            const selectedSize = size;
            const selectedQty = qty;
            if (Options[selectedSize]) {
                return parseInt(Options[selectedSize]) * parseInt(selectedQty);
            }
            return 0;
        };
        const newFinalPrice = calculateFinalPrice();
        setFinalPrice(newFinalPrice);
    }, [qty, size, Options]);

    //add items based on user selection
    const handleAddCart = async () => {
        if (!localStorage.getItem('authToken')) {
            alert('Please login to add items to your cart.');
            return;
        }

        //check if item of same size already exists 
        let existingItem = data.find(item => item.id === props.foodItem._id && item.size === size);

        if (existingItem) {
            /*
            const newQty = qty;
            const newPricePerUnit = parseInt(Options[size]);  // Price per unit based on size
            const newPrice = newPricePerUnit * newQty;
            */
           
           //if exists update
            const newPrice = finalPrice;

            await dispatch({
                type: "UPDATE",
                id: props.foodItem._id,
                size: size,
                qty: qty,
                price: newPrice
            });
        } else {
            //else add to cart
            await dispatch({
                type: "ADD",
                id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalPrice,
                qty: qty,
                size: size,
                img: props.foodItem.img
            });
        }
    };

    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])


    return (
        <div>
            <div className="card m-3" style={{ "width": "18rem", "maxHeight": "450px" }}>
                <img src={props.foodItem.img} style={{height:"200px",objectFit:"fill"}} alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <p className="card-text">This is some imp text</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100  bg-success rounded' onChange={(e)=> setQty(parseInt(e.target.value))}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })
                            }
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                            {
                                priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })
                            }
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            Price: ₹{finalPrice}/-
                        </div>
                        <hr></hr>
                        <button className='btn btn-success justify-center ms-2' onClick={handleAddCart}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
