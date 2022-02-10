export default{
    props:['pages'],
    template:`<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{disabled :!pages.has_pre}">
        <a class="page-link" @click.prevent="$emit('switchPage',pages.current_page-1)" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class="{active : page===pages.current_page}"
       v-for="page in pages.total_pages" :key="page+'pages'"><a class="page-link" @click.prevent="$emit('switchPage',page)"
       href="#">{{page}}</a></li>
      <li class="page-item" :class="{disabled :!pages.has_next}">
        <a class="page-link" @click.prevent="$emit('switchPage',pages.current_page+1)" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
}