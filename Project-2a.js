/**
 * Copyright 2024 Rohan Matta
 * @license Apache-2.0, see LICENSE for full text.
 */
 import { LitElement, html, css } from "lit";
 import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
 import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
 import "@haxtheweb/rpg-character/rpg-character.js";
 import "wired-elements/lib/wired-slider.js";
 import "wired-elements/lib/wired-checkbox.js";
 import "wired-elements/lib/wired-input.js";
 
 /**
  * `Project-2a`
  * Interactive RPG character creator.
  * @demo index.html
  * @element project-2aa
  */
 export class Project2 extends DDDSuper(I18NMixin(LitElement)) {
   static get tag() {
     return "project-2a";
   }
 
   constructor() {
     super();
     this.title = "Project-2a";
     this.seed = "48936";
     this.characterAttributes = {
       accessories: 0,
       base: 1,
       face: 0,
       faceitem: 0,
       hair: 0,
       pants: 0,
       shirt: 0,
       skin: 0,
       hatcolor: 0,
       hat: "none",
       fire: false,
       walking: false,
       circle: false,
     };
     this.t = this.t || {};
     this.t = { ...this.t, title: "Title" };
 
     this.registerLocalization({
       context: this,
       localesPath:
         new URL("./locales/project-2.ar.json", import.meta.url).href + "/../",
       locales: ["ar", "es", "hi", "zh"],
     });
   }
 
   static get properties() {
     return {
       ...super.properties,
       title: { type: String },
       seed: { type: String },
       characterAttributes: { type: Object },
     };
   }
 
   static get styles() {
     return [
       super.styles,
       css`
         :host {
           display: block;
           color: var(--ddd-theme-primary);
           background-color: var(--ddd-theme-accent);
           font-family: var(--ddd-font-navigation);
         }
         .wrapper {
           margin: var(--ddd-spacing-2);
           padding: var(--ddd-spacing-4);
         }
         .inputs {
           display: flex;
           flex-direction: column;
           padding: 10px;
         }
         .input-group {
           margin-bottom: 15px;
         }
         button {
           background-color: #0078d4;
           color: white;
           border: none;
           padding: 10px;
           cursor: pointer;
           border-radius: 5px;
         }
         button:hover {
           background-color: #005a9e;
         }
         .character-display {
           margin-bottom: 20px;
         }
       `,
     ];
   }
 
   render() {
     return html`
       <div class="wrapper">
         <h3><span>${this.t.title}:</span> ${this.title}</h3>
         <div class="character-display">
           <rpg-character
             id="character"
             .seed="${this.seed}"
             .accessories="${this.characterAttributes.accessories}"
             .base="${this.characterAttributes.base}"
             .face="${this.characterAttributes.face}"
             .faceitem="${this.characterAttributes.faceitem}"
             .hair="${this.characterAttributes.hair}"
             .pants="${this.characterAttributes.pants}"
             .shirt="${this.characterAttributes.shirt}"
             .skin="${this.characterAttributes.skin}"
             .hatcolor="${this.characterAttributes.hatcolor}"
             .hat="${this.characterAttributes.hat}"
             .fire="${this.characterAttributes.fire}"
             .walking="${this.characterAttributes.walking}"
             .circle="${this.characterAttributes.circle}"
             
           ></rpg-character>
         </div>
 
         <div class="inputs">
           ${this.renderInputGroup("Accessories", "accessories", "slider", 0, 9)}
           ${this.renderInputGroup("Base", "base", "input")}
           ${this.renderInputGroup("Face", "face", "slider", 0, 5)}
           ${this.renderInputGroup("Fire", "fire", "checkbox")}
           ${this.renderInputGroup("Hat", "hat", "input")}
           ${this.renderInputGroup("Hat Color", "hatcolor", "slider", 0, 9)}
           ${this.renderInputGroup ("Walking", "walking", "checkbox")}
           ${this.renderInputGroup ("Circle", "circle", "checkbox")}
 
           <button @click="${this.generateShareLink}">Share</button>
           <div id="share-link"></div>
         </div>
       </div>
     `;
   }
 
   renderInputGroup(label, name, type, min = 0, max = 10) {
     if (type === "slider") {
       return html`
         <div class="input-group">
           <label>${label}:</label>
           <wired-slider
             min="${min}"
             max="${max}"
             .value="${this.characterAttributes[name]}"
             @change="${(e) => this.updateCharacter(e, name)}"
           ></wired-slider>
         </div>
       `;
     } else if (type === "checkbox") {
       return html`
         <div class="input-group">
           <label>${label}:</label>
           <wired-checkbox
             ?checked="${this.characterAttributes[name]}"
             @change="${(e) => this.updateCharacter(e, name)}"
           ></wired-checkbox>
         </div>
       `;
     } else if (type == "input"){
       return html`
         <div class="input-group">
           <label>${label}:</label>
           <wired-input
             .value="${this.characterAttributes[name]}"
             @input="${(e) => this.updateCharacter(e, name)}"
           ></wired-input>
         </div>
       `;
     }
   }
 
 
   updateCharacter(event, name) {
    let value;
  
    if (event.target.type === "checkbox" || event.target.tagName === "WIRED-CHECKBOX") {
      value = event.target.checked;
    } else if (event.target.tagName === "WIRED-SLIDER") {
      value = Number(event.target.value);
    } else {
      value = event.target.value;
    }
  
    const characterElement = this.shadowRoot.querySelector("#character");
  
    if (characterElement) {
      characterElement[name] = value;
  
      this.characterAttributes = {
        ...this.characterAttributes,
        [name]: value,
      };
  
      characterElement.requestUpdate();
    }
  }
  
  
  
   
   
   updateSeed() {
     this.seed = Object.values(this.characterAttributes).join("-");
   }
   
 
   updateURLParams() {
     const urlParams = new URLSearchParams();
     Object.entries(this.characterAttributes).forEach(([key, value]) => {
       urlParams.set(key, value);
     });
     window.history.replaceState(
       {},
       "",
       `${window.location.pathname}?${urlParams.toString()}`
     );
   }
 
   generateShareLink() {
     const urlParams = new URLSearchParams();
     Object.entries(this.characterAttributes).forEach(([key, value]) => {
       urlParams.set(key, value);
     });
 
     const shareURL = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
     const shareLinkDiv = this.shadowRoot.getElementById("share-link");
     shareLinkDiv.textContent = `Shareable link: ${shareURL}`;
     navigator.clipboard.writeText(shareURL).then(() => {
       console.log("Link copied to clipboard!");
     });
   }
 
   static get haxProperties() {
     return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
   }
 }
 
 customElements.define(Project2.tag, Project2);