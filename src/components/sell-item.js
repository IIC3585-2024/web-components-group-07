class sellItem extends HTMLElement {
  constructor() {
    super();
  }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');

        


        // if img is not provided, use a default image
        if (!this.hasAttribute('img')) {
            this.setAttribute('img', 'https://via.placeholder.com/150');
        }

        const img = document.createElement('img');
        img.src = this.getAttribute('img');
        img.alt = this.getAttribute('name');
        img.setAttribute('class', 'img');

        const attrDiv = document.createElement('div');
        attrDiv.setAttribute('class', 'attr-div');


        const name = document.createElement('p');
        name.textContent = this.getAttribute('name');
        name.setAttribute('class', 'name');
        attrDiv.appendChild(name);

        const priceDiv = document.createElement('div');
        priceDiv.setAttribute('class', 'price-div');


        const price = document.createElement('p');
        price.textContent = '$'+ this.getAttribute('price');
        price.setAttribute('class', 'price');
        priceDiv.appendChild(price);

        // if discount price is provided, show it
        if (this.hasAttribute('discount-price')) {
            const discountDiv = document.createElement('div');
            discountDiv.setAttribute('class', 'discount-div');
            price.style.textDecoration = 'line-through';
            price.style.color = 'gray';
            price.style.fontSize = '0.8em';
            const discountPrice = document.createElement('p');
            discountPrice.textContent = '$' + this.getAttribute('discount-price');
            discountPrice.setAttribute('class', 'discount-price');

            const discount = document.createElement('p');
            discount.textContent = this.getAttribute('discount') + '% off';
            discount.setAttribute('class', 'discount');

            priceDiv.appendChild(discountPrice);
            discountDiv.appendChild(discount);

            wrapper.appendChild(discountDiv);

        }
        attrDiv.appendChild(priceDiv);

        let starDiv;
        // if rating is provided, show it
        if (this.hasAttribute('rating')) {
            starDiv = document.createElement('div');
            starDiv.setAttribute('class', 'star-div');

            const starList = document.createElement('ul');
            starList.setAttribute('class', 'star-list');
            // add starts for the rounded rating
            for (let i = 0; i < Math.round(this.getAttribute('rating')); i++) {
                const star = document.createElement('li');
                star.textContent = '★';
                starList.appendChild(star);
            }
            // add empty starts for the remaining
            for (let i = Math.round(this.getAttribute('rating')); i < 5; i++) {
                const star = document.createElement('li');
                star.textContent = '☆';
                starList.appendChild(star);
            }
            starDiv.appendChild(starList);

            const rating = document.createElement('p');
            rating.textContent = this.getAttribute('rating');
            rating.setAttribute('class', 'rating');
            starDiv.appendChild(rating);
        }
        if (starDiv) {
            attrDiv.appendChild(starDiv);
        }

        const style = document.createElement('style');
        style.textContent = `
            .wrapper {
                position: relative;
                font-family: Arial, Helvetica, sans-serif;
                max-width: 300px;
                margin: 5px;
                padding: 10px;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
                background-color: white;
                border-radius: 5px;
                text-align: center;
                box-sizing: border-box;
                float: left;
            }
            .img {
                width: 100%;
                height: 150px;
                text-align: center;
                object-fit: cover;
                border-radius: 5px;
                display: block;
            }
            .name {
                font-size: 1.2em;
                text-align: center;
                margin: 10px 0;
            }
            .price-div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-height: 50px;
            }
            .price {
                font-size: 1.5em;
                margin: 0;
            }
            .discount-div {
                position: absolute;
                top: 10px;
                right: 10px;
                background-color: red;
                color: white;
                padding: 5px 10px;
                font-size: 14px;
                font-weight: bold;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                z-index: 1;
            }
            .discount-price {
                font-size: 1.5em;
                margin: 0;
                color: red;
            }
            .discount {
                font-size: 0.8em;
                margin: 0;
            }
            .attr-div {
                margin-top: 10px;
            }
            .star-div {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .star-list {
                display: flex;
                list-style: none;
                padding: 0;
            }
            .star-list li {
                font-size: 1.2em;
                color: gold;
            }
            .rating {
                font-size: 1em;
                margin-left: 5px;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);

        wrapper.appendChild(img);
        wrapper.appendChild(attrDiv);
    }
}

customElements.define('sell-item', sellItem);