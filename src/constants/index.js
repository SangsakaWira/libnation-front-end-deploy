export const API = "http://localhost:5000"
export const books = [{
    image: "assets/images/image-1.png",
    title: "Harry Potter",
    price: "Rp 150.000",
    description: "Lorem Ipsum",
    button: "Add to Cart",
    bought: false
}, {
    image: "assets/images/image-2.png",
    title: "Harry Potter II",
    price: "Rp 250.000",
    description: "Lorem Ipsum",
    button: "Read",
    bought: true
}, {
    image: "assets/images/image-3.png",
    title: "Harry Potter III",
    price: "Rp 200.000",
    description: "Lorem Ipsum",
    button: "Read",
    bought: true
}]
export const numberFormatter =  (price)=>{
    return parseInt(price).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
    })
}