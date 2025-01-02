import userModel from "../models/userModel.js"

//thêm vào giỏ hàng
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId );
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId])
            {
                cartData[req.body.itemId] = 1;
            }
            else{
                cartData[req.body.itemId] += 1;
            }
            await userModel.findByIdAndUpdate(req.body.userId, { cartData});   
            res.json({success:true, message:"Thêm vào giỏ hàng thành công"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Thêm vào giỏ hàng thất bại"});
    }



}



//xóa sản phẩm khỏi giỏ hàng
const removeProduct = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Xóa sản phẩm khỏi giỏ hàng thành công" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Xóa sản phẩm khỏi giỏ hàng thất bại" });
    }
}

//lấy giỏ hàng
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById (req.body.userId);
        let cartData = userData.cartData;
        res.json({success:true, cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Lấy giỏ hàng thất bại"});
    }
}

export{ addToCart, removeProduct, getCart }