import { useState , useContext, createContext} from "react";


export default function CartProvider({ children }){
    const [cartItems, setCartItems] = useState([]);

    const CartContext = createContext(null);
    

    function addToCart(productId){
        const existing = cartItems.find((item)=>{
            item.id === productId
        })
        

        if(existing){
            const currentQuantity = existing.quanitiy;
            const updatedCartItems = cartItems.map((item)=>
                 item.id===productId ? {id: productId, quanitiy: currentQuantity+1}:item)
            setCartItems(updatedCartItems)
        }else{
            setCartItems([...cartItems], {id:productId, quanitiy:1})
        }

    }

    return <CartContext.Provider value={{cartItems, addToCart}}> 
    {children}
    </CartContext.Provider>
}

export function useCart(){
    const content = useContext(CartContext);
}
