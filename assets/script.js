const API = 'http://localhost:3001/products-list';
var wrapper = document.getElementById('products');
class ProductList{
	 getJson(url){
		let promise = new Promise(function(resolve, reject){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			      	resolve(xhttp.responseText);
			    }
			};
			xhttp.open("GET", url, true);
			xhttp.send();
		});
		return promise;
	}
	getSliderHtml(images){
		let str = '';
		for (var i = 0; i<images.length;i++) {
			str =  str + `<div class="product-item" style="left:${(i+1)*100}%;"><img meta="${images[i].meta}" alt="${images[i].alt}" rel="${images[i].rel}" src="${images[i].href}"/></div>`;
		}
		return str;
	}
	getProductHtml(product){
		let str = `<div class="product-grid__product-wrapper">
						<div class="product-grid__product">
							<div class="product-grid__img-wrapper">			
								<img src="${product.thumbnail.href}" alt="Img" class="product-grid__img" />
							</div>
							<span class="product-grid__title">${product.name}</span>
							<span class="product-grid__price">$${product.priceRange.selling.low}-$${product.priceRange.selling.high}</span>
							<div class="product-grid__extend-wrapper">
								<div class="product-grid__extend">
									<div class="product-carousel">
										<div class="icon-container left-arrow">
											<span class="lnr lnr-arrow-left-circle"><<</span>
										</div>
										<div class="product-items">
										<div class="product-item" style="left:0%;"><img meta="${product.hero.meta}" alt="${product.hero.alt}" rel="${product.hero.rel}" src="${product.hero.href}"/></div>
											${this.getSliderHtml(product.images)}
										</div>
										<!-- End .product-items -->
										<div class="icon-container right-arrow">
											<span class="lnr lnr-arrow-right-circle">>></span>
										</div>
									</div>
									<p class="product-grid__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis velit itaque odit.</p>
									<span class="product-grid__btn product-grid__add-to-cart"><i class="fa fa-cart-arrow-down"></i> Add to cart</span>
									<span class="product-grid__btn product-grid__view"><i class="fa fa-eye"></i> View more</span>
								</div>
							</div>
						</div>
					</div>`;

		let element = document.createElement('div');
		element.innerHTML = str.trim();
		this.carousel(element.firstChild)	;
		return element.firstChild;
	}
	carousel(element){
		var slides = element.querySelectorAll('.product-item'),
			 arrows = element.querySelectorAll('.lnr'),
			 carouselCount = 0,
			 scrollInterval,
			 interval = 2000;
		arrows[0].addEventListener('click', function (e) {
			e = e || window.event;
			e.preventDefault();
			carouselCount -= 100;
			if(carouselCount == (slides.length * -100) && slides.length > 1 ) {
				carouselCount =0;
			}
			for (var i = 0; i < slides.length; i += 1) {
				slides[i].style.transform = 'translateX('+carouselCount + '%)';
			}
			if (e.type !== 'autoClick') {
				clearInterval(scrollInterval);
				scrollInterval = setInterval(autoScroll, interval);
			}
		});
		arrows[1].addEventListener('click', sliderEvent);
		arrows[1].addEventListener('autoClick', sliderEvent);
		
		function sliderEvent(e) {
			e = e || window.event;
			e.preventDefault();
			carouselCount += 100;
			if( (carouselCount == (slides.length * 100) && slides.length > 1)) {
				carouselCount =0;
			}
			for (var i = 0; i < slides.length; i += 1) {
				slides[i].style.transform = 'translateX(-'+carouselCount + '%)';
			}
			if (e.type !== "autoClick") {
				clearInterval(scrollInterval);
				scrollInterval = setInterval(autoScroll, interval);
			}
		}
		
		var autoClick = new Event('autoClick');
		function autoScroll() {
			arrows[1].dispatchEvent(autoClick);
		}
		
		// set timing of dispatch click events
		scrollInterval = setInterval(autoScroll, interval);
	}
}
let productInstance = new ProductList;
productInstance.getJson(API).then(function(products){
	let productsJson = JSON.parse(products).Products;
	for(let i =0;i<productsJson.groups.length;i++){
		wrapper.appendChild(productInstance.getProductHtml(productsJson.groups[i]));
	}
	
})
/*var ProductList = (function() {
	var getJson = function(url){
		let promise = new Promise(function(resolve, reject){
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			      	resolve(xhttp.responseText);
			    }
			};
			xhttp.open("GET", url, true);
			xhttp.send();
		});
		return promise;
	}
	var getSliderHtml = function(images){
		let str = '';
		for (var i = 0; i<images.length;i++) {
			str =  str + `<div class="product-item" style="left:${(i+1)*100}%;"><img meta="${images[i].meta}" alt="${images[i].alt}" rel="${images[i].rel}" src="${images[i].href}"/></div>`;
		}
		return str;
	}
	var getProductHtml = function(product){
		let str = `<div class="product-grid__product-wrapper">
						<div class="product-grid__product">
							<div class="product-grid__img-wrapper">			
								<img src="${product.thumbnail.href}" alt="Img" class="product-grid__img" />
							</div>
							<span class="product-grid__title">${product.name}</span>
							<span class="product-grid__price">$${product.priceRange.selling.low}-$${product.priceRange.selling.high}</span>
							<div class="product-grid__extend-wrapper">
								<div class="product-grid__extend">
									<div class="product-carousel">
										<div class="icon-container left-arrow">
											<span class="lnr lnr-arrow-left-circle"><<</span>
										</div>
										<div class="product-items">
										<div class="product-item" style="left:0%;"><img meta="${product.hero.meta}" alt="${product.hero.alt}" rel="${product.hero.rel}" src="${product.hero.href}"/></div>
											${getSliderHtml(product.images)}
										</div>
										<!-- End .product-items -->
										<div class="icon-container right-arrow">
											<span class="lnr lnr-arrow-right-circle">>></span>
										</div>
									</div>
									<p class="product-grid__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis velit itaque odit.</p>
									<span class="product-grid__btn product-grid__add-to-cart"><i class="fa fa-cart-arrow-down"></i> Add to cart</span>
									<span class="product-grid__btn product-grid__view"><i class="fa fa-eye"></i> View more</span>
								</div>
							</div>
						</div>
					</div>`;

		let element = document.createElement('div');
		element.innerHTML = str.trim();
		carousel(element.firstChild)	;
		return element.firstChild;
	}
	var carousel = function(element){
		var slides = element.querySelectorAll('.product-item'),
			 arrows = element.querySelectorAll('.lnr'),
			 carouselCount = 0,
			 scrollInterval,
			 interval = 2000;
		arrows[0].addEventListener('click', function (e) {
			e = e || window.event;
			e.preventDefault();
			carouselCount -= 100;
			if(carouselCount == (slides.length * -100) && slides.length > 1 ) {
				carouselCount =0;
			}
			for (var i = 0; i < slides.length; i += 1) {
				slides[i].style.transform = 'translateX('+carouselCount + '%)';
			}
			if (e.type !== 'autoClick') {
				clearInterval(scrollInterval);
				scrollInterval = setInterval(autoScroll, interval);
			}
		});
		arrows[1].addEventListener('click', sliderEvent);
		arrows[1].addEventListener('autoClick', sliderEvent);
		
		function sliderEvent(e) {
			e = e || window.event;
			e.preventDefault();
			carouselCount += 100;
			if( (carouselCount == (slides.length * 100) && slides.length > 1)) {
				carouselCount =0;
			}
			for (var i = 0; i < slides.length; i += 1) {
				slides[i].style.transform = 'translateX(-'+carouselCount + '%)';
			}
			if (e.type !== "autoClick") {
				clearInterval(scrollInterval);
				scrollInterval = setInterval(autoScroll, interval);
			}
		}
		
		var autoClick = new Event('autoClick');
		function autoScroll() {
			arrows[1].dispatchEvent(autoClick);
		}
		
		// set timing of dispatch click events
		scrollInterval = setInterval(autoScroll, interval);
	}

	return {
		ajaxGet:url=>getJson(url),
		getProductHtml :product=>getProductHtml(product),
	};
})();

var wrapper = document.getElementById('products');
ProductList.getJson('products.json').then(function(products){
	let productsJson = JSON.parse(products);
	for(let i =0;i<productsJson.groups.length;i++){
		wrapper.appendChild(ProductList.getProductHtml(productsJson.groups[i]));
	}
	
})*/
