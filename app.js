// LISTA DE PRODCUTOS PARA ORDENAR Y FILTRAR
const PRODUCTS = [
  {id:1, title:"IPHONE 17", price:899.99, category:"electronics", img:"https://cdn.mos.cms.futurecdn.net/mABJoCGzBGjaPBx3fuCyzc.jpg"},
  {id:2, title:"Airpods Pro", price:399.99, category:"electronics", img:"https://images.macrumors.com/t/y5UXYVDLgl76EeRoDi849fjk2YM=/1600x0/article-new/2025/09/airpods-pro-3-blue.jpeg"},
  {id:3, title:"DJI OSMO 360", price:549.99, category:"electronics", img:"https://flyintunnel.com/cdn/shop/articles/djiosmoprediction.png?v=1730877311"},
  {id:4, title:"Collar de Plata Mujer Lotus", price:119.00, category:"jewelery", img:"https://ae01.alicdn.com/kf/S2d76c5ed3938452caa8f6570f20e81f4K/Collar-de-plata-de-ley-925-para-mujer-Gargantilla-geom-trica-multicapa-cadena-de-clav-cula.jpg"},
  {id:5, title:"Bracelete de Oro Mujer 18K", price:449.99, category:"jewelery", img:"https://cdn.shopify.com/s/files/1/0043/7757/5458/products/ripple-t-bar-bracelet-gold-2_1080x.jpg?v=1627658337"},
  {id:6, title:"Jacket de Hombre", price:79.50, category:"men's clothing", img:"https://i5.walmartimages.com/asr/5c580ff0-4ce2-4954-9ebb-ee8a528f1287_1.00e044df3ddf50cbaa65c7b41b4762c2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"},
  {id:7, title:"Camisa de Vestir de Hombre", price:50.00, category:"men's clothing", img:"https://ae01.alicdn.com/kf/HTB1GBTYJVXXXXb3XpXXq6xXFXXXa/2015-nuevos-Mens-moda-hombres-de-las-camisas-de-hombre-Casual-Slim-Fit-elegante-camisas-de.jpg"},
  {id:8, title:"Vestido de Mujer", price:69.90, category:"women's clothing", img:"https://static.mohito.com/media/catalog/product/cache/small_image/960/9df78eab33525d08d6e5fb8d27136e95/Y/K/YK623-87X-001.jpg"},
  {id:9, title:"Cartera de Mujer", price:60.00, category:"women's clothing", img:"https://jolynneshane.com/wp-content/uploads/2018/09/yellow-sweater-leopard-8.jpg"},
  {id:10, title:"JBL Charge 4", price:130.00, category:"electronics", img:"https://i5.walmartimages.com/asr/4e4b6806-dd04-4278-82df-4e726facc3ea_1.8fdfbef9493e8f727490f51f43ceeb07.jpeg"},
  {id:11, title:"Anillo de mujer ", price:159.00, category:"jewelery", img:"https://i.etsystatic.com/24864219/r/il/97bae2/2939260217/il_fullxfull.2939260217_l29t.jpg"},
  {id:12, title:"Jacket de Mujer", price:86.50, category:"women's clothing", img:"https://ae01.alicdn.com/kf/HTB1EivvKXmWBuNjSspdq6zugXXaN/Womens-Ladies-Retro-Rivet-Zipper-Up-Bomber-Jacket-Casual-Coat-Outwear-leather-jacket-chaqueta-mujer.jpg"}
];

// Navbar de la barra de navegación
(function() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav .menu a').forEach(a => {
    if (a.getAttribute('href') === path) a.setAttribute('aria-current','page');
  });
})();

// Landing page: Testimonios 
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  if(!track) return;
  const dots = document.querySelectorAll('.dot');
  let idx = 0;
  function show(i){
    idx = i;
    track.style.transform = `translateX(-${i*100}%)`;
    dots.forEach((d, di)=> d.classList.toggle('active', di===i));
  }
  dots.forEach((d,i)=> d.addEventListener('click', ()=>show(i)));
  setInterval(()=> show((idx+1)%dots.length), 4000);
  show(0);
}

// Pagina de productos: Renderizado y filtrado
function initProducts() {
  const grid = document.querySelector('.products');
  if(!grid) return;
  const cats = ["all","electronics","jewelery","men's clothing","women's clothing"];
  const filters = document.querySelector('.filters');
  // creacion de los botones de filtro dinamicamente
  cats.forEach(c=> {
    const b=document.createElement('button'); b.className='filter-btn'; b.textContent=c.replace("men's","Men's").replace("women's","Women's"); b.dataset.cat=c; filters.appendChild(b);
  });
  const setActive=(cat)=> {
    document.querySelectorAll('.filter-btn').forEach(b=> b.classList.toggle('active', b.dataset.cat===cat));
  };
  function render(cat='all') {
    setActive(cat);
    const items = PRODUCTS.filter(p=> cat==='all' ? true : p.category===cat);
    grid.innerHTML = items.map(p=> `
      <article class="product" aria-label="${p.title}">
        <img src="${p.img}" alt="${p.title}">
        <div class="info">
          <h3>${p.title}</h3>
          <div class="row"><span class="tag">${p.category}</span><span class="price">$${p.price.toFixed(2)}</span></div>
          <p class="muted">Excelente calidad y garantía TechShop.</p>
          <button onclick="alert('Añadido al carrito (demo)')">Agregar al carrito</button>
        </div>
      </article>
    `).join('');
  }
  filters.addEventListener('click', (e)=> {
    if(e.target.closest('.filter-btn')) render(e.target.closest('.filter-btn').dataset.cat);
  });
  render();
}

// envio de formulario de contacto 
function initContact() {
  const form = document.querySelector('#contact-form');
  if(!form) return;
  const status = document.querySelector('#form-status');
  form.addEventListener('submit', e=> {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    
    if(!data.name || !data.email || !data.message) {
      status.textContent = 'Por favor completa todos los campos requeridos.';
      status.style.color = '#ffb4b4';
      return;
    }
    // Simulacion de envio
    status.textContent = '¡Gracias! Hemos recibido tu mensaje y te contactaremos pronto.';
    status.style.color = '#c8ffdb';
    form.reset();
  });
}

// Arranque de la pagina
window.addEventListener('DOMContentLoaded', ()=>{
  initCarousel();
  initProducts();
  initContact();
});
