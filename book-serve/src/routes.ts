import * as Router from 'koa-router';
import controller = require('./controller');

const router = new Router();

router.post('/register', controller.user.createUser);
router.post('/login', controller.user.login);

router.post('/goods/list', controller.goods.getGoods);
router.post('/goods/detail', controller.goods.getGoodsById);
router.post('/goods/create', controller.goods.createGoods);
router.post('/goods/edit', controller.goods.updateGoods);
router.post('/goods/delete', controller.goods.deleteGoods);

router.post('/categories', controller.category.getCategories);
router.post('/category/create', controller.category.createCategory);
router.post('/category/edit', controller.category.updateCategory);
router.post('/category', controller.category.deleteCategory);


router.post('/address', controller.address.getAddress);
router.post('/address/detail', controller.address.getAddressById);
router.post('/address/create', controller.address.createAddress);
router.post('/address/edit', controller.address.updateAddress);
router.post('/address/delete', controller.address.deleteAddress);

router.post('/orders', controller.order.getOrders);
router.post('/order/detail', controller.order.getOrderById);
router.post('/order', controller.order.createOrder);
router.post('/order/status', controller.order.updateOrder);

router.post('/upload', controller.upload.upload);


export { router };