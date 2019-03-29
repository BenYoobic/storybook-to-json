import { Component, Prop } from "@stencil/core";

@Component({
    tag: 'yoo-hello-component',
    shadow: true
})
export class HelloComponent {

    /**
   * The first name
   */
    @Prop() personName: string;

    render() {
        return <div>Hello { this.personName }!</div>
    }
}