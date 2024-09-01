import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

export default function Home() {
    const [search,setSearch]=useState('')
    //first fetch data from DB hitting endpoint and load them in variables to use in frontend 
    const [foodItem, setFoodItems] = useState([])
    const [foodCat, setFoodCat] = useState([])

    const loadData = async (e) => {
        const response = await fetch("http://localhost:5000/api/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const food_cat = await response.json()
        setFoodItems(food_cat[0])
        setFoodCat(food_cat[1])
        //console.log(food_cat[0],food_cat[1])
    }
    // UseEffect -> calls a function based on dependency i.e. only calls the respective function when changes are done in that element 
    useEffect(() => {
        loadData()
    }, [])//empty dependency calls the function only for the first time to load data
    
    const onChange=(e)=>{
        setSearch(e.target.value);
    }

    return (
        <div>
            <div><Navbar /></div>
            {/* carousel with search bar */}
            <div>
                <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className='carousel-caption' style={{ "zIndex": "10" }}>
                        <div className="d-flex">
                            <input className="form-control mr-sm-2 me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={onChange}/>
                            {/* <button className="btn btn-outline-success my-2 my-sm-0 text-white bg-success" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-inner" >
                        <div className="carousel-item active">
                            <img src="https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg" style={{ "filter": "brightness(70%)", "maxHeight": "500px" }} className="d-block w-100" alt="" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://j6e2i8c9.rocketcdn.me/wp-content/uploads/2021/05/Eggless-Black-forest-Pastry-recipe-1.jpg" style={{ "filter": "brightness(70%)", "maxHeight": "500px" }} className="d-block w-100" alt="" />
                        </div>
                        <div className="carousel-item">
                            <img src="https://kauveryhospital.com/blog/wp-content/uploads/2021/04/pizza-5179939_960_720.jpg" style={{ "filter": "brightness(70%)", "maxHeight": "500px" }} className="d-block w-100" alt="" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            {/* cards with food items information */}
            <div className='container'>
                {
                    //ternary operator => ()?[]:[]
                    foodCat != []
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    {/* As we cannot display the object directly  */}
                                    <div key={data._id} className='fs-3 mt-3'>{data.CategoryName}</div>
                                    <hr></hr>
                                    {
                                        foodItem != [] ?
                                            foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase()).includes(search.toLowerCase()))
                                                .map(fitems => {
                                                    return (
                                                        <div key={fitems._id} className='col-12 col-md-6 col-lg-3 '>
                                                            <Card foodItem={fitems}
                                                                options={fitems.options[0]}
                                                            >

                                                            </Card>
                                                        </div>
                                                    )
                                                })
                                            : <div>No data</div>
                                    }

                                </div>
                            )
                        })
                        : <div>No data</div>
                }
            </div>
            <div><Footer /></div>
        </div>
    )
}
