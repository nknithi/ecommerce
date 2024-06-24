export default function OrderSuccess() {
    return (
        <div className="row justify-content-center mb-3">
            <div className="col-6 mt-3 text-center">

                {/* Order success image */}
                <img className="my-5 img-fluid d-block mx-auto" src="/images/success.png" alt="Order Success" width="200" height="200" />

                {/* Success message */}
                <h2>Your Order has been placed successfully.</h2>

                {/* Link to go to Orders */}
                <a href="/orders">Go to Orders</a>
            </div>

        </div>
    )
}