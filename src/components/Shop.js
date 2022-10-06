import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import {actionCreators} from './state/index'
import { useSelector } from 'react-redux'

const Shop = () => {

 const dispatch = useDispatch();
 const {withdrawMoney, depositMoney} = bindActionCreators(actionCreators, dispatch);

 const amount = useSelector(state => state.amount )

  return (
    <div className='container my-3 text-center'>
        <h2>Deposit/Widraw Notes</h2>

      {/* <div className="btn btn-primary mx-2" onClick={()=>{dispatch(actionCreators.withdrawMoney(100))}}>-</div>       these callback function is working -- whereas bindActionCreator() make it easy to not write function again and again
      Update Balance
      <div className="btn btn-primary mx-2" onClick={()=>{dispatch(actionCreators.depositMoney(100))}}>+</div> */}

      <div className="btn btn-primary mx-2" onClick={()=> {withdrawMoney(100)}}>-</div>       
      Update Balance ({amount})
      <div className="btn btn-primary mx-2" onClick={()=> {depositMoney(100)}}>+</div>
    </div>
  )
}

export default Shop
