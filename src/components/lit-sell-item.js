import { LitElement, html, css } from 'lit';

class LitSellItem extends LitElement {
  static styles = css`
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
    .old-price {
      text-decoration: line-through;
      color: gray;
      font-size: 0.8em;
    }
  `;

  static properties = {
    name: { type: String },
    img: { type: String },
    price: { type: Number },
    discount: { type: Number },
    discountPrice: { type: Number },
    rating: { type: Number }
  };

  constructor() {
    super();
  }

  priceTag() {
    return this.discountPrice ? 
      html`
        <p class="price old-price">$${this.price}</p>
        <p class="discount-price">$${this.discountPrice}</p>
        <div class="discount-div">
          <p class="discount">
            ${this.discount}% off
          </p>
        </div>
      ` :
      html`
        <p class="price">$${this.price}</p>
      `;
  }

  stars() {
    const stars = [];
    const rating = Math.round(this.rating);
    for (let i = 0; i < rating; i++) {
      stars.push("★");
    }
    for (let i = 0; i < 5 - rating; i++) {
      stars.push("☆");
    }
    return stars;
  }

  ratingFloat() {
    return this.rating.toFixed(1);
  }

  render() {
    return html`
      <div class="wrapper">
        <img class="img" src="${this.img}" alt="${this.name}" />
        <div class="attr-div">
          <p class="name">${this.name}</p>
          <div class="price-div">
            ${this.priceTag()}
          </div>
          <div class="star-div">
            <ul class="star-list">
              ${this.stars().map(star => html`<li>${star}</li>`)}
            </ul>
            <p class="rating">${this.ratingFloat()}</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("lit-sell-item", LitSellItem);