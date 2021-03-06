/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface YooHelloComponent {
    /**
    * The first name
    */
    'personName': string;
  }
  interface YooHelloComponentAttributes extends StencilHTMLAttributes {
    /**
    * The first name
    */
    'personName'?: string;
  }

  interface YooMyComponent {
    /**
    * The first name
    */
    'first': string;
    /**
    * The last name
    */
    'last': string;
    /**
    * The middle name
    */
    'middle': string;
  }
  interface YooMyComponentAttributes extends StencilHTMLAttributes {
    /**
    * The first name
    */
    'first'?: string;
    /**
    * The last name
    */
    'last'?: string;
    /**
    * The middle name
    */
    'middle'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'YooHelloComponent': Components.YooHelloComponent;
    'YooMyComponent': Components.YooMyComponent;
  }

  interface StencilIntrinsicElements {
    'yoo-hello-component': Components.YooHelloComponentAttributes;
    'yoo-my-component': Components.YooMyComponentAttributes;
  }


  interface HTMLYooHelloComponentElement extends Components.YooHelloComponent, HTMLStencilElement {}
  var HTMLYooHelloComponentElement: {
    prototype: HTMLYooHelloComponentElement;
    new (): HTMLYooHelloComponentElement;
  };

  interface HTMLYooMyComponentElement extends Components.YooMyComponent, HTMLStencilElement {}
  var HTMLYooMyComponentElement: {
    prototype: HTMLYooMyComponentElement;
    new (): HTMLYooMyComponentElement;
  };

  interface HTMLElementTagNameMap {
    'yoo-hello-component': HTMLYooHelloComponentElement
    'yoo-my-component': HTMLYooMyComponentElement
  }

  interface ElementTagNameMap {
    'yoo-hello-component': HTMLYooHelloComponentElement;
    'yoo-my-component': HTMLYooMyComponentElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
