import { Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOut from "./CheckOut";




const stripePromise = loadStripe('pk_test_51MsWG8IIoBuPupkUpwnu0WbfWmZj8AkUykMtX0r97pTzVz7GuLJwxMuobZsaspNL2Rey3VmLptRGsyPElT6ZkB8d00gkkBjapv')
const FundForm = () => {
    return (
        <div>
            {/* <form onSubmit={handleSubmit(handleFund)} >
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        value={user?.email}
                        readOnly
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        {...register("name")}
                        type="text"
                        value={user?.displayName}
                        readOnly
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="modal-action">
                    <input type="submit" className="btn" />

                </div>
            </form> */}
            <Elements stripe={stripePromise}>
                <CheckOut></CheckOut>
            </Elements>

        </div>
    )
}
export default FundForm