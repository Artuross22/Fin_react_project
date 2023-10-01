 import React from 'react'
 import "./Card.css"
 
 interface Props {
    companyName: string;
    ticker: string;
    price: number;
 }
 
 const Card: React.FC<Props> = ({ 
  companyName,
   ticker, 
   price 
  }: Props) : JSX.Element => {
   return (
     <div className='card'> 
     <img 
     src="https://ukraine.ua/wp-content/uploads/2020/10/shutterstock_156164915-2048x1356.jpg"
     alt="image"
     />
    
     <div className="details">
        <h2>
          {companyName} ({ticker})
        </h2>
        <p>${price}</p>
     </div>
    <p className="info">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus.</p>
     </div>
   )
 }
 
 export default Card