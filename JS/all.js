let myModal="";
import pagination from "./pagination.js";
import editProductModal from "./modal-component.js";
const app = Vue.createApp({
  data() {
    return {
      isNew: true,
      postId:"",
      page:null,
      user: {
        "username": "",
        "password": ""
      }, apiInfo: {
        url: 'https://vue3-course-api.hexschool.io/v2',
        path: 'chun-chia'
      }, products: [],
      pagination:{},
      productTemp: {},
      inputProduct: {
        title: "",
        category: "",
        origin_price: null,
        price: null,
        unit: "",
        description: "",
        content: "",
        is_enabled:"",
        imageUrl: "",
        imagesUrl:[],
      },
    }
  },
  components:{
    pagination,
    editProductModal
  },
  methods: {
    openModal(data) {
      myModal.show();
      //把id寫入postId
      //把products的資料取出傳到inputProudct
      if (this.isNew === false) {
        Object.keys(data).forEach((item)=>{
          Object.keys(this.inputProduct).forEach((i)=>{
            if(item===i){
              this.inputProduct[i]=data[item]
            };
          });
        });
        
      }
    },
    closeModal() {
      myModal.hide();
      //每次關閉都會重製inputProduct
      this.resetModal();
    },
    resetModal(){
      this.inputProduct = {
        title: "",
        category: "",
        origin_price: null,
        price: null,
        unit: "",
        description: "",
        content: "",
        is_enabled: "",
        imageUrl: "",
        imagesUrl: []
      };
    },
    porductStatus(data) {
      let result = null;
      switch (data) {
        case 0: result = "未上架"
          break;
        case 1: result = "已上架"
          break;
        case 2: result = "缺貨中"
          break;
        case 3: result = "補貨中"
          break;
        case 4: result = "促銷中"
          break;
        case 5: result = "待下架"
          break;
      };
      return result;
    }, 

    showProduct(data) {
      this.productTemp = data;
      console.dir(this.productTemp)
    },
    login() {
      console.log(this.user);
      if (this.user.username !== '' && this.user.password !== '') {
        axios.post(`${this.apiInfo.url}/admin/signin`, this.user).then((res) => {
          //console.log(res.data)
          //把token存到cookie
          document.cookie = `myHextoken1=${res.data.token}; expires=${new Date(res.data.expired)}`;
          //轉跳頁面到產品資料頁
          //或是用window.location="Vue first week-2.html"
          location.href = "./Admin produlist.html"
        }).catch((err) => {
          alert(err.response.data.message)
        })
      } else { alert("請輸入帳號與密碼") }
    },
    sendToken() {
      const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)myHextoken1\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = myToken;
      
    },
    getProduct(page =1) {
      //console.log(location.pathname)
      //判斷目前頁面是否為"/Vue first week-2.html"可以先用console.log(location.pathname)確認
      //傳到git hub上面時要去看git hub上面的location.pathname，在網頁的console 輸入location.pathname
      if (location.pathname === '/Vue-foruth-week/Admin%20produlist.html') {
        //取得所存在cookie的token
        this.sendToken();
        //頁數使用用query
        axios.get(`${this.apiInfo.url}/api/${this.apiInfo.path}/admin/products/?page=${page}`).then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        }).catch((err) => {
          alert(`${err.response.data.message},自動轉跳至登入頁`)
          if(err.response.data.message==='驗證錯誤, 請重新登入'){
            location.href = "./index.html"
          }
        });
      }
    },
    deleteProduct(){
      const confrim = prompt("請輸入delete")
      if(confrim==='delete'){
        axios.delete(`${this.apiInfo.url}/api/${this.apiInfo.path}/admin/product/${this.postId}`).then((res) => {
          alert(res.data.message);
          this.getProduct();
          
        }).catch((err) => {
          alert(err.response.data.message);
        });
      }else{
        alert('輸入錯誤，不進行刪除')
      }
    },
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    myModal = new bootstrap.Modal(document.querySelector('#modalInputData'));
    this.getProduct();
  },
})
app.mount("#app")

