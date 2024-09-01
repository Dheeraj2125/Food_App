import React from 'react'

export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleControls" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className='carousel-caption' style={{"zIndex":"10"}}>
                    <form className="d-flex">
                        <input className="form-control mr-sm-2 me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0 text-white bg-success" type="submit">Search</button>
                    </form>
                </div>
                <div className="carousel-inner" >
                    <div className="carousel-item active">
                        <img src="https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg" style={{"filter":"brightness(70%)","maxHeight":"500px"}} className="d-block w-100" alt="" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://j6e2i8c9.rocketcdn.me/wp-content/uploads/2021/05/Eggless-Black-forest-Pastry-recipe-1.jpg" style={{"filter":"brightness(70%)","maxHeight":"500px"}} className="d-block w-100" alt="" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://kauveryhospital.com/blog/wp-content/uploads/2021/04/pizza-5179939_960_720.jpg" style={{"filter":"brightness(70%)","maxHeight":"500px"}} className="d-block w-100" alt="" />
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
    )
}
