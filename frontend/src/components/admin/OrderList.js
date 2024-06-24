import { Fragment, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteOrder, adminOrders as adminOrdersAction } from "../../actions/orderActions"
import { clearError, clearOrderDeleted } from "../../slices/orderSlice"
import Loader from '../layouts/Loader';
import { MDBDataTable} from 'mdbreact';
import {toast } from 'react-toastify'
import Sidebar from "./Sidebar"

export default function OrderList() {

        // Redux state variables
    const { adminOrders = [], loading = true, error, isOrderDeleted }  = useSelector(state => state.orderState)

    const dispatch = useDispatch();

        // Function to format data for MDBDataTable
    const setOrders = () => {
        const data = {
            columns : [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number of Items',
                    field: 'noOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }

        adminOrders.forEach( order => {
            data.rows.push({
                id: order._id,
                noOfItems: order.orderItems.length,
                amount : `$${order.totalPrice}`,
                status: <p style={{color: order.orderStatus.includes('Processing') ? 'red' : 'green'}}>{order.orderStatus}</p> ,
                actions: (
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary"> <i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, order._id)} className="btn btn-danger py-2 px-3 ms-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data;
    }


        // Function to handle delete order action
    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteOrder(id))
    }

        // useEffect hook to handle error messages and fetch orders
    useEffect(() => {
         // Display error toast message and clear error state
        if(error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }

                // Display success toast message on order deletion and clear deleted state
        if(isOrderDeleted) {
            toast('Order Deleted Succesfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderDeleted())
            })
            return;
        }

                // Fetch admin orders on initial render
        dispatch(adminOrdersAction)
    },[dispatch, error, isOrderDeleted])


    return (
        <div className="row">

              {/* Sidebar Component */}
        <div className="col-12 col-md-2">
                <Sidebar/>
        </div>

          {/* Main Content */}
        <div className="col-12 col-md-10">
                                        <h2 className=" fw-bold my-4">Order List</h2>

           
            <Fragment>
                {loading ? <Loader/> : 
                    <MDBDataTable
                        data={setOrders()}
                        bordered
                        striped
                        hover
                        className="px-3"
                    />
                }
            </Fragment>
        </div>
    </div>
    )
}