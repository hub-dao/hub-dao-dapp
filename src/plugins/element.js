import Vue from 'vue'
import {
  Button,
  Notification,
  Message,
  Carousel,
  CarouselItem,
  Dialog,
  Tooltip,
  Form,
  FormItem,
  Input,
  InputNumber,
  Row,
  Col
} from 'element-ui';

Vue.use(Button);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Dialog);
Vue.use(Tooltip);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Row);
Vue.use(Col);

Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
