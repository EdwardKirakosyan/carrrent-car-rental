import React from "react"
import { useParams, Link, NavLink, Outlet } from "react-router-dom"

export default function HostCarDetail() {
  const { id } = useParams()
  const [currentCar, setCurrentCar] = React.useState(null)

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  }

  React.useEffect(() => {
    fetch(`/api/host/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCurrentCar(data.cars))
  }, [])

  if (!currentCar) {
    return <h1>Loading...</h1>
  }
  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span>Back to all cars</span>
      </Link>

      <div className="host-car-detail-layout-container">
        <div className="host-car-detail">
          <img src={currentCar.imageUrl} />
          <div className="host-car-detail-info-text">
            <i className={`car-type car-type-${currentCar.type}`}>
              {currentCar.type}
            </i>
            <h3>{currentCar.name}</h3>
            <h4>${currentCar.price}/day</h4>
          </div>
        </div>

        <nav className="host-car-detail-nav">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ currentCar }} />
      </div>
    </section>
  )
}
