export class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop{
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          z-index: 10;
          opacity: 0;
          pointer-events: none;
        }

        :host([open]) #backdrop, :host([open]) #modal {
          opacity: 1;
          pointer-events: all;
        }
        
        :host([open]) #modal {
          top: 15vh;
        }


        header {
          padding: 1rem;
          border-bottom: 1px solid #ccc;
        }

        ::slotted(h2) {
          font-size: 2.25rem;
        }

        #main {
          padding: 1rem;
        }

        #modal {
          position: fixed;
          top: 10vh;
          left: 25%;
          width: 50%;
          z-index: 100;
          background-color: white;
          border-radius: 3px;
          box-shadow: 0 2px 8px #333;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          pointer-events: none;
          transition: all 0.2s ease-out;
          
        }
        #actions{
          border-top: 1px solid #ccc;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }
        #actions button {
          margin: 0 0.25rem;
        }
      </style>
      <div id="backdrop"></div>
      <div id="modal">
        <header part="header">
            <slot name="title">Modal Title</slot>
        </header>
        <section id="main" part="content">
          <slot>Modal Content goes here</slot>
        </section>
        <section id="actions" part="footer">
          <button id="exit-button" part="button">Return To Menu</button>
        </section>
      </div>
    `;

    const backdrop = this.shadowRoot.querySelector("#backdrop");
    backdrop.addEventListener("click", this._cancel.bind(this));

    const exitButton = this.shadowRoot.querySelector("#exit-button");
    exitButton.addEventListener("click", this._cancel.bind(this));
  }

  attributeChangedCallback() {
    if (this.hasAttribute("open")) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }
  static get observedAttributes() {
    return ["open"];
  }

  open() {
    this.setAttribute("open", "");
    this.isOpen = true;
  }

  hide() {
    if (this.hasAttribute("open")) {
      this.removeAttribute("open");
    }
    this.isOpen = false;
  }

  _cancel() {
    this.hide();
    const cancelEvent = new Event("cancel");
    this.dispatchEvent(cancelEvent);
  }
}
