const template = document.createElement('template');

template.innerHTML = `
  <style>
    .rating {
      color: orange;
    }
  </style>
  <slot name="label"><i>Give your rating</i></slot>
  <div id="root">
  </div>
`;

const starTemplate = document.createElement('template');

starTemplate.innerHTML = `
<span class="rating"></span>
`;

class MyRating extends HTMLElement {
    constructor() {
        super();

        this._maxValue = 5;
        this._value = 0;
        
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    get maxValue() {
        return this._maxValue;
    }

    set maxValue(val) {
        this._maxValue = val;
        this.setAttribute("max-value", val);
    }

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.setAttribute("value", val);
    }

    static get observedAttributes() {
        return ["max-value", "value"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case "max-value":
                    this._maxValue = newValue;
                    break;
                case "value":
                    this._value = newValue;
                    break;
            }
            this.replaceStarList();
        }
    }

    connectedCallback() {
        this.createStarList();
     }

     createStarList() {
        let div = this.shadowRoot.getElementById("root");
        let star;
    
        div.innerHTML = "";
        for (let i = 1; i <= this.maxValue; i++) {
          if (i <= this.value) {
            star = this.createStar("&#x2605;", i);
          } else {
		    star = this.createStar("&#x2606;", i);           
          }
		  div.appendChild(star);
        }
    
        return div;
      }

      replaceStarList() {
        let starNode = this.shadowRoot.getElementById("root");

        if (starNode) {
            this.createStarList();
        }
      }

      createStar(starCode, index) {
        const starNode = starTemplate.content.cloneNode(true);
        const span = starNode.querySelector("span");

        span.addEventListener("click", () => {
            this.setAttribute("value", index);
        });
        span.innerHTML = starCode;
        
        return span;
      }
}

customElements.define("my-rating", MyRating);